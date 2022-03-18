const content_list = [
  "Trailer",
  "James Q Quick Origin Story",
  "Amy Dutton Origin Story",
  "Starting a New Development Project",
  "How do you Start a New Design Project?",
  "Freelancing (Part 1)",
];

let last_clicked = 0;
let hold_shift = false;
document.addEventListener("keydown", (e) => {
  e.key == "Shift" && (hold_shift = true);
});

document.addEventListener("keyup", (e) => {
  e.key == "Shift" && (hold_shift = false);
});

//Building the episodes list
const template_li = document.querySelector(".episodes ol li.template");
template_li.style.display = "none";
for (let i = 0; i < content_list.length; i++) {
  const content = content_list[i];
  const new_li = template_li.cloneNode(true);
  template_li.before(new_li);
  new_li.style.display = "";
  new_li.querySelector("p").textContent = content;
  new_li.querySelector("p").index = i + 1;
}
template_li.remove();

const episodes_items = document.querySelectorAll(".episodes .list ol li p");

const toggleCheckbox = (a, b, last) => {
  console.log(`${a} -> ${b}`);
  for (let i of episodes_items) {
    const checkbox = i.previousElementSibling;
    console.log(`Looking at checkbox ${i.index} for checkbox:`);
    if (i.index >= a && i.index <= b && i.index != last) {
      console.log("Fire a click");
      //checkbox.toggleAttribute('checked');
      //toggle wont work with our CSS rules.
      checkbox.click();
    }
  }
};

const clickCheckbox = (index) => {
  if (last_clicked != -1 && index != -1) {
    toggleCheckbox(...[index, last_clicked].sort(), last_clicked);
  }
};

for (let checkbox of episodes_items) {
  checkbox.addEventListener("click", (e) => {
    if (hold_shift) {
      clickCheckbox(e.target?.index ?? -1);
    }
    last_clicked = e.target?.index ?? -1;
  });
}
