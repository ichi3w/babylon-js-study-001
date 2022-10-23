import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { Engine } from "@babylonjs/core/Engines/engine";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { CreateGround } from "@babylonjs/core/Meshes/Builders/groundBuilder";
import { CreateSphere } from "@babylonjs/core/Meshes/Builders/sphereBuilder";
import { Scene } from "@babylonjs/core/scene";

import { GridMaterial } from "@babylonjs/materials/grid/gridMaterial";

export class BabylonApp {
  private _canvas?: HTMLCanvasElement;
  private _scene?: Scene;
  private _engine?: Engine;

  private _camera?: FreeCamera;

  /**
   * Runs the BabylonApp.
   */
  public init() {
    const resultCs = this._createScene();
    if (!resultCs) return;

    this._createCamera();
    this._createLight();
    this._createObjects();

    if (this._engine) {
      // Render every frame
      this._engine.runRenderLoop(this._update.bind(this));
    }
  }

  /**
   * Update Every Frame
   */
  private _update() {
    if (!this._scene) return;

    this._scene.render();
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
   * Create Camera
   */
  private _createCamera() {
    // This creates and positions a free camera (non-mesh)
    this._camera = new FreeCamera(
      "camera1",
      new Vector3(0, 5, -10),
      this._scene
    );

    // This targets the camera to scene origin
    this._camera.setTarget(Vector3.Zero());

    // This attaches the camera to the canvas
    this._camera.attachControl(this._canvas, true);
  }

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

    // Affect a material
    ground.material = material;
  }
}
