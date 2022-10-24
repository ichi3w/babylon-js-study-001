import {
  InstancedMesh,
  Mesh,
  MeshBuilder,
  StandardMaterial,
  Texture,
  Vector4,
} from "@babylonjs/core";

export class BaHouse {
  private _houses: InstancedMesh[] = [];
  private _house?: Mesh;

  public createHouse() {
    // box
    const boxMat = new StandardMaterial("boxMat");
    boxMat.diffuseTexture = new Texture(
      "https://assets.babylonjs.com/environments/cubehouse.png"
    );

    const faceUV = [];
    faceUV[0] = new Vector4(0.5, 0.0, 0.75, 1.0); //rear face
    faceUV[1] = new Vector4(0.0, 0.0, 0.25, 1.0); //front face
    faceUV[2] = new Vector4(0.25, 0, 0.5, 1.0); //right side
    faceUV[3] = new Vector4(0.75, 0, 1.0, 1.0); //left side

    const box = MeshBuilder.CreateBox("box", { faceUV: faceUV, wrap: true });
    box.position.y = 0.5;

    box.material = boxMat;

    // roof
    const roof = MeshBuilder.CreateCylinder("roof", {
      diameter: 1.3,
      height: 1.2,
      tessellation: 3,
    });
    roof.scaling.x = 0.75;
    roof.rotation.z = Math.PI / 2;
    roof.position.y = 1.22;

    const roofMat = new StandardMaterial("roofMat");
    roofMat.diffuseTexture = new Texture(
      "https://assets.babylonjs.com/environments/roof.jpg"
    );

    roof.material = roofMat;

    // merge
    const house = Mesh.MergeMeshes(
      [box, roof],
      true,
      false,
      undefined,
      false,
      true
    );

    if (house) {
      this._house = house;
      house.position.x = -1.5;
    }

    // add event
    const buttonElement = document.getElementById("button");
    if (buttonElement) {
      buttonElement.addEventListener("click", () => {
        this._copyHouse();
      });
    }
  }

  private _copyHouse() {
    if (!this._house) return;

    const nextIndex = this._houses.length;
    const house = this._house.createInstance("house" + nextIndex);
    house.position.x = 0 + nextIndex * 1.5;

    this._houses.push(house);
  }
}
