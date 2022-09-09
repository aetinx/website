const works = [{
    background: "/assets/icons v3.png",
    links: [
      ["View site", "https://icons.saco.dev"]
    ],
    roles: ["Iconography", "Development"],
    title: "Sargent Coding Icons",
    year: 2022
  },
  {
    background: "/assets/aetinx model 3d.png",
    links: [
      ["View on VRoid Hub", "https://hub.vroid.com/en/characters/8199759388645201687/models/849223422936800153"]
    ],
    roles: ["3D"],
    title: "Aetinx Model V3",
    year: 2022
  },
  {
    background: "/assets/harbooru.png",
    concept: true,
    links: [
      ["View on Behance", "https://www.behance.net/gallery/133746813/Harbooru"]
    ],
    roles: ["UI"],
    title: "Harbooru",
    year: 2021
  },
  {
    background: "/assets/photoshoot summer 21.jpg",
    links: [
      ["View on Instagram", "https://www.instagram.com/p/CYM3IbDJki2/"],
      ["View on Twitter", "https://twitter.com/aetinx/status/1504758801676881954"]
    ],
    location: "Maine, USA",
    roles: ["Photography"],
    title: "Photoshoot Summer 2021",
    year: 2021
  },
  {
    background: "/assets/sargent coding.png",
    links: [
      ["View site", "https://saco.dev"]
    ],
    roles: ["Founder", "Branding", "Identity", "Development"],
    title: "Sargent Coding",
    year: "2016 –"
  },
]

const list = document.getElementById("works-list")
if (list) {
  works.forEach((item) => {
    let maker = document.createElement("span")
    let buttons = ``
    for (let i of item.links) {
      buttons += `<a href="${i[1]}" target="_blank">${i[0]}</a>`
    }
    maker.innerHTML = `<div class="project" style="--background: url('${item.background}')"><span><span>${item.title}</span><span><span>${item.year}${item.location ? `&ensp;&bull;&ensp;${item.location}` : ""}</span>${item.concept ? `<span>Concept</span>` : ""}<span>${item.roles.join(", ")}</span></span></span><div> <div></div><div></div><div></div></div><span>${buttons}</span></div>`
    list.append(maker.children[0])
  });
}