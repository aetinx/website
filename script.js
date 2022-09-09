if (location.protocol !== "https:") {
  location.replace(
    `https:${location.href.substring(location.protocol.length)}`
  );
}

if (!localStorage.hasOwnProperty("mobileAlertSeen")) {
  let mobileAlert = `
<div id="mobile-alert">
  This website looks much better on a computer.
  
  <span>
    <a href="javascript:navigator.share({title:'Aetinx\\'s Website',url:location.href})">Share to a device</a>
    <a href="javascript:" onclick="this.parentNode.parentNode.remove();localStorage.setItem('mobileAlertSeen', true)">Continue to site</a>
   </span>
</div>
`
  let maker = document.createElement("div")
  maker.innerHTML = mobileAlert
  document.body.prepend(maker.children[0])
}

if (document.getElementById("exp-years")) {
  document.getElementById("exp-years-gd").innerText = Math.abs(new Date(Date.now() - new Date("2016-01-07T22:43:52.000Z")).getUTCFullYear() - 1970)
  document.getElementById("exp-years-wd").innerText = Math.abs(new Date(Date.now() - new Date("2020-05-13T12:51:17.412Z")).getUTCFullYear() - 1970)
}

// Weather
const checkTemp = (first) => {
  try {
    fetch("https://api.weather.gov/gridpoints/GYX/88,103/forecast/hourly?units=si")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        document.querySelector("#temp").innerText = document.querySelector("#temp-mobile").innerText = `${res.properties.periods[0].temperature}°C`;
      })
      .catch((err) => {
        if (first) {
          document.querySelector("#temp").remove()
          document.querySelector("#temp-mobile").remove()
          console.warn("Government weather API is down.")
        }
      })
  } catch(err) {}
}

checkTemp(true)

// Clock
const startTime = () => {
  const today = new Date(new Date().toLocaleString("en-US", {timeZone: "America/New_York"}))
  let h = String(today.getHours()).padStart(2, "0"), m = String(today.getMinutes()).padStart(2, "0")
  document.querySelector("#time").innerText = document.querySelector("#time-mobile").innerText  =  `${h}:${m} ET`
  setTimeout(startTime, 1000)
  checkTemp()
}

startTime()

// Mobile menu
document.querySelector("#mobile-nav-menu").onclick = () => {
  document.querySelector("nav.mobile-only > div:last-child").classList.toggle("opened")
}

// Mug
let n = 99
let countMug = () => {
  console.log(`%c\n${n} cans of Mug root beer on a wall.\n${n} cans of Mug root beer.\nTake one down, pass it around,\n${--n} cans of Mug root beer on the wall.\n`, `font-family: "Segoe UI Variable Display", "Segoe UI Variable", "Segoe UI", "SF Pro Display", "SF UI Display", "SF Pro Text", "SF UI Text", SF-apple-system, BlinkMacSystemFont, "Inter", "Helvetica Neue", "Helvetica", "Arial", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Twitter Color Emoji"; line-height: 2; font-size: 14px;`); if (n == 0) console.log(`// Mug\nlet n = 99\nlet countMug = ${countMug}`);
}

//if (n == 0) console.log(`%c\nThe end!\n`, `font-family: "Segoe UI Variable Display", "Segoe UI Variable", "Segoe UI", "SF Pro Display", "SF UI Display", "SF Pro Text", "SF UI Text", SF-apple-system, BlinkMacSystemFont, "Inter", "Helvetica Neue", "Helvetica", "Arial", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Twitter Color Emoji"; line-height: 2; font-size: 14px;`);

setInterval(() => {
  if (n != 0) countMug()
}, 2000)
countMug()

/*// Nya
let nya = "aetinx  aetinx  aetinx  aetinx  "
setInterval(() => {
  console.log("%c" + nya, "font-weight: bold; color: #f58")
  //nya = nya.slice(1) + nya[0]
  nya = nya.slice(2) + nya.slice(0, 2)
}, 0)*/