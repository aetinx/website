if (location.protocol !== "https:") {
  location.replace(
    `https:${location.href.substring(location.protocol.length)}`
  );
}

// Weather
const checkTemp = (first) => {
  try {
    fetch("https://api.weather.gov/gridpoints/GYX/88,103/forecast/hourly?units=si")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(`${res.properties.periods[0].temperature}°C`)
        document.querySelector("#temp").innerText = `${res.properties.periods[0].temperature}°C`;
      })
      .catch((err) => {
        if (first) {
          document.querySelector("#temp").remove()
          console.warn("Government weather API is down.")
        }
      })
  } catch(err) {}
}

checkTemp(true)

// Clock
console.log('hi')

const startTime = () => {
  const today = new Date(new Date().toLocaleString("en-US", {timeZone: "America/New_York"}))
  let h = String(today.getHours()).padStart(2, "0"), m = String(today.getMinutes()).padStart(2, "0")
  document.querySelector("#time").innerText =  `${h}:${m} ET`
  setTimeout(startTime, 1000)
  checkTemp()
}

startTime()