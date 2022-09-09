cardHelper = {
  newCard: (attr) => {
    let maker = document.createElement("span")
    let buttons = ``
    for (let i of attr.links) {
      buttons += `<a href="${i[1]}" target="_blank">${i[0]}</a>`
    }
    maker.innerHTML = `<div class="card" style="--image: url('${attr.background}')"><span><span>${attr.title}</span><span><span>${attr.year}${attr.location ? `&ensp;&bull;&ensp;${attr.location}` : ""}</span>${attr.concept ? `<span>Concept</span>` : ""}<span>${attr.roles.join(", ")}</span></span></span><div> <div></div><div></div><div></div></div><span>${buttons}</span></div>`
    return maker.children[0]
  },
  collapseCard: (card) => {
    let buttons = card.querySelector(".card > span:last-child")
    let buttonsHeight = buttons.scrollHeight
    requestAnimationFrame(() => {
      buttons.style.height = buttonsHeight + "px"
      requestAnimationFrame(() => {
        buttons.style.height = "0px"
      })
    })
    card.dataset.collapsed = true
  },
  expandCard: (card) => {
    let buttons = card.querySelector(".card > span:last-child")
    let buttonsHeight = buttons.scrollHeight
    buttons.style.height = buttonsHeight + "px"
    card.addEventListener("transitionend transitioncancel", function(event) {
      console.log(transitionisrunning)
      card.removeEventListener("transitionend transitioncancel", arguments.callee)
      buttons.style.height = null
    })
    card.dataset.collapsed = false
  },
  updateCard: (card) => {
    var isCollapsed = card.getAttribute("data-collapsed") == "true"

    if (isCollapsed) {
      cardHelper.expandCard(card)
      card.dataset.collapsed = false
    } else {
      cardHelper.collapseCard(card)
    }
  },
  initialiseCard: (card) => {
    card.dataset.collapsed = true
    let buttons = card.querySelector(".card > span:last-child")
    requestAnimationFrame(() => {
      buttons.style.height = buttons.scrollHeight + "px"
      buttons.style.height = "0px"
    })
  }
}

let thing = [{
    background: "https://repository-images.githubusercontent.com/483409391/b9f31944-ba29-4f77-92b6-bf83798a45e9",
    links: [
      ["View site", "https://icons.saco.dev"]
    ],
    roles: ["Iconography", "Development"],
    title: "Sargent Coding Icons",
    year: 2022
  },
  {
    background: "https://website-1.spdblx.repl.co/assets/270620222014.png",
    links: [
      ["View on VRoid Hub", "https://hub.vroid.com/en/characters/8199759388645201687/models/849223422936800153"]
    ],
    roles: ["3D"],
    title: "Aetinx Model V3",
    year: 2022
  },
  {
    background: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/1b6599133746813.61c493149e010.png",
    concept: true,
    links: [
      ["View on Behance", "https://www.behance.net/gallery/133746813/Harbooru"]
    ],
    roles: ["UI"],
    title: "Harbooru",
    year: 2021
  },
  {
    background: "https://pbs.twimg.com/media/FOH576ZX0BYACO7?format=jpg",
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
    background: "https://saco.dev/embed-thumbnail.png",
    links: [
      ["View site", "https://saco.dev"]
    ],
    roles: ["Founder", "Branding", "Identity", "Development"],
    title: "Sargent Coding",
    year: "2016 –"
  },
]

for (let i of thing) {
  let card = cardHelper.newCard(i)
  document.querySelector("#works").append(card)
  cardHelper.initialiseCard(card)
}

document.addEventListener("mouseover", (overEvent) => {
  if (overEvent.target.classList.contains("card")) {
    cardHelper.expandCard(overEvent.target)
    overEvent.target.addEventListener("mouseleave", function(leaveEvent) {
      cardHelper.collapseCard(leaveEvent.target)
      overEvent.target.removeEventListener("mouseleave", arguments.callee)
    })
  }
}, false)
