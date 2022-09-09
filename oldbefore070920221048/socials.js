const socials = [
  {
    "name": "Twitter",
    "username": "@aetinx",
    "url": "https://twitter.com/aetinx",
    "colour": "1da1f2",
    "icon": `twitter`
  },
  {
    "name": "Bēhance",
    "username": "@aetinx",
    "url": "https://behance.net/aetinx",
    "colour": "0057ff",
    "icon": `behance`
  },
  {
    "name": "Figma",
    "username": "@aetinx",
    "url": "https://figma.com/@aetinx",
    "colour": "f24e1e",
    "icon": `figma`
  },
  {
    "name": "Glitch",
    "username": "@aetinx",
    "url": "https://glitch.com/@aetinx",
    "colour": "4b3feb",
    "icon": `glitch`
  },
  {
    "name": "Github",
    "username": "@aetinx",
    "url": "https://github.com/aetinx",
    "colour": "24292f",
    "icon": `github`
  },
  {
    "name": "Discord",
    "username": "aetinx#8300",
    "url": "https://discord.com/users/723149146596311071",
    "colour": "5865f2",
    "icon": `discord`
  },
  {
    "name": "Reddit",
    "username": "u/aetinx",
    "url": "https://reddit.com/u/aetinx",
    "colour": "ff4500",
    "icon": `reddit`
  },
  {
    "name": "Throne",
    "username": "u/aetinx",
    "url": "https://thronegifts.com/u/aetinx",
    "colour": "6e60df",
    "icon": `throne`
  },
  {
    "name": "Instagram",
    "username": "@aetinx",
    "url": "https://instagram.com/aetinx",
    "colour": "d500c6",
    "icon": `instagram`
  }
]

const tags = document.getElementById("socials-list");
if (tags) {
  socials.forEach((item) => {
    let base = document.createElement("a");
    base.href = item.url;
    base.target = "_blank";
    base.style.setProperty('--colour', `#${item.colour}`);
    base.append(new Icon(`brand.${item.icon}`));
    //let name = document.createElement("span");
    //name.innerText = item.name;
    //base.append(name);
    let username = document.createElement("span");
    username.innerText = item.username;
    base.append(username);
    tags.append(base);
  });
}