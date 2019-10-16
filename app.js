import style from "raw-loader!./style.css";
import writeChar from "./write";
import writeSimpleChar from "./write";
let mainElement, styleElement, styleHeader;

// Wait for load to get started.
document.addEventListener("DOMContentLoaded", function() {
  //   getBrowserPrefix();
  makeElements();
  getElements();
  //   createEventHandlers();
  startAnimation();
});

function makeElements() {
  const mainPre = document.createElement("pre");
  mainPre.setAttribute("id", "main");

  const stylePre = document.createElement("pre");
  stylePre.setAttribute("id", "style");

  const styleHeader = document.createElement("style");
  styleHeader.setAttribute("id", "styleHeader");

  document.body.appendChild(mainPre);
  document.body.appendChild(stylePre);
  document.head.appendChild(styleHeader);
}

function getElements() {
  mainElement = document.getElementById("main");
  styleElement = document.getElementById("style");
  styleHeader = document.getElementById("styleHeader");
}

async function startAnimation() {
  await writeTo(true, 0, mainElement, style, 0);
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
      resolve();
    }
  });
}
