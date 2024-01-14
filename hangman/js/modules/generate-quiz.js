import quiz from "./quiz.js";

function getRandomNum () {
  const min = 1;
  const max = 10;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomQuestion() {
  const currentId = localStorage.getItem("currentIdMarblehands") || 0;
  let id = getRandomNum();
  while (id === Number(currentId)) {
    id = getRandomNum();
  }
  localStorage.setItem("currentIdMarblehands", id);
  console.log('currentId fron LS: ', currentId, 'new id:', id)
  const question = quiz.find((item) => item.id === id);
  return question;
}
