import { conf } from "./settings.js";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

class AudioPlayer {
  audio_mp3;
  player_e = document.createElement("audio");

  constructor(mp3) {
    this.audio_mp3 = conf.audio_prefix + mp3;
    this.player_e.setAttribute("src", this.audio_mp3);
  }

  play() {
    console.log(`Play ${this.audio_mp3}`);
    this.player_e.play();
  }
}

export class Keyboard {
  keys = document.querySelectorAll("svg path");
  a_keys = document.querySelectorAll("svg a");
  players = new Array();

  constructor() {
    this._createPlayers();
    this._bindEvents();
  }

  _createPlayers() {
    for (let i = 1; i <= 23; i++) {
      this.players.push(new AudioPlayer(`key-${i}.mp3`));
      //document.body.appendChild(this.players.at(-1).player_e);
    }
    shuffleArray(this.players);
  }

  _bindEvents() {
    let s = 0;
    for (let i of this.keys) {
      i.setAttribute("key-no", s++);
      i.addEventListener("click", this.play);
    }
  }

  _targetPlayer(i) {
    return this.players.at(i);
  }

  play = (e) => {
    let player = this._targetPlayer(e.target.getAttribute("key-no"));
    player.play();
  };
}
