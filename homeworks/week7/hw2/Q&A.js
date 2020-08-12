/* eslint-disable quotes */
const ele = document.querySelector('.question-list');

ele.addEventListener("click", (e) => {
  let currentLoc = e.target;

  while (currentLoc.className !== "question-answer-set") {
    currentLoc = currentLoc.parentElement;
  }
  currentLoc.querySelector(".answer").classList.toggle('active');
});
