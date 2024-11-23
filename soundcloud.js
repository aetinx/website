const fetch = require("node-fetch")

async function action(trackID) {
  try {
    const tokenUrl = "https://secure.soundcloud.com/oauth/token"
    const tokenOptions = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + process.env.CLIENT_SECRET
      },
      body: new URLSearchParams({
        grant_type: "client_credentials"
      })
    }

    const tokenResponse = await fetch(tokenUrl, tokenOptions)
    const tokenData = await tokenResponse.json()

    if (!tokenResponse.ok) {
      throw new Error(`Error fetching token: ${tokenData.error || tokenData.message}`)
    }

    const accessToken = tokenData.access_token

    const trackUrl = `https://api.soundcloud.com/tracks/${trackID}/stream`
    const trackOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }

    const trackResponse = await fetch(trackUrl, trackOptions)

    if (!trackResponse.ok) {
      throw new Error(`Error fetching track: ${trackResponse.statusText}`)
    }

    console.log("Track stream fetched successfully")
  } catch (error) {
    console.error(error)
  }
}

module.exports = { action }
