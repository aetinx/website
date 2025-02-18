// Latapals KeyKit

console.clear()

const data = { codes: new Set(), keys: new Set() }

document.addEventListener("keydown", event => {
  data.codes.add(event.code)
  data.keys.add(event.key)
})

document.addEventListener("keyup", event => {
  data.codes.delete(event.code)
  data.keys.delete(event.key)
  if (data.codes.size <= 0 || data.codes.size != data.keys.size) cancelKeys()
})

const cancelKeys = () => {
  data.codes.clear()
  data.keys.clear()
}

const mods = ["Alt", "AltGraph", "Control", "Fn", "FnLock", "Hyper", "Meta", "NumLock", "ScrollLock", "Shift", "Super", "Symbol", "SymbolLock"]

let _shortcutExitEventTypes = [
  "focusin",
  "focusout",
  "blur",
  "visibilitychange",
  "fullscreenchange"
]

export class Shortcut {
  constructor(p, c, o) {
    this.prompt = p
    this.callback = c
    this.options = o
    this.done = 0
    this.boundKd = this.kd.bind(this)
    this.boundKu = this.ku.bind(this)
    document.addEventListener("keydown", this.boundKd)
    document.addEventListener("keyup", this.boundKu)
    _shortcutExitEventTypes.forEach(item => document.addEventListener(item, this.reset))
  }
   
  kd(event) {
    const p = this.prompt, c = this.callback, o = this.options
    const names = p.trim().split(/\s+/)
    const arrEq = (x, y) => x.size == y.size && x.every((xx, i) => y[i] == xx)
    const setEq = (x, y) => x.size == y.size && [...x].every(xx => y.has(xx))
    const fixSet = s => {
      const set = new Set([...s])
      const mapping = {
        " ": "Space"
      }
      for (let [key, value] of Object.entries(mapping)) {
        if (set.has(key)) {
          set.delete(key)
          set.add(value)
        }
      }
      return set
    }

    const targetMods = names.filter(x => mods.includes(x))
    const targetCommons = names.filter(x => !mods.includes(x))
    const pressedMods = mods.filter(x => fixSet(data.keys).has(x))
    const pressedCommons = [...fixSet(data.keys)].filter(x => !pressedMods.some(y => y == x))

    if (setEq(new Set(targetMods), new Set(pressedMods)) && setEq(new Set(targetCommons), new Set(pressedCommons)) && (this.options?.repeat || this.done <= 0)) {
      this.callback(event)
      this.done++
    }
  }
  
  ku() {
    this.done = 0
  }

  reset() {
    this.pressedKeys?.clear()
    this.pressedModifiers?.clear()
    this.doneOnce = false
  }

  kill() {
    document.removeEventListener("keydown", this.boundKd)
    document.removeEventListener("keyup", this.boundKu)
  }
}