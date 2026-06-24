/*=========================================
    SMARTCALC PRO
    calc.js
    PART 1
=========================================*/

// ---------- Pages ----------

const welcomePage = document.getElementById("welcomePage");
const loadingPage = document.getElementById("loadingPage");
const loginPage = document.getElementById("loginPage");
const dashboardPage = document.getElementById("dashboardPage");
const calculatorPage = document.getElementById("calculatorPage");
const aboutPage = document.getElementById("aboutPage");

// ---------- Buttons ----------

const startBtn = document.getElementById("startBtn");
const continueBtn = document.getElementById("continueBtn");

const openCalculator =
document.getElementById("openCalculator");

const backDashboard =
document.getElementById("backDashboard");

const aboutBtn =
document.getElementById("aboutBtn");

const backHome =
document.getElementById("backHome");

const logoutBtn =
document.getElementById("logoutBtn");

// ---------- Inputs ----------

const username =
document.getElementById("username");

const greeting =
document.getElementById("greeting");

const progressBar =
document.getElementById("progressBar");

const loadingText =
document.getElementById("loadingText");

const clock =
document.getElementById("clock");

const todayDate =
document.getElementById("todayDate");

// ---------- Helper ----------

function showPage(page){

document
.querySelectorAll(".page")
.forEach(p=>p.classList.remove("active"));

page.classList.add("active");

}

//==========================================
// Start Button
//==========================================

startBtn.addEventListener("click",()=>{

showPage(loadingPage);

let progress=0;

let loading=setInterval(()=>{

progress++;

progressBar.style.width=progress+"%";

loadingText.innerHTML=progress+"%";

if(progress>=100){

clearInterval(loading);

showPage(loginPage);

}

},20);

});

//==========================================
// Continue Button
//==========================================

continueBtn.addEventListener("click",()=>{

let name=username.value.trim();

if(name===""){

alert("Please enter your name.");

return;

}

localStorage.setItem("smartUser",name);

loadDashboard();

});

//==========================================
// Dashboard
//==========================================

function loadDashboard(){

let name=localStorage.getItem("smartUser");

greeting.innerHTML="Hello, "+name+" 👋";

showPage(dashboardPage);

updateDate();

updateClock();

setInterval(updateClock,1000);

}

//==========================================
// Date
//==========================================

function updateDate(){

const d=new Date();

const options={

weekday:"long",

year:"numeric",

month:"long",

day:"numeric"

};

todayDate.innerHTML=

d.toLocaleDateString("en-US",options);

}

//==========================================
// Clock
//==========================================

function updateClock(){

const now=new Date();

let h=now.getHours();

let m=now.getMinutes();

let s=now.getSeconds();

let ampm="AM";

if(h>=12){

ampm="PM";

}

if(h>12){

h=h-12;

}

if(h==0){

h=12;

}

h=h.toString().padStart(2,"0");

m=m.toString().padStart(2,"0");

s=s.toString().padStart(2,"0");

clock.innerHTML=

`${h}:${m}:${s} ${ampm}`;

}

//==========================================
// Auto Login
//==========================================

window.onload=()=>{

let savedUser=

localStorage.getItem("smartUser");

if(savedUser){

loadDashboard();

}

};

//==========================================
// Dashboard Buttons
//==========================================

openCalculator.addEventListener("click",()=>{

showPage(calculatorPage);

});

backDashboard.addEventListener("click",()=>{

showPage(dashboardPage);

});

aboutBtn.addEventListener("click",()=>{

showPage(aboutPage);

});

backHome.addEventListener("click",()=>{

showPage(dashboardPage);

});

//==========================================
// Logout
//==========================================

logoutBtn.addEventListener("click",()=>{

localStorage.removeItem("smartUser");

username.value="";

showPage(loginPage);

});
/*=========================================
    CALCULATOR ENGINE
    PART 2
=========================================*/

const display = document.getElementById("display");

const buttons =
document.querySelectorAll(".buttons button");

//=========================================
// Button Clicks
//=========================================

buttons.forEach(button=>{

button.addEventListener("click",()=>{

const value=button.innerText;

switch(value){

case "AC":

display.value="";

break;

case "⌫":

display.value=
display.value.slice(0,-1);

break;

case "=":

calculate();

break;

case "%":

display.value+="%";

break;

default:

display.value+=value;

}

});

});

//=========================================
// Calculate
//=========================================

