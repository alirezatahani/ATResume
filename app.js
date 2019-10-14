import style from "raw-loader!./style.css";

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
  Promise.all([
    writeTo(0, mainElement, style, 1, 10),
    writeTo(0, styleElement, style, 1, 10)
  ]);
}

async function writeTo(index, target, message, characterPerInterval, speed) {
  return new Promise((resolve, reject) => {
    const char = message.slice(index, index + characterPerInterval);
    characterPerInterval++;
    target.innerHTML = char;
    styleHeader.innerHTML = char;

    if (characterPerInterval < message.length) {
      setTimeout(
        () => writeTo(index, target, message, characterPerInterval, speed),
        speed
      );
    } else {
      resolve();
    }
  });
}
