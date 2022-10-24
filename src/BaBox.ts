import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Scene } from "@babylonjs/core/scene";
import { Mesh, MeshBuilder, Tools } from "@babylonjs/core";

export class BaBox {
  private _scene: Scene;
  private _box?: Mesh;

  constructor(scene: Scene) {
    this._scene = scene;
  }

  public createBox(scene: Scene) {
    const box = MeshBuilder.CreateBox("box", { size: 2 }, scene);

    const scaling = new Vector3(1.2, 1.5, 0.8);

    box.position.x = -4;
    box.position.y = 5;

    box.scaling = scaling;

    this._box = box;

    scene.getEngine().runRenderLoop(this._onUpdate.bind(this));
  }

  private _onUpdate() {
    if (!this._box) return;

    this._box.rotation.y += 0.01 * this._scene.getAnimationRatio();
    this._box.rotation.z += Tools.ToRadians(0.1);
  }
}
