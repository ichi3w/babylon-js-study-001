import { MeshBuilder } from "@babylonjs/core";
import { GridMaterial } from "@babylonjs/materials/grid/gridMaterial";

export class BaSphere {
  public createSphere() {
    // Create a grid material
    const material = new GridMaterial("grid");

    // Our built-in 'sphere' shape.
    const sphere = MeshBuilder.CreateSphere("sphere1", {
      segments: 16,
      diameter: 2,
    });

    // Move the sphere upward 1/2 its height
    sphere.position.x = 3;
    sphere.position.y = 3;

    // Affect a material
    sphere.material = material;
  }
}
