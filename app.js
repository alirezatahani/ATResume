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
  await writeTo("style", 0, mainElement, style, 1, 80);
  await writeTo("text", 0, styleElement, style, 1, 80);
}

async function writeTo(
  type,
  index,
  target,
  message,
  characterPerInterval,
  speed
) {
  return new Promise((resolve, reject) => {
    const char = message.slice(index, index + characterPerInterval);
    characterPerInterval++;
    if (type === "text") {
      target.innerHTML = char;
    } else {
      target.innerHTML = char;
      styleHeader.innerHTML = char;
    }

    if (characterPerInterval < message.length) {
      setTimeout(async () => {
        await writeTo(
          type,
          index,
          target,
          message,
          characterPerInterval,
          speed
        );
        resolve();
      }, speed);
    } else {
      resolve();
    }
  });
}
