import "./style.css";

import { startGame, events } from "./ui";

// DOMContentLoaded + Events*****************************************************
document.addEventListener("DOMContentLoaded", function () {
  startGame();
  events();
});
