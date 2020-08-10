import { Wheel } from "./src/wheel";
import "./src/styles.scss";

const wheel = new Wheel("#canvas-container", {
  sectors: [
    "one",
    "two",
    "three",
    "four",
    "five",
    "one",
    "two",
    "three",
    "four",
    "five",
    "one",
    "two",
    "three",
    "four",
    "five",
    "one",
    "two",
    "three",
    "four",
    "five",
  ],
});

window.s = wheel;
