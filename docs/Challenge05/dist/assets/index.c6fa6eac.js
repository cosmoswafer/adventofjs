const g = function () {
  const i = document.createElement("link").relList;
  if (i && i.supports && i.supports("modulepreload")) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) r(e);
  new MutationObserver((e) => {
    for (const o of e)
      if (o.type === "childList")
        for (const c of o.addedNodes)
          c.tagName === "LINK" && c.rel === "modulepreload" && r(c);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(e) {
    const o = {};
    return (
      e.integrity && (o.integrity = e.integrity),
      e.referrerpolicy && (o.referrerPolicy = e.referrerpolicy),
      e.crossorigin === "use-credentials"
        ? (o.credentials = "include")
        : e.crossorigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function r(e) {
    if (e.ep) return;
    e.ep = !0;
    const o = n(e);
    fetch(e.href, o);
  }
};
g();
const d = [
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
let s = 0,
  a = !1;
document.addEventListener("keydown", (t) => {
  t.key == "Shift" && (a = !0);
});
document.addEventListener("keyup", (t) => {
  t.key == "Shift" && (a = !1);
});
const l = document.querySelector(".episodes ol li.template");
l.style.display = "none";
for (let t = 0; t < d.length; t++) {
  const i = d[t],
    n = l.cloneNode(!0);
  l.before(n),
    (n.style.display = ""),
    (n.querySelector("p").textContent = i),
    (n.querySelector("p").index = t + 1);
}
l.remove();
const u = document.querySelectorAll(".episodes .list ol li p"),
  f = (t, i, n) => {
    console.log(`${t} -> ${i}`);
    for (let r of u) {
      const e = r.previousElementSibling;
      console.log(`Looking at checkbox ${r.index} for checkbox:`),
        r.index >= t &&
          r.index <= i &&
          r.index != n &&
          (console.log("Fire a click"), e.click());
    }
  },
  h = (t) => {
    s != -1 && t != -1 && f(...[t, s].sort(), s);
  };
for (let t of u)
  t.addEventListener("click", (i) => {
    var n, r, e, o;
    a && h((r = (n = i.target) == null ? void 0 : n.index) != null ? r : -1),
      (s = (o = (e = i.target) == null ? void 0 : e.index) != null ? o : -1);
  });
