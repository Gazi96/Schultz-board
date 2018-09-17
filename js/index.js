"use strict";

class table{
    constructor(rows, columns, table, stoper){
        this.rows = rows;
        this.columns = columns;
        this.table = table;
        this.stoper = stoper;
    }
    
    draw(){
        this.table.textContent = "";
        
        for(let i = 0; i < this.rows * this.columns; i++){
            const tableItem = document.createElement("div");
            tableItem.classList = "table__item";
            tableItem.style.flexBasis = `${100/this.rows}%`;
            
            this.table.appendChild(tableItem);
        }
    }
    
    writeNumbers(array){
        const tableItem = document.getElementsByClassName("table__item");
        console.log(array.length);
        for(let i = 0; i < array.length; i++){
            tableItem[i].textContent = array[i];
        }
    }
}

startApp();

function startApp(){
    const startButton = document.getElementsByClassName("main__button")[0];
    
    startButton.addEventListener("click", () => {
        startButton.classList.toggle("main__button--none");
        newGame(); 
    });
}

function newGame(){
    const tableElement = document.getElementsByClassName("table")[0];
    const rows = 5;
    const cols = 5;
    const newTable = new table(5, 5, tableElement, 0);
    const array = shuffle(createArray(rows, cols));
    let time = 0;
    
    console.log(newTable);
    stoper(time, newTable);
    newTable.draw();
    newTable.writeNumbers(array);
    addEventOnTable(newTable);
}

function addEventOnTable(newTable){
    const tableItem = document.getElementsByClassName("table__item");
    let count = 1;
    
    for(let i = 0; i < tableItem.length; i++){
        tableItem[i].addEventListener("click", function listener(){
            checkTheValue(count, i, this, newTable); 
            count = incrementCount(count, this);
            
            tableItem[i].removeEventListener("click", listener, true);
        });   
    }
}

function incrementCount(count, tableItem){
    if(count == tableItem.textContent){
        count++;
    }
    
    return count;
}

function checkTheValue(count, i, tableItem, newTable){
    if(count == 25){
        clearTimeout(newTable.stoper);
        newGame();
        console.log("Koniec gry") 
    }
    else{
        changeColor(count, i, tableItem);
        console.log("Gra nie skończona");
    }   
}

function changeColor(count, i, tableItem){
    if(count == tableItem.textContent){
        changeColorGreen(count, i, tableItem);
    }
    else{
        changeColorRed(count, i, tableItem);
    }
}

function changeColorGreen(count, i, tableItem){
    tableItem.style.background = "linear-gradient(to right, rgb(29, 151, 108), rgb(147, 249, 185))";
    
    setInterval(() =>{
        tableItem.style.background = "transparent";
    }, 300);
}

function changeColorRed(count, i, tableItem){
    tableItem.style.background = "linear-gradient(to left, rgb(235, 51, 73), rgb(244, 92, 67))";
    
    setInterval(() =>{
        tableItem.style.background = "transparent";
    }, 300);
}

function createArray(rows, cols){
    let array = [];
    
    for(let i = 1; i <= rows * cols; i++){
        array.push(i);
    }
    
    return array;
}

function shuffle(array){
      var currentIndex = array.length, temporaryValue, randomIndex;

      while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

        return array;
    }

function stoper(time, newTable){
    const timeElement = document.getElementsByClassName("header__time")[0];
    let mins;
    let secs;
    let tenths;
    console.log(newTable.rows);
    newTable.stoper = setTimeout(function(){
        time++;
        mins = Math.floor(time / 60);
        secs = Math.floor(time % 60);
    
        if(mins < 10){
            mins = "0" + mins;
        }
        if(secs < 10){
            secs = "0" + secs;
        }
                
        timeElement.textContent = mins + ":" + secs;
        stoper(time, newTable);
    }, 1000);
}