const tip_amount = document.querySelector('.tip-amount span.value');
const total_per_person = document.querySelector('.total-per-person span.value');
const bill_amount = document.querySelector('.input-number .bill-amount span');
const people_number = document.querySelector(
    '.input-number .people-number span'
);
const cal_btn = document.querySelector('.calculate button');

const update_page = (tip, total_per) => {
    tip_amount.textContent = tip.toFixed(2);
    total_per_person.textContent = total_per.toFixed(2);
};

cal_btn.addEventListener('click', (e) => {
    const radio_btn = document.querySelector(
        'input[name="percentage"]:checked'
    );
    const bill = Number(bill_amount.textContent);
    const percentage = Number(radio_btn.value);
    const person = Number(people_number.textContent);

    const tip = bill * percentage;
    const total_per = (bill + tip) / person;

    update_page(tip, total_per);
});