function calculate(){

try{

let expression=display.value;

// percentage

expression=
expression.replace(/(\d+)%/g,"($1/100)");

display.value=
eval(expression);

}catch{

display.value="Error";

setTimeout(()=>{

display.value="";

},1000);

}

}

//=========================================
// Keyboard Support
//=========================================

document.addEventListener("keydown",(event)=>{

const key=event.key;

// numbers

if(!isNaN(key)){

display.value+=key;

}

// operators

else if(

key=="+"||

key=="-"||

key=="*"||

key=="/"||

key=="."

){

display.value+=key;

}

// Enter

else if(key==="Enter"){

event.preventDefault();

calculate();

}

// Backspace

else if(key==="Backspace"){

display.value=
display.value.slice(0,-1);

}

// Delete

else if(key==="Delete"){

display.value="";

}

// %

else if(key=="%"){

display.value+="%";

}

});

//=========================================
// Prevent Double Operators
//=========================================

function lastChar(){

return display.value.charAt(

display.value.length-1

);

}

function appendOperator(op){

const operators=["+","-","*","/"];

if(

operators.includes(lastChar())

){

display.value=
display.value.slice(0,-1)+op;

}else{

display.value+=op;

}

}

//=========================================
// Replace Existing Operators
//=========================================

buttons.forEach(btn=>{

btn.addEventListener("click",()=>{

const txt=btn.innerText;

if(txt=="+"){

display.value=
display.value.replace(/[+\-*/]$/,"");

display.value+="+";

}

if(txt=="-"){

display.value=
display.value.replace(/[+\-*/]$/,"");

display.value+="-";

}

if(txt=="*"){

display.value=
display.value.replace(/[+\-*/]$/,"");

display.value+="*";

}

if(txt=="/"){

display.value=
display.value.replace(/[+\-*/]$/,"");

display.value+="/";

}

});

});

//=========================================
// Auto Focus
//=========================================

window.addEventListener("click",()=>{

display.blur();

});

//=========================================
// Calculator Ready
//=========================================

console.log("Calculator Loaded");
/*=========================================
    PART 3
    Scientific Calculator
    Theme
=========================================*/

const scientificPanel =
document.getElementById("scientificPanel");

const scientificBtn =
document.getElementById("toggleScientific");

const themeBtn =
document.getElementById("themeBtn");

let scientificVisible = true;

/*=========================================
    Scientific Panel Toggle
=========================================*/

scientificBtn.addEventListener("click",()=>{

    scientificVisible=!scientificVisible;

    if(scientificVisible){

        scientificPanel.classList.remove("hide");

    }else{

        scientificPanel.classList.add("hide");

    }

});

/*=========================================
    Scientific Buttons
=========================================*/

const sciButtons =
scientificPanel.querySelectorAll("button");

sciButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        let value=button.innerText;

        let number=parseFloat(display.value);

        if(display.value==="") return;

        switch(value){

            case "√":

                display.value=Math.sqrt(number);
                break;

            case "x²":

                display.value=Math.pow(number,2);
                break;

            case "sin":

                display.value=Math.sin(number*Math.PI/180).toFixed(6);
                break;

            case "cos":

                display.value=Math.cos(number*Math.PI/180).toFixed(6);
                break;

            case "tan":

                display.value=Math.tan(number*Math.PI/180).toFixed(6);
                break;

            case "log":

                display.value=Math.log10(number).toFixed(6);
                break;

            case "π":

                display.value=Math.PI.toFixed(6);
                break;

            case "e":

                display.value=Math.E.toFixed(6);
                break;

        }

    });

});

/*=========================================
    Dark / Light Theme
=========================================*/

let dark=false;

themeBtn.addEventListener("click",()=>{

    dark=!dark;

    document.body.classList.toggle("dark");

    if(dark){

        themeBtn.innerHTML='<i class="fa-solid fa-sun"></i>';

    }else{

        themeBtn.innerHTML='<i class="fa-solid fa-moon"></i>';

    }

});

/*=========================================
    Simple Fade Animation
=========================================*/

function animatePage(page){

    page.classList.add("fadeIn");

    setTimeout(()=>{

        page.classList.remove("fadeIn");

    },600);

}

document.querySelectorAll(".page").forEach(page=>{

    page.addEventListener("transitionend",()=>{

        animatePage(page);

    });

});

/*=========================================
    Welcome Message
=========================================*/

console.log("=================================");
console.log(" SmartCalc Pro");
console.log(" HTML + CSS + JavaScript");
console.log(" Final Year Project");
console.log("=================================");

/*=========================================
    End of Project
=========================================*/