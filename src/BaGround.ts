import {
  Color3,
  GroundMesh,
  MeshBuilder,
  StandardMaterial,
} from "@babylonjs/core";

export class BaGround {
  private _ground?: GroundMesh;

  createGround() {
    this._ground = MeshBuilder.CreateGround("ground", {
      width: 10,
      height: 10,
    });

    const groundMat = new StandardMaterial("groundMat");
    groundMat.diffuseColor = new Color3(0, 1, 0.01);
    this._ground.material = groundMat;
  }
}
