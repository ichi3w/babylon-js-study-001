import { BabylonApp } from "./app";
import "destyle.css";
import "./css/index.scss";

document.addEventListener("DOMContentLoaded", () => {
  const app = new BabylonApp();
  app.init();
});
