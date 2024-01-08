import quiz from "./quiz.js";

let currentId = 0;
localStorage.setItem("currentIdMarblehands", currentId);

function getRandomNum () {
  const min = 1;
  const max = 10;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomId() {
  currentId = localStorage.getItem("currentIdMarblehands");
  let newId = getRandomNum();
  while (newId === Number(currentId)) {
    newId = getRandomNum();
  }
  return newId;
}

export function getRandomQuestion() {
  const id = getRandomId();
  currentId = id;
  localStorage.setItem("currentIdMarblehands", currentId);
  const question = quiz.find((item) => item.id === id);
  return question;
}
