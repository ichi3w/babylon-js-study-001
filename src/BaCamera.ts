import { Scene } from "@babylonjs/core/scene";
import { ArcRotateCamera, FreeCamera, Vector3 } from "@babylonjs/core";

export class BaCamera {
  private _freeCamera?: FreeCamera;
  private _arcRotateCamera?: ArcRotateCamera;

  /**
   * Create Free Camera
   */
  public createFreeCamera(scene: Scene, canvas: HTMLCanvasElement) {
    this._freeCamera = new FreeCamera(
      "freeCamera",
      new Vector3(0, 5, -10),
      scene
    );

    this._freeCamera.setTarget(Vector3.Zero());

    this._freeCamera.attachControl(canvas, true);
  }

  /**
   * Create Arc Rotate Camera
   */
  public createArcRotateCamera(scene: Scene, canvas: HTMLCanvasElement) {
    this._arcRotateCamera = new ArcRotateCamera(
      "arcRotateCamera",
      -Math.PI / 2,
      Math.PI / 2.5,
      15,
      new Vector3(0, 0, 0)
    );

    this._arcRotateCamera.attachControl(canvas, true);
  }

  /**
   * コントロールをクリアする
   */
  public clearAllControls() {
    this._freeCamera?.inputs.clear();
    this._arcRotateCamera?.inputs.clear();
  }
}
