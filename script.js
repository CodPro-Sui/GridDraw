let grid = {
  "GW": document.getElementById("GW"),
  "GH": document.getElementById("GH"),
  "gridsR": document.getElementById("gridsR"),
  "gridsC": document.getElementById("gridsC"),
  "clr": document.getElementById("clr"),
  "out": document.getElementById("output")
}
let erase = document.querySelector(".erase");
let isDrawing = false;
let isErase = false;
let bgColor = "#000";
let a = 8;
let b = 8;
let c = 38;
let d = 38;
erase.addEventListener("click", () => {
  isErase = !isErase;
})



grid.GW.addEventListener("input", () => {
  a = grid.GW.value;
  makeGrid();
  
})
grid.GH.addEventListener("input", () => {
  b = grid.GH.value;
  makeGrid();
  
})
grid.gridsC.addEventListener("input", () => {
  c = grid.gridsC.value;
  makeGrid();
  
})
grid.gridsR.addEventListener("input", () => {
  d = grid.gridsR.value;
  makeGrid();
})




function makeGrid() {
  grid.out.innerHTML = "";
  grid.clr.addEventListener("input", () => {
    bgColor = grid.clr.value;
  })
  
  
  
  for (let i = 0; i < c; i++) {
    for (let j = 0; j < d; j++) {
      let div = document.createElement("div");
      div.addEventListener("mousedown", () => {
        isDrawing = true;
        div.style.background = isErase ? "transparent" : bgColor;
      })
      div.addEventListener("touchstart", () => {
        isDrawing = true;
        div.style.background = isErase ? "transparent" : bgColor;
      })
      div.addEventListener("mouseover", () => {
        if (isDrawing) {
          div.style.background = bgColor;
        }
      })
      div.addEventListener("touchstart", () => {
        if (isDrawing) {
          div.style.background = bgColor;
        }
      })
      div.addEventListener("mousemove", () => {
        if (isDrawing) {
          div.style.background = bgColor;
        }
      })
      
      grid.out.appendChild(div);
      div.classList.add("cell");
      div.style.width = `${a}px`;
      div.style.height = `${b}px`;
      
    }
  }
  grid.out.style.gridTemplateColumns = `repeat(${c}, ${a}px)`;
  grid.out.style.gridTemplateRows = `repeat(${d}, ${b}px)`;
}

document.addEventListener("mouseup", () => {
  isDrawing = false;
})
document.addEventListener("touchend", () => {
  isDrawing = false;
})
document.addEventListener("touchcancel", () => {
  isDrawing = false;
})

let clearClr = document.querySelector(".clearClr");
clearClr.addEventListener("click", () => {
  [...grid.out.children].forEach(ele => ele.style.background = "transparent")
})
let download = document.querySelector(".down");
    
download.addEventListener("click", () => {
  let loadDiv = document.createElement("div");
loadDiv.classList.add("load");
document.body.appendChild(loadDiv);
let sound = new Audio("downloadSuccess.mp3");
  html2canvas(grid.out).then(res => {
    let link = document.createElement("a");
    document.body.removeChild(loadDiv);
    link.download = prompt("enter download draw") || "draw.png";
    link.href = res.toDataURL();
    link.click();
    sound.play().catch(err =>{
      console.warn("failed to play...");
    });
    sound.preload = "auto";
    sound.volume = 1.0;
  })
})

document.addEventListener("DOMContentLoaded", () => {
  
  makeGrid();
})