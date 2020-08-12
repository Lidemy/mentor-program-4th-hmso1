/* eslint-disable quotes, no-param-reassign */
function findParent(curLoc, tarLocClassName) {
  while (curLoc.className !== tarLocClassName) {
    curLoc = curLoc.parentElement;
  }
  return curLoc;
}

function crossItem(e) {
  const targetLoc = findParent(e.target, "item-left");

  const checkStatus = targetLoc.querySelector("label").classList.toggle('done');

  if (checkStatus) {
    e.target.parentNode.firstElementChild.checked = true;
  } else {
    e.target.parentNode.firstElementChild.checked = false;
  }
}

function delectItem(e) {
  const targetLoc = findParent(e.target, "list-contents");
  targetLoc.classList.add("hide");
}

function addItem(e) {
  const inputBox = e.target.parentNode[0];

  if (inputBox.value !== '') {
    const copy = document.querySelectorAll(".list-contents");
    const clone = copy[copy.length - 1].cloneNode(true);
    clone.querySelector("label").innerText = inputBox.value;
    clone.classList.remove("hide");
    document.querySelector(".wrapper").insertBefore(clone, document.querySelector(".list-contents"));

    inputBox.setAttribute("placeholder", "待辦清單");
    inputBox.classList.remove("missing-input");
    inputBox.parentNode[0].value = "";
  } else {
    inputBox.setAttribute("placeholder", "請輸入待辦事件");
    inputBox.classList.add("missing-input");
  }
}

document.querySelector(".wrapper").addEventListener("click", (e) => {
  const clickLoc = e.target;
  // check or uncheck the to-do list item
  if (clickLoc.type === 'checkbox' || clickLoc.tagName === 'LABEL') {
    crossItem(e);
  }

  // delect the to-do list item
  if (clickLoc.type === 'button') {
    delectItem(e);
  }

  if (clickLoc.type === 'submit') {
    e.preventDefault();
    addItem(e);
  }
});
