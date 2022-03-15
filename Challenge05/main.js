const content_list = [
"Trailer",
"James Q Quick Origin Story",
"Amy Dutton Origin Story",
"Starting a New Development Project",
"How do you Start a New Design Project?",
"Freelancing (Part 1)"
]

//Building the episodes list
const template_li = document.querySelector(".episodes ol li.template");
template_li.style.display = "none";
for (let content of content_list) {
    const new_li = template_li.cloneNode(true);
    template_li.before(new_li);
    new_li.style.display = "";
    new_li.querySelector("p").textContent = content;
}

//Bind events for the check boxes
const imgs_unchecked = document.querySelectorAll(".episodes .list ol li img:not(hide)");
const imgs_checked = document.querySelectorAll(".episodes .list ol li img.hide");

for (let img of [...imgs_unchecked, ...imgs_checked]) {
    img.addEventListener("click", e => {
        if (! e.target.classList.contains("hide")) {
            const p = e.target.parentElement;
            for (let i of p.querySelectorAll("img")) {
                i.classList.toggle("hide");
            }
        }
    });
}
