import style from "raw-loader!./style.css";
import style2 from "raw-loader!./style2.css";
import text1 from "raw-loader!./txt1.txt";
import writeChar from "./write";
import MarkdownIt from "markdown-it";
import { writeSimpleChar } from "./write";

let mainElement, workElement, styleHeader;
const md = new MarkdownIt();
const renderedText1 = md.render(text1);
console.log(renderedText1);

// Wait for load to get started.
document.addEventListener("DOMContentLoaded", function() {
  //   getBrowserPrefix();
  makeElements();
  getElements();
  //   createEventHandlers();
  startAnimation();
});

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function makeElements() {
  const mainPre = document.createElement("pre");
  mainPre.setAttribute("id", "main");

  const workPre = document.createElement("pre");
  workPre.setAttribute("id", "work");

  const styleHeader = document.createElement("style");
  styleHeader.setAttribute("id", "styleHeader");

  document.body.appendChild(mainPre);
  document.body.appendChild(workPre);
  document.head.appendChild(styleHeader);
}

function getElements() {
  mainElement = document.getElementById("main");
  workElement = document.getElementById("work");
  styleHeader = document.getElementById("styleHeader");
}

async function startAnimation() {
  await writeTo(true, 0, mainElement, style, 0);
  await delay(1000);
  writeTo(false, 0, workElement, text1, 0);
  writeTo(true, 0, mainElement, style2, 0);
  await delay(1000);
}

function flipText(target) {
  target.innerHTML = md.render(workElement.innerHTML);
}

async function writeTo(isStyle, index, target, message, speed) {
  return new Promise((resolve, reject) => {
    const char = message.slice(index, index + 1);
    index++;
    target.scrollTop = target.scrollHeight;
    if (isStyle) {
      writeChar(target, char, styleHeader);
    } else {
      writeSimpleChar(target, char);
    }

    if (index < message.length) {
      setTimeout(async () => {
        await writeTo(isStyle, index, target, message, speed);
        resolve();
      }, speed);
    } else {
      if (!isStyle) {
        flipText(workElement);
      }
      resolve();
    }
  });
}
