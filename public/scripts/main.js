const audioCtx = new window.AudioContext()
const tapSoundBuffer = await fetch("/assets/sfx/!boring_sound_kit/natural-tap-1.wav")
  .then(res => res.arrayBuffer())
  .then(data => audioCtx.decodeAudioData(data))
  
document.addEventListener("mousedown", async (event) => {
  if (event.target.closest(`a:not([disabled]), button:not([disabled])`)) {
    const tapSoundSource = audioCtx.createBufferSource()
    tapSoundSource.buffer = tapSoundBuffer
    tapSoundSource.connect(audioCtx.destination)
    tapSoundSource.start(0)
  }
})