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
    "icon": "brand.throne", "username": "u/aetinx", "url": "https://throne.me/u/aetinx"
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
  Accounts that I either don't use much/anymore,
  or accounts that only exist to protect my username.

  other @aetinx accounts
  ----------------------
    unused/private
      facebook, douyin/tiktok, vk, ok, tumblr, phub,
      xvideos, redgifs, odysee/lbry
      
    rarely used
      instagram, playbook, matrix.org
    
    
  not @aetinx
    snapchat: @aetinx-spdblx (https://snapchat.com/add/aetinx-spdblx)
    pixiv: 52120586
    niconico: 125862157
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