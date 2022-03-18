const bill_amount = document.querySelector('.input-number .bill-amount span');
const people_number = document.querySelector(
    '.input-number .people-number span'
);
const radio_btn = document.querySelector('input[name="percentage"]');
const cal_btn = document.querySelector('.calculate button');

cal_btn.addEventListener('click', (e) => {
    console.log({
        bill_amount: bill_amount.textContent,
        people_number: people_number.textContent,
    });
});
