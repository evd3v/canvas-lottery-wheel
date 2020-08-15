import { Wheel } from "../dist/bundle.4171bf99a1b2a61a40d0";
import "@/styles.scss";

const sectors = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
];

const wheel = new Wheel("#canvas-container", {
  sectors,
});

function toOptions(items) {
  return items.map((item) => {
    return `
    <option value="${item}">${item}</option>
   `;
  });
}

const $select = document.querySelector("#select-sector");
const options = toOptions(sectors).join("");
$select.innerHTML = options;

const wheelBtn = document.querySelector("#wheel-btn");
wheelBtn.addEventListener("click", () => {
  const sectorId = $select.value;
  wheel.rotate(sectorId);
});

window.s = wheel;
