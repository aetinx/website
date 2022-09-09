const socials = [
  {
    "icon": "brand.twitter", "username": "@aetinx", "url": "https://twitter.com/aetinx"
  },
  {
    "icon": "brand.behance", "username": "@aetinx", "url": "https://behance.net/aetinx"
  },
  {
    "icon": "brand.github", "username": "@aetinx", "url": "https://github.com/aetinx"
  },
  {
    "icon": "brand.figma", "username": "@aetinx", "url": "https://figma.com/@aetinx"
  },
  {
    "icon": "brand.instagram", "username": "@aetinx", "url": "https://instagram.com/aetinx"
  },
  {
    "icon": "brand.wasteof", "username": "@aetinx", "url": "https://wasteof.money/aetinx"
  },
  {
    "icon": "brand.polywork", "username": "@aetinx", "url": "https://polywork.com/aetinx"
  },
  {
    "icon": "brand.reddit", "username": "u/aetinx", "url": "https://reddit.com/u/aetinx"
  },
  {
    "icon": "brand.throne", "username": "u/aetinx", "url": "https://behance.net/aetinx"
  },
  {
    "icon": "brand.discord", "username": "aetinx#8300", "url": "https://discord.com/users/723149146596311071"
  },
  {
    "icon": "brand.xbox", "username": "Aetinx", "url": "https://account.xbox.com/en-us/profile?gamertag=Aetinx"
  },
  {
    "icon": "envelope", "username": "aetinx@saco.dev", "url": "mailto:aetinx@saco.dev"
  }
]

/*
  other @aetinx accounts (unused/private):
  facebook, douyin, vk, ok, tumblr

  snapchat: @aetinx-spdblx (https://snapchat.com/add/aetinx-spdblx)
*/

const createChips = (list, element, opacity) => {
  list.forEach((item) => {
    let base = document.createElement("a")
    base.href = item.url
    base.target = "_blank"
    base.append(new Icon(item.icon))
    let username = document.createElement("span")
    username.innerText = item.username
    base.append(username)
    if (opacity) base.style.opacity = opacity
    element.append(base)
  })
}

const tags = document.getElementById("socials-list")
if (tags) {
  createChips(socials, tags)
}