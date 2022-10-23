import { BaGround } from "./BaGround";
import { Engine } from "@babylonjs/core/Engines/engine";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { CreateGround } from "@babylonjs/core/Meshes/Builders/groundBuilder";
import { CreateSphere } from "@babylonjs/core/Meshes/Builders/sphereBuilder";
import { Scene } from "@babylonjs/core/scene";
import { BaCamera } from "./BaCamera";

import { GridMaterial } from "@babylonjs/materials/grid/gridMaterial";
import { Sound } from "@babylonjs/core";

export class BabylonApp {
  private _canvas?: HTMLCanvasElement;
  private _scene?: Scene;
  private _engine?: Engine;

  /**
   * Runs the BabylonApp.
   */
  public init() {
    const resultCs = this._createScene();
    if (!resultCs) return;

    if (!this._scene || !this._engine || !this._canvas) return;

    this._createLight();

    const baCamera = new BaCamera();
    baCamera.createArcRotateCamera(this._scene, this._canvas);

    const baGround = new BaGround();
    baGround.createGround();

    this._createObjects();
    // this._loadMesh();
    // this._createSound();

    // Render every frame
    this._engine.runRenderLoop(this._onUpdate.bind(this));

    // Add Resize Event
    window.addEventListener("resize", this._onResize.bind(this));
  }

  /**
   * Update Every Frame
   */
  private _onUpdate() {
    if (!this._scene) return;

    this._scene.render();
  }

  /**
   * Resize
   */
  private _onResize() {
    if (!this._engine) return;

    this._engine.resize();
  }

  /**
   * Create Scene and Attach to Canvas
   */
  private _createScene() {
    // Get the canvas element from the DOM.
    this._canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

    if (!this._canvas || !(this._canvas instanceof HTMLCanvasElement)) {
      console.error("Canvas not found");
      return false;
    }

    // Associate a Babylon Engine to it.
    this._engine = new Engine(this._canvas);

    // Create our first scene.
    this._scene = new Scene(this._engine);
    return true;
  }

  /**
   * Create Light
   */
  private _createLight() {
    if (!this._scene) return;

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new HemisphericLight(
      "light1",
      new Vector3(0, 1, 0),
      this._scene
    );

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;
  }

  private _createObjects() {
    // Create a grid material
    const material = new GridMaterial("grid", this._scene);

    // Our built-in 'sphere' shape.
    const sphere = CreateSphere(
      "sphere1",
      { segments: 16, diameter: 2 },
      this._scene
    );

    // Move the sphere upward 1/2 its height
    sphere.position.y = 2;

    // Affect a material
    sphere.material = material;

    // Our built-in 'ground' shape.
    const ground = CreateGround(
      "ground1",
      { width: 6, height: 6, subdivisions: 2 },
      this._scene
    );

    ground.position.y = 0.5;

    // Affect a material
    ground.material = material;
  }

  private _loadMesh() {
    SceneLoader.ImportMeshAsync(
      "semi_house",
      "https://assets.babylonjs.com/meshes/",
      "both_houses_scene.babylon",
      this._scene
    );
  }

  private _createSound() {
    // Load the sound and play it automatically once ready
    const music = new Sound(
      "cello",
      "https://playground.babylonjs.com/sounds/cellolong.wav",
      this._scene,
      null,
      { loop: true, autoplay: true }
    );
    music.play();
  }
}
