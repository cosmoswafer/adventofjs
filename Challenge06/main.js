const amount = document.querySelector('.amount span.dollar');
const slider = document.querySelector('input[type="range"]');
slider.addEventListener('input', (e) => {
    amount.textContent = (Number(e.target.value) / 100).toFixed(2);
});
