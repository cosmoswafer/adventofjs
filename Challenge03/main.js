import { Keyboard } from "./keyboard.js";

let keyboard = new Keyboard();

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const shuffledArray = array.sort((a, b) => 0.5 - Math.random());
console.log(array);
