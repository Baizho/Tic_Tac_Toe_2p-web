const parcontainer = document.getElementById("container");
const parerror = document.getElementById("error");
const Turn = document.getElementById("turnid");
const parlastwin = document.getElementById("lastwin");
const parcountx=document.getElementById("countX");
const parcounto=document.getElementById("countO");
parlastwin.src = "White background.png";
Turn.style.width = "200px";
Turn.style.height = "200px";
parlastwin.style.width = "200px";
parlastwin.style.height = "200px";
let turn = 0;
let firsttime=0;
let table = [["$", "$", "$"], ["$", "$", "$"], ["$", "$", "$"]];
let countx=0;
let counto=0;
const storageLastwonpic=localStorage.getItem("Lastwonpic");
if(storageLastwonpic!==null) {
  parlastwin.src=storageLastwonpic;
}
const storagecountx=localStorage.getItem("storacountx");
if(storagecountx!==null) { countx=parseInt(storagecountx); }
const storagecounto=localStorage.getItem("storacounto");
if(storagecounto!==null) { counto=parseInt(storagecounto); }

$("#baricon").mouseenter(() => {
  const parshowproj=document.getElementById("showproj");
  if(parshowproj.style.display==="block") {
    parshowproj.style.display="none";
  }
   else {
      parshowproj.style.display="block";
    }
});
$("#showproj").mouseleave(() => {
  const parshowproj=document.getElementById("showproj");
  parshowproj.style.display="none";
});

function won() {
  if (table[0][0] === table[0][1] && table[0][1] === table[0][2]) return table[0][0];
  if (table[0][0] === table[1][1] && table[1][1] === table[2][2]) return table[0][0];
  if (table[0][0] === table[1][0] && table[1][0] === table[2][0]) return table[0][0];
  if (table[0][2] === table[1][1] && table[1][1] === table[2][0]) return table[0][2];
  if (table[0][2] === table[1][2] && table[1][2] === table[2][2]) return table[0][2];
  if (table[2][0] === table[2][1] && table[2][1] === table[2][2]) return table[2][2];
  if (table[1][0] === table[1][1] && table[1][1] === table[1][2]) return table[1][2];
  if (table[0][1] === table[1][1] && table[1][1] === table[2][1]) return table[2][1];
  return "$";
}



function refreshUI() {
  if (turn % 2 !== 0) { Turn.src = "./Otoe.png"; }
  else { Turn.src = "./download.png" }
  localStorage.setItem("storacountx",countx);
  localStorage.setItem("storacounto",counto);
  parcountx.innerText=String(countx);
  parcounto.innerText=String(counto);
  if(won()!=="$" && firsttime==1) {return 0;}
  parerror.innerText = "";
  parcontainer.innerHTML = "";
  table.forEach((row, x) => {
    const frow = document.createElement("div");
    frow.classList.add("flexrow");
    row.forEach((value, y) => {
      const but = document.createElement("button");
      const image = document.createElement("img");
      if (value === "$") { image.src = "./White background.png"; }
      else if (value === "O") { image.src = "./Otoe.png"; }
      else { image.src = "./download.png" }
      but.appendChild(image);
      frow.appendChild(but);
      but.addEventListener("click", () => {
        if (value === "$") {
          if (turn % 2 === 0) {
            table[x][y] = "X";
          }
          else { table[x][y] = "O"; }
          if(firsttime===0)turn++;
          refreshUI();
        }
        else {
          parerror.innerText = "Error";
        }
      });
    })
    parcontainer.appendChild(frow);
  })
  if (won() !== "$") {
    let res = won();
    if (res === "X") { parlastwin.src = "./download.png"; countx++;localStorage.setItem("Lastwonpic","./download.png");}
    else { parlastwin.src = "./Otoe.png"; counto++;localStorage.setItem("Lastwonpic","./Otoe.png");}
    firsttime=1;
    refreshUI();
    return 0;
  }
}

function swapPoints() {
  const mem=countx;
  countx=counto;
  counto=mem;
  refreshUI();
}

function refreshGame() {
  for(let i=0;i<table.length;i++){
      for(let j=0;j<table[i].length;j++) {
        table[i][j]="$";
      }
  }
  firsttime=0;
  turn=0;
  refreshUI();
}

function refreshPoints() {
  countx=0;
  counto=0;
  refreshUI();
}
      
refreshUI();
