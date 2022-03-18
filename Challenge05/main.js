const content_list = [
  "James Q Quick's Origin Story",
  "Amy Dutton's Origin Story",
  "The Tech Behind Compressed.fm",
  "Starting a New Development Project",
  "How Do you Start a New Design Project?",
  "Freelancing (Part 1)",
  "Freelancing (Part 2)",
  "The Tech Behind jamesqquick.com",
  "Teh Tech Behind SelfTeach.me",
  "Design Fundamentals (Part 1)",
  "Design Fundamentals (Part 2)",
  "Productivity: Tools, Tips, and Workflows",
  "The Future of Code with No Code",
  "Building the Perfect Desk Setup",
  "Everything You Need to Know to Get Started in SvelteKit",
  "Live Streaming for Beginners",
  "All Things Automated",
  "Amy Gives James a Design Consult",
  "Figma for Everyone",
  "Learning and Building in Public",
  "Getting Your First Dev Job",
  "Hiring a Designer or Getting Your First UI / UX Job",
  "IRL Freelance Proposal",
  "Getting Started on YouTube",
  "Starting your own Podcast",
  "How Blogging Can Change Your Career",
  "Talking to Some of Our Favorite Content Creators",
  "Our Favorite Things: A Crossover Episode with Web Dev Weekly",
  "Freelancing IRL: Unveiling a Site Redesign",
  "Wordpress in 2021",
  "Struggle Bus",
  "Getting Started with TypeScript",
  "Small Design Tweaks that Make All the Difference",
  "Getting git",
  "Crossover Episode with Purrfect Dev",
  "SVGs FTW",
  "Building a Course",
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
