const content_list = [
  "Trailer",
  "James Q Quick Origin Story",
  "Amy Dutton Origin Story",
  "Starting a New Development Project",
  "How do you Start a New Design Project?",
  "Freelancing (Part 1)",
];

//Building the episodes list
const template_li = document.querySelector(".episodes ol li.template");
template_li.style.display = "none";
for (let content of content_list) {
  const new_li = template_li.cloneNode(true);
  template_li.before(new_li);
  new_li.style.display = "";
  new_li.querySelector("p").textContent = content;
}

