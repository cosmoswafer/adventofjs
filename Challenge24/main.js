import { DOM } from './lib/lazydom/dom.js';
import { Ordering } from './conf.js';
import { data } from './app.js';

class Table {
    constructor() {
        this.table = new TableBase(this);
        this.htmlTable = this.table.htmlTable;
        this.renderTableFn = this.table.renderTable;

        this.dataSet = new DataSet(this);
        this.editor = new Editor(this);
        this.renderEditorFn = this.editor.renderEditor;
    }

    render() {
        this.renderTableFn(this.dataSet.data);
        this.renderEditorFn();
    }
}

class DataSet {
    data = data;
    //Load data for simplilicity's sake
    sortBtns = new Array();
    columns = { 0: 'id', 1: 'name', 2: 'email', 3: 'title' };
    //The columns mapping should be come from data set
    //For simplicity's sake, we hardcode here
    sortedColumn = 0;
    sortedOrder = Ordering.Asc;

    constructor(controller) {
        this.controller = controller;
        this.htmlTable = controller.htmlTable;

        this.sortBtns = this.htmlTable.a('thead tr th svg');
        this.#bindEvents();
    }

    #bindEvents() {
        this.sortBtns.forEach((e, i) =>
            e.addEventListener('click', () => this.clickSortBtn(i))
        );
    }

    resetBtns() {
        this.sortBtns.forEach((e) =>
            e.classList.remove(Ordering.Asc.name, Ordering.Desc.name)
        );
    }

    toggleBtns(btn, order) {
        btn.classList.add(order.name);
    }

    #reverseOrder() {
        return this.sortedOrder === Ordering.Asc ? Ordering.Desc : Ordering.Asc;
    }

    #updateSortStatus(colNum, order) {
        this.sortedColumn = colNum;
        this.sortedOrder = order;
    }

    clickSortBtn(colNum) {
        if (colNum < 0 || colNum >= this.sortBtns.length) {
            console.error('Column number out of indexes!');
            return;
        }

        const sortBtn = this.sortBtns[colNum];
        const order =
            this.sortedColumn === colNum ? this.#reverseOrder() : Ordering.Asc;

        this.resetBtns();
        this.toggleBtns(sortBtn, order);
        this.sortCol(colNum, order);
        this.#updateSortStatus(colNum, order);
    }

    #sortColAsc(key) {
        if (key === 'id') {
            // id is numbers not string
            //TODO base on data type not hardcode
            this.data.sort((a, b) => a[key] - b[key]);
        } else {
            this.data.sort((a, b) => a[key].localeCompare(b[key]));
        }
    }

    #sortColDesc(key) {
        if (key === 'id') {
            // id is numbers not string
            //TODO base on data type not hardcode
            this.data.sort((a, b) => b[key] - a[key]);
        } else {
            this.data.sort((a, b) => b[key].localeCompare(a[key]));
        }
    }

    sortCol(colNum, ordering) {
        const key = colNum in this.columns ? this.columns[colNum] : 'name';
        ordering === Ordering.Asc
            ? this.#sortColAsc(key)
            : this.#sortColDesc(key);
        this.controller.render();
    }
}

class TableBase {
    htmlTable = new DOM('#app > table');
    pageSize = 10;
    pageOffset = 0;
    currentPage = 1;
    dataSize = 0;

    constructor(controller) {
        this.controller = controller;
        this.#pageEvents();
        //this.changePage(1);
    }

    #pageEvents() {
        this.htmlTable.dot(
            ['tfoot img.pre-page', , { click: () => this.changePrePage() }],
            ['tfoot img.next-page', , { click: () => this.changeNextPage() }],
            [
                'tfoot input[name="page-number"]',
                ,
                { change: (e) => this.changePage(e.target.value) },
            ]
        );
    }

    cleanUp() {
        const rows = this.htmlTable.a('tbody > tr');
        if (rows.length > 1) {
            //DO NOT cleanup empty template table
            rows.forEach((e) => e.remove());
        }
    }

    renderCells(dataset) {
        for (
            let i = 0;
            i < this.pageSize && i + this.pageOffset < dataset.length;
            i++
        ) {
            const d = dataset[i + this.pageOffset];
            const newRow = this.htmlTable.DOM();
            newRow.dot(
                ['.c-id', d.id],
                ['.c-name', '', { value: d.name }],
                ['.c-email', '', { value: d.email }],
                ['.c-jobtitle', '', { value: d.title }]
            );
        }
    }

    renderTable = (dataset) => {
        this.cleanUp();

        this.dataSize = dataset.length;
        this.renderCells(dataset);
        this.htmlTable.dot(
            ['.total-results', dataset.length],
            ['input[name="page-number"]', , { value: this.currentPage }],
            ['.total-pages', Math.floor(this.dataSize / this.pageSize)]
        );
    };

    changeNextPage() {
        const pageNum =
            this.currentPage < Math.floor(this.dataSize / this.pageSize)
                ? this.currentPage + 1
                : this.currentPage;
        this.changePage(pageNum);
    }

    changePrePage() {
        const pageNum = this.currentPage > 1 ? this.currentPage - 1 : 1;
        this.changePage(pageNum);
    }

    changePage(pageNumberArg) {
        //pageNumber starts at 1
        const pageNumber = Number(pageNumberArg);
        this.pageOffset = (pageNumber - 1) * this.pageSize;
        this.currentPage = pageNumber;
        this.controller.render();
    }
}

class Editor {
    constructor(controller) {
        this.controller = controller;
        this.htmlTable = controller.htmlTable;
    }

    #toggleEditor(row) {
        row.classList.toggle('editing');
        const cellsInp = row.querySelectorAll('td > input');
        cellsInp.forEach((e) => (e.disabled = !e.disabled));

        if (!row.classList.contains('editing')) {
            this.#submitValues(row);
        }
    }

    #submitValues(row) {
        const eid = row.querySelector('td:first-child').textContent;
        const inputs = row.querySelectorAll('td > input');
        console.log('Trying to submit entry id: ', eid);
        inputs.forEach((i) =>
            console.log(i.getAttribute('name'), ':', i.value)
        );
    }

    renderEditor = () => {
        const tableRows = this.htmlTable.a('tbody tr');
        for (let r of tableRows) {
            r.querySelector('td:last-child svg').addEventListener('click', () =>
                this.#toggleEditor(r)
            );
        }
    };
}

class App {
    table = new Table();

    constructor() {
        this.table.render();

        /*
        //Editing buttons
        const tableRows = document.querySelectorAll('#app table > tbody tr');
        tableRows.forEach((r) =>
            r
                .querySelector('td:last-child svg')
                .addEventListener('click', () => r.classList.toggle('editing'))
        );
        */
    }
}

const app = new App();
