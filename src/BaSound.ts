import { Sound } from "@babylonjs/core";
import { Scene } from "@babylonjs/core/scene";

export class BaSound {
  public createSound(scene: Scene) {
    // Load the sound and play it automatically once ready
    const music = new Sound(
      "cello",
      "https://playground.babylonjs.com/sounds/cellolong.wav",
      scene,
      null,
      { loop: true, autoplay: true }
    );

    music.play();
  }
}
