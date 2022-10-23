import { DOM } from './lib/lazydom/dom.js';

class Util {
    static usdFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    static currencyFormatter(n) {
        return Util.usdFormatter.format(n);
    }
}

class Budget {
    budgetAmountInput = document.querySelector('#budget-amount');
    budgetIncomeTxt = document.querySelector(
        '#app > .balance .income .currency'
    );

    amount = 0;

    constructor(f) {
        this.notifier = f;
        this.#bindEvents();
        //Reset amount
        this.renderIncome();
    }

    #bindEvents() {
        this.budgetAmountInput.addEventListener(
            'change',
            this.changeBudgetAmount
        );
    }

    changeBudgetAmount = () => {
        this.amount = Number(this.budgetAmountInput.value);
        this.renderIncome();
        this.notifier();
    };

    renderIncome() {
        this.budgetIncomeTxt.textContent = Util.currencyFormatter(this.amount);
    }
}

class Expense {
    expenseUl = new DOM('#app > .expenses ul.items');
    expenseName = document.querySelector('#expense-name');
    expenseAmount = document.querySelector('#expense-amount');
    addExpenseBtn = document.querySelector('#app > .budget .add-btn a');
    totalExpenseText = document.querySelector(
        '#app > .balance .expenses .currency'
    );

    expenseItems = new Array();

    constructor(f) {
        this.notifier = f;
        this.#bindEvents();
        this.#cleanUp();
    }

    #cleanUp() {
        //Start with an empty list
        const firstItem = this.expenseUl.DOM();
        firstItem.element.remove();
        //Reset Expenses
        this.renderExpenses();
    }

    #bindEvents() {
        this.addExpenseBtn.addEventListener('click', () =>
            this.renderNewItem()
        );
    }

    renderNewItem = () => {
        const nextItemKey = this.expenseItems.length;
        const newItem = this.expenseUl.DOM();
        newItem.dot(
            ['.name', this.expenseName.value],
            ['.amount', Util.currencyFormatter(this.expenseAmount.value)]
        );
        newItem
            .q('.trash a')
            .addEventListener('click', () => this.removeItem(nextItemKey));
        this.expenseItems.push({
            key: nextItemKey,
            dom: newItem,
            amount: Number(this.expenseAmount.value),
            isTrash: false,
        });
        console.log('Added new item at', nextItemKey);

        this.renderExpenses();
        this.notifier();
    };

    removeItem(key) {
        const item = this.expenseItems[key];
        if (item.key === key) {
            //It shouldn't be false
            item.dom.element.remove();
            item.isTrash = true;
        }

        this.renderExpenses();
        this.notifier();
    }

    renderExpenses() {
        let totalAmount = 0;
        for (let i of this.expenseItems) {
            if (i.isTrash === false) {
                totalAmount += i.amount;
            }
        }
        this.totalExpenseText.textContent = Util.currencyFormatter(totalAmount);
    }
}

class App {
    balanceText = document.querySelector('#app > .balance .balance .currency');

    constructor() {
        this.budget = new Budget(this.notify);
        this.expense = new Expense(this.notify);
        //Reset balance text
        this.renderBalance(0);
    }

    notify = () => {
        console.log('Render balance...');
        console.log('Budget amount:', this.budget.amount);
        let balance = this.budget.amount;
        for (let i of this.expense.expenseItems) {
            console.log(`${i.key}: ${i.amount}`);
            if (i.isTrash === false) {
                balance -= i.amount;
            }
        }
        console.log({ balance });
        this.renderBalance(balance);
    };

    renderBalance(n) {
        this.balanceText.textContent = Util.currencyFormatter(n);
        this.balanceText.classList.remove('positive', 'negative');
        n >= 0 ? this.balanceText.classList.add('positive') : this.balanceText.classList.add('negative');
    }
}

const app = new App();
