class Sound {
  constructor() {
    this.context = new AudioContext()
    this.currentlyPlaying = null
    this.sounds = {
      ambient: {
        blaster: new Audio('sounds/blaster.mp3'),
        blasterEnemy: new Audio('sounds/blasterEnemy.mp3'),
        engine: new Audio('sounds/engine.mp3'),
        explosion: new Audio('sounds/explosion.mp3'),
        music: new Audio('sounds/music.mp3')
      }
    }
    this.resumed = false;
    window.addEventListener('mousedown', () => {
      if (!this.resumed) {
        this.context.resume();
        this.resumed = true;
      }
    })
  }

  async play(soundType, soundName) {
    const sound = this.sounds[soundType][soundName]
    sound.currentTime = 0
    const playPromise = sound.play()
    this.currentlyPlaying = this.sounds[soundType][soundName]

    if (playPromise !== undefined) {
      playPromise.then(() => {
      }).catch(() => {
      });
    }

    return new Promise(resolve => {
      sound.addEventListener('ended', () => {
        resolve();
      })
    })
  }

stop(soundType, soundName) {
    const sound = this.sounds[soundType][soundName]
    sound.pause()
    sound.currentTime = 0
  }

}