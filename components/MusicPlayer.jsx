"use client"

import { useState, useEffect, useRef } from "react"
import { useQuery } from "react-query"
import styles from "./MusicPlayer.module.css"
import * as Symbols from "@latapals/symbols"
import * as client from "/src/scripts/music/sc-client.js"
import { Shortcut } from "/src/scripts/keykit.js"
import Hls from "hls.js"
import Link from "next/link"
import Throbber from "@components/Throbber"

const msToString = (ms) => {
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

const fetchPlaylist = async () => {
  const shuffle = (arr) => {
    let i = arr.length, j, temp
    while (--i > 0) {
      j = Math.floor(Math.random() * (i + 1))
      temp = arr[j]
      arr[j] = arr[i]
      arr[i] = temp
    }
    return arr
  }

  await client.init()
  const response = await client.scResolve("https://soundcloud.com/aetinx/sets/website")
  response.tracks = await Promise.all(
    response.tracks.map((track) => client.scResolve(`https://api.soundcloud.com/tracks/${track.id}`))
  )
  response.tracks = shuffle(response.tracks)
  return response
}

export default function MusicPlayer() {
  const [shouldFetch, setShouldFetch] = useState(false)

  const { data: playlist, isLoading, isError } = useQuery("playlist", async function () {
    return playlist || await fetchPlaylist(... arguments)
  }, {
    enabled: shouldFetch,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    cacheTime: Infinity
  })
  
  const [ready, setReady] = useState(false)
  const [songIndex, setSongIndex] = useState(-1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  const songIndexRef = useRef(songIndex)
  const playlistRef = useRef(playlist)
  const canGoBack = songIndex > 0
  const canGoForward = songIndex < (playlist?.tracks.length || 0) - 1
  const audioRef = useRef()
  const hlsRef = useRef()
  const buttonRefs = useRef([])
  const mountedRef = useRef(false)
  const toggleShortRef = useRef()
  const prevShortRef = useRef()
  const nextShortRef = useRef()
  const backShortRef = useRef()
  const forwardShortRef = useRef()

  const selectTrack = async (i, play = true) => {
    const track = playlistRef.current?.tracks[i]    
    audioRef.current.pause()
    audioRef.current.currentTime = 0
    setSongIndex(i)
    await loadTrack(i)
    
    if (play) {
      audioRef.current.play()
      setIsPlaying(play)
    }

    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist: track.user.username,
      artwork: [
        {
          src: `https://imagecdn.app/v1/images/${encodeURIComponent(
            (track.artwork_url || track.user.avatar_url).replace(/-large(\.jpg|\.jpeg)$/, "-t500x500$1")
          )}?width=256&height=256`,
          sizes: "256x256",
          type: "image/png",
        },
        {
          src: `https://imagecdn.app/v1/images/${encodeURIComponent(
            (track.artwork_url || track.user.avatar_url).replace(/-large(\.jpg|\.jpeg)$/, "-t500x500$1")
          )}?width=512&height=512`,
          sizes: "512x512",
          type: "image/png",
        },
      ],
    })
  }

  const loadTrack = async (i) => {
    const track = playlistRef.current?.tracks[i]
    const source = await client.getStream(track)
    hlsRef.current.loadSource(source)
    hlsRef.current.attachMedia(audioRef.current)
  }

  const toggle = async (play = audioRef.current.paused) => {
    if (play) await refreshCurrentTrack()
    play ? audioRef.current.play() : audioRef.current.pause()
    setIsPlaying(play)
  }

  const refreshCurrentTrack = async () => {
    const position = audioRef.current.currentTime
    await loadTrack(songIndexRef.current)
    audioRef.current.currentTime = position
  }

  const prev = () => {
    if (!canGoBack) return
    selectTrack(songIndexRef.current - 1)
  }

  const next = () => {
    if (!canGoForward) return
    selectTrack(songIndexRef.current + 1)
  }

  useEffect(() => {
    songIndexRef.current = songIndex
    playlistRef.current = playlist
  }, [songIndex, playlist])

  useEffect(() => {  
    toggleShortRef.current = new Shortcut("Space", (event) => {
      event.preventDefault()
      console.debug("Toggle playback shortcut pressed.")
      toggle()
    })
  
    prevShortRef.current = new Shortcut("Shift ArrowLeft", (event) => {
      event.preventDefault()
      console.debug("Previous track shortcut pressed.")
      prev()
    })
  
    nextShortRef.current = new Shortcut("Shift ArrowRight", (event) => {
      event.preventDefault()
      console.debug("Next track shortcut pressed.")
      next()
    })
  
    backShortRef.current = new Shortcut("ArrowLeft", (event) => {
      event.preventDefault()
      console.debug("Seek back shortcut pressed.")
      try {
        audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10)
      } catch (err) {
        console.warn("Something got tripped up, but non-fatal.")
      }
    })
  
    forwardShortRef.current = new Shortcut("ArrowRight", (event) => {
      event.preventDefault()
      console.debug("Seek forward shortcut pressed.")
      try {
        audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, audioRef.current.duration)
      } catch (err) {
        console.warn("Something got tripped up, but non-fatal.")
      }
    })
  
    return () => {
      [toggleShortRef, prevShortRef, nextShortRef, backShortRef, forwardShortRef].forEach((ref) => {
        if (ref.current) ref.current.kill()
      })
    }
  }, [songIndex])

  useEffect(() => {
    if (mountedRef.current) return
    console.debug("%cMusic player mounted.", "background: lightgreen")
    audioRef.current = new Audio()
    hlsRef.current = new Hls()
    setShouldFetch(true)
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      console.debug("%cMusic player unmounted.", "background: pink")
      toggle(false)
      hlsRef.current.detachMedia()
      hlsRef.current.destroy()
      hlsRef.current = null
      audioRef.current.pause()
      audioRef.current.src = ""
      audioRef.current = null
      navigator.mediaSession.setActionHandler("play", null)
      navigator.mediaSession.setActionHandler("pause", null)
      navigator.mediaSession.setActionHandler("previoustrack", null)
      navigator.mediaSession.setActionHandler("nexttrack", null)
      buttonRefs.current = []
    }
  }, [])

  useEffect(() => {
    if (playlist) {
      if (songIndex == -1) {
        selectTrack(0, false)
      } else if (!ready) {
        setReady(true)
      }
    }
  }, [playlist, songIndex])

  useEffect(() => {
    const updateCurrentTime = () => {
      if (!audioRef.current) return
      setCurrentTime(audioRef.current.currentTime)
    }
    audioRef.current.addEventListener("timeupdate", updateCurrentTime)
    /*return () => {
      audioRef.current.removeEventListener("timeupdate", updateCurrentTime)
    }*/
  }, [])

  navigator.mediaSession.setActionHandler("play", () => toggle(true))
  navigator.mediaSession.setActionHandler("pause", () => toggle(false))
  navigator.mediaSession.setActionHandler("previoustrack", prev)
  navigator.mediaSession.setActionHandler("nexttrack", next)

  useEffect(() => {
    const handleAudioEnded = () => {
      if (canGoForward) next()
    }
    const audioElement = audioRef.current
    audioElement.addEventListener("ended", handleAudioEnded)
    return () => {
      audioElement.removeEventListener("ended", handleAudioEnded)
    }
  }, [canGoForward, songIndex])

  return (
    <div className={styles.base}>
      <span className="flex gap-2 items-center [color:--on-surface-variant]">
        <Symbols.MusicNote />Music
      </span>
      { ready ? (
        <>
          <div className={styles.grid}>
            <div>
              <div
                className={styles.info}
                style={{ "--cover": `url(${(playlist.tracks[songIndex]?.artwork_url || playlist.tracks[songIndex]?.user.avatar_url).replace(/-large(\.jpg|\.jpeg)$/, "-t500x500$1")})` }}
              >
                <div></div>
                <div>{playlist.tracks[songIndex]?.title}</div>
                <div>{playlist.tracks[songIndex]?.user.username}</div>
              </div>
              <div className={styles.actions}>
                <div className={styles.controls}>
                  <button disabled={!canGoBack} onClick={prev}>
                    <Symbols.Beginning />
                  </button>
                  <button onClick={() => toggle()}>
                    {isPlaying ? <Symbols.Pause /> : <Symbols.Play />}
                  </button>
                  <button disabled={!canGoForward} onClick={next}>
                    <Symbols.End />
                  </button>
                </div>
                <div className={styles.timeline}>
                  <span>{msToString(currentTime * 1000)}</span>
                  <input
                    type="range"
                    min="0"
                    max={playlist?.tracks[songIndex]?.duration / 1000 || 0}
                    value={currentTime}
                    onChange={(e) => {
                      audioRef.current.currentTime = e.target.value
                    }}
                  />
                  <span>{msToString(playlist?.tracks[songIndex]?.duration)}</span>
                </div>
              </div>
            </div>
            <div className={styles.list}>
              {playlist.tracks.map((track, idx) => (
                <button
                  key={idx}
                  onClick={() => selectTrack(idx)}
                  ref={(el) => (buttonRefs.current[idx] = el)}
                  className={idx === songIndex ? styles.selected : ""}
                >
                  <div>{track.title}</div>
                  <div>{track.user.username}</div>
                </button>
              ))}
            </div>
            <Link href="//soundcloud.com/aetinx/sets/website" target="_blank">
              <span>View playlist on SoundCloud</span>
              <Symbols.Open />
            </Link>
          </div>
        </>
      ) : (
        <div className="grid rounded-2xl bg-[--surface] place-content-center items-center h-full">
          <Throbber size="48" />
        </div>
      )}
    </div>
  )
}