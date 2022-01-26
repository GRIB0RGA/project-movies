import { getData } from "./scripts/excersize1.js";
import { getDataForPart2 } from "./scripts/excersize2.js";

const switchBtn = document.getElementById(`switchExcersize`);
const searchBtn = document.getElementById(`searchBtn`);
const calculateBtn = document.getElementById(`calculateBtn`);
const excersizeConatiner1 = document.getElementById(`excersize1`);
const excersizeConatiner2 = document.getElementById(`excersize2`);

// switchBtn.addEventListener(`click`)
const excersizeSwitcher = () => {
  excersizeConatiner1.classList.toggle(`hidden`);
  excersizeConatiner2.classList.toggle(`hidden`);
};

// event handlers
switchBtn.addEventListener(`click`, excersizeSwitcher);
searchBtn.addEventListener(`click`, getData);
calculateBtn.addEventListener(`click`, getDataForPart2);
