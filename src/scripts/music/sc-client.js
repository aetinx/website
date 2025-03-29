"use client"
/* Made with the help of cobalt.tools. */

const nc = url => `https://non-cors.aetinx.workers.dev/${url}`
const nc2 = url => `https://api.cors.lol/?url=${url}`

const nc__ = url => url /* TEST */
const nc2__ = url => url /* TEST */

const nc$ = nc
const nc2$ = nc

const rid = "25370885-8f89-48ad-9b87-f49389fea329"

const fetchAndCache = async url => {
  const cache = await caches.open(`my-cache-${rid}`)
  const cachedResponse = await cache.match(url)
  if (cachedResponse) return cachedResponse
  const networkResponse = await fetch(url)
  if (networkResponse.ok) await cache.put(url, networkResponse.clone())
  else console.warn("Network response is not okay.")
  return networkResponse
}

const findClientID = async () => {
  console.debug("Fetching SoundCloud website...")
  let website = await fetch(nc2$("https://soundcloud.com")).then(res => res.text())
  let scVersion = String(website.match(/<script>window\.__sc_version="[0-9]{10}"<\/script>/)[0].match(/[0-9]{10}/))
  console.debug(`Viewing SoundCloud version ${scVersion}.`)
  let scripts = website.matchAll(/<script.+src="(.+)">/g)
  let clientID
  console.debug("Checking scripts for client ID.")
  for (let script of scripts) {
    let url = script[1]
    if (!url?.startsWith("https://a-v2.sndcdn.com/")) return
    let scrf = await fetch(url).then(res => res.text())
    let id = scrf.match(/\("client_id=[A-Za-z0-9]{32}"\)/)
    if (id && typeof id[0] == "string") {
      clientID = id[0].match(/[A-Za-z0-9]{32}/)[0]
      break
    }
  }
  console.debug("Acquired client ID.")
  return clientID
}

let clientID

const scResolve = async link => {
  //console.debug(`Resolving "${link}"...`)
  return await fetchAndCache(nc$(`https://api-v2.soundcloud.com/resolve?url=${link}&client_id=${clientID}`)).then(res => res.json())
}

const getStream = async song => {
  let fileURLBase = song.media.transcodings.find(x => x.format.protocol == "hls").url
  //console.debug(`Getting stream from "${fileURLBase}"...`)
  let fileURL = `${fileURLBase}${fileURLBase.includes("?") ? "&" : "?"}client_id=${clientID}&track_authorization=${song.track_authorization}`
  let file = await fetchAndCache(nc2$(fileURL)).then(async res => (await res.json()).url)
  return file
}

const init = async () => {
  clientID = await findClientID()
}

export { init, scResolve, getStream }