const challenges_ol = document.createElement('ol');
const app_div = document.querySelector('#app');
app_div.append(challenges_ol);

//Here we have total 24 challenges.
const index = [...Array(24).keys()];
for (let i of index) {
    const new_li = document.createElement('li');
    const new_a = document.createElement('a');
    challenges_ol.append(new_li);
    new_li.append(new_a);

    const target_ch = `Challenge${String(i+1).padStart(2, '0')}`;

    new_a.textContent = `${target_ch}`;
    new_a.setAttribute('href', `${target_ch}`);
}
