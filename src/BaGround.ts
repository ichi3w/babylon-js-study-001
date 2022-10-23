import { GroundMesh, MeshBuilder } from "@babylonjs/core";

export class BaGround {
  private _ground?: GroundMesh;

  createGround() {
    this._ground = MeshBuilder.CreateGround("ground", {
      width: 10,
      height: 10,
    });
  }
}
