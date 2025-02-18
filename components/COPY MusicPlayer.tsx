"use client"

import { useState, useEffect, useRef } from "react"
import styles from "./MusicPlayer.module.css"
import * as Symbols from "@latapals/symbols"
import * as client from "/public/scripts/music/sc-client.js"
import { Shortcut } from "/public/scripts/keykit.js"
import Hls from "hls.js"
import Link from "next/link"
import Throbber from "@components/Throbber"

export default function MusicPlayer() {
  const [songIndex, setSongIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playlist, setPlaylist] = useState(null)
  const [currentTime, setCurrentTime] = useState(0)

  const canGoBack = songIndex > 0
  const canGoForward = songIndex < (playlist?.tracks.length || 0) - 1
  const audioRef = useRef(new Audio())
  const hlsRef = useRef(new Hls())
  const buttonRefs = useRef([])

  // Formatting function for current time
  const msToString = (ms) => {
    return new Intl.DateTimeFormat("en-US", {
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date(ms))
  }

  // Fetch and shuffle the playlist
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
    setPlaylist(response)

    // Set media session handlers
    navigator.mediaSession.setActionHandler("play", () => toggle(true))
    navigator.mediaSession.setActionHandler("pause", () => toggle(false))
    navigator.mediaSession.setActionHandler("previoustrack", prev)
    navigator.mediaSession.setActionHandler("nexttrack", next)

    new Shortcut("Space", (event) => {
      event.preventDefault()
      toggle()
    })

    new Shortcut("Shift ArrowLeft", (event) => {
      event.preventDefault()
      prev()
    })

    new Shortcut("Shift ArrowRight", (event) => {
      event.preventDefault()
      next()
    })

    new Shortcut("ArrowLeft", (event) => {
      event.preventDefault()
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10)
    })

    new Shortcut("ArrowRight", (event) => {
      event.preventDefault()
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, audioRef.current.duration)
    })
  }

  // Initialize playlist and audio setup
  useEffect(() => {
    fetchPlaylist()
    audioRef.current.pause()
  }, [])

  // Select a track and load it
  const selectTrack = async (i, play = true) => {
    try {
      const track = playlist?.tracks[i]
      if (!track) throw new Error("Track not found")
      
      // Reset and load the new track
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setSongIndex(i)
      await loadTrack(i)
      
      if (play) audioRef.current.play()

      // Update media session metadata
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
    } catch (error) {
      console.error("Failed to select track:", error)
    }
  }

  // Load a track's stream
  const loadTrack = async (i) => {
    try {
      const track = playlist?.tracks[i]
      if (!track) throw new Error("Track not found")
      const source = await client.getStream(track)
      hlsRef.current.loadSource(source)
      hlsRef.current.attachMedia(audioRef.current)
    } catch (error) {
      console.error("Failed to load track:", error)
    }
  }

  // Playback control
  const toggle = async (play = audioRef.current.paused) => {
    try {
      if (play) await refreshCurrentTrack()
      play ? audioRef.current.play() : audioRef.current.pause()
      setIsPlaying(play)
    } catch (error) {
      console.error("Failed to toggle playback:", error)
    }
  }

  // Refresh current track (when the user navigates)
  const refreshCurrentTrack = async () => {
    try {
      const position = audioRef.current.currentTime
      await loadTrack(songIndex)
      audioRef.current.currentTime = position
    } catch (error) {
      console.error("Failed to refresh current track:", error)
    }
  }

  // Go to previous track
  const prev = () => {
    if (!canGoBack) return
    selectTrack(songIndex - 1)
  }

  // Go to next track
  const next = () => {
    if (!canGoForward) return
    selectTrack(songIndex + 1)
  }

  // Update current time when audio changes
  useEffect(() => {
    const updateCurrentTime = () => setCurrentTime(audioRef.current.currentTime)
    audioRef.current.addEventListener("timeupdate", updateCurrentTime)
    return () => {
      audioRef.current.removeEventListener("timeupdate", updateCurrentTime)
    }
  }, [])

  // Select the first track once playlist is loaded
  useEffect(() => {
    if (playlist) selectTrack(0, false)
  }, [playlist])

  return (
    <div className={styles.base}>
      {playlist?.tracks ? (
        <>
          <span className="flex gap-2 items-center [color:--on-surface-variant]">
            <Symbols.MusicNote />Music
          </span>
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
        <div className="grid place-content-center">
          <Throbber size="48" />
        </div>
      )}
    </div>
  )
}