let boxes=document.querySelectorAll(".box")
let reset=document.querySelector("#reset")
let newgame=document.querySelector("#newgame")
let msg=document.querySelector("#msg")
let msgcontainer=document.querySelector(".msg-container")
let h1=document.querySelector("h1")
let p=document.querySelector(".draw")

let turn0=true; //playerX , player0
//2d array to store winning paterns
let winingPatterns=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]

let count=0
boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
console.log("box was clicked",index);

if(turn0){
    box.style.color="blue"
    box.innerText="0";
  
    turn0=false;
   
}else{
    box.style.color="white"
    box.innerText="X";
    turn0=true;
}
count++
box.disabled="true"
patternCheck()

if(count==9){
    console.log("draw")
    draw()
}
    })
})

let draw=()=>{
    h1.style.display="none"
    p.classList.remove("draw")
    p.classList.add("p")
}
 let patternCheck=()=>{
//winningPattern array traversing in each element
for(let pattern of winingPatterns){
    //take out indivial indexex from each element pattern
   // console.log(pattern[0],pattern[1],pattern[2])
    //console.log(boxes[pattern[0]],boxes[pattern[1]],boxes[pattern[2]])

let pos1Value=boxes[pattern[0]].innerText
let pos2Value=boxes[pattern[1]].innerText
let pos3Value=boxes[pattern[2]].innerText
if(pos1Value != "" && pos2Value != "" && pos3Value != ""){
if(pos1Value===pos2Value && pos2Value===pos3Value){
    console.log(pos1Value,"is Winner")
    displayWinner(pos1Value)
}
}
}
}
let displayWinner= (winner)=>{
    msg.innerText=`Congratulations.. Winner is ${winner}`
    msgcontainer.classList.remove("hide")
    disableBoxes()
    
}
let disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
let enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerHTML=""
    }

}
let newGame=()=>{
    turn0=true //again start
    count=0
for(let box of boxes){
    enableBoxes()
}
msgcontainer.classList.add("hide")
p.classList.add("draw")
h1.style.display="block"
}

reset.addEventListener("click",newGame)
newgame.addEventListener("click",newGame)


