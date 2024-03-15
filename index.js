'use strict'
const addList = document.querySelector('.circle');
const bodye = document.getElementsByTagName('body')[0];
const add = document.querySelector(".add");
const moon = document.querySelector('.moon');
const textbox = document.querySelector(".textbox");
const textInTextBox = document.querySelectorAll('.textboxAdd');
const apply = document.querySelector(".aplly")
const cancel = document.querySelector('.cancel');
const lists = document.getElementById("lists");
const custom_select = document.querySelector(".custom-select");
const listLi = document.querySelectorAll(".listLi");
const heading = document.querySelector(".heading");
let updateBackgroundValue = 0;


const ToDoListArr = []


function addToDoList() {
    bodye.style.cssText=`background:#666666;`;
    moon.style.opacity = "0.6";
    textbox.style.opacity = "0.6"; 
    custom_select.style.opacity = "0.6";
    add.style.display = "flex";
}

function createDOM(){
    if(textInTextBox[0].value !== "") {
        let displayMessages = " "
        ToDoListArr.forEach(function(item, i){
            displayMessages +=
            `
                <div class="listString" id="listStringId${i}">
                    <div class="CheckboxAndHeadingList">
                        <input type="checkbox" id="checkbox${i}" class="checkbox">
                        <h2 class="headingList" id="headingListId${i}">${item.todo} #${i+1}</h2>
                    </div>
                    <div class="penAndBasket" id="penAndBasketId${i}">
                        <input class="pen penId${i}" type="image" src="./img/pen.svg" id="penId${i}"/>
                        <input class="basket" type="image" src="./img/basket.svg" id="basketId${i}"/>
                    </div>
                </div>
                <div class="line" id="lineId${i}"></div>
            `
            lists.innerHTML = displayMessages;
        })
    }
}

function cancelToDoList(){
    add.style.display = "none";
    bodye.style.cssText = `none`;
    moon.style.opacity = "1";
    custom_select.style.opacity = "1";
    textbox.style.opacity = "1";

    MouseoverClick();
    checkboxForFuncDeleteToDoList();
    DeleteTheLine();
}

function MouseoverClick(){
    const listStringElemets = document.querySelectorAll(".listString");
    Array.from(listStringElemets).map(function(element, i = 0){
        element.addEventListener('mouseover', function(event) {
            return document.getElementById(`penAndBasketId${i}`).style.cssText = `display: flex;`;
        })
        element.addEventListener('mouseleave', function(event) {
            return document.getElementById(`penAndBasketId${i}`).style.cssText = `display: none;`;
        })
    })
}

function DeleteTheLine(){
    let elementsWithPenClass = document.querySelectorAll('.pen');
    elementsWithPenClass.forEach(function(element, i){
        element.addEventListener('click', function(event) {
            console.log(elementsWithPenClass);
            if(ToDoListArr[i].stringOut === 0){
                console.log(ToDoListArr[i]);
                console.log(ToDoListArr);
                ToDoListArr[i].stringOut++;
                return document.getElementById(`headingListId${i}`).style.cssText = 
                `
                text-decoration: line-through;
                text-decoration-color: rgba(37, 37, 37, 0.50);
                color: rgba(37, 37, 37, 0.50);
                `;
                
            }else{
                console.log(ToDoListArr);
                ToDoListArr[i].stringOut--;
                return document.getElementById(`headingListId${i}`).style.cssText = 
                `
                text-decoration: none;
                text-decoration-color: none;
                `;
            }
        })
    });
}

function checkboxForFuncDeleteToDoList(){
    const checkbox = document.querySelectorAll(".checkbox");
    checkbox.forEach((element, i)=> {
        element.addEventListener("change", function(event){
            if(element.checked !== false){
                return DeleteToDoList(i);
            }else {
                return
            }
        })
    })
}

function DeleteToDoList(i){
    const basketElemets = document.getElementById(`basketId${i}`);
    basketElemets.addEventListener('click', (event) =>{
        const index = basketElemets.getAttribute('index-data');
        lists.removeChild(document.getElementById(`listStringId${i}`));
        lists.removeChild(document.getElementById(`lineId${i}`));
        ToDoListArr.splice(i,1);
        console.log(ToDoListArr);
    })
}

function customSelect(element, i){
    if(element.id === 'listLiId2'){
        ToDoListArr.forEach((todo, index) => {
            if(todo.stringOut === 0 ){
                document.getElementById(`listStringId${index}`).style.cssText = `display: none`
                document.getElementById(`lineId${index}`).style.cssText = `display: none`
            }
            if(todo.stringOut === 1){
                document.getElementById(`listStringId${index}`).style.cssText = `display: flex`
                document.getElementById(`lineId${index}`).style.cssText = `display: flex`
            }
        })
    }
    if(element.id === 'listLiId1'){
        ToDoListArr.forEach((todo, index) => {
            if(todo.stringOut === 1){
                document.getElementById(`listStringId${index}`).style.cssText = `display: none`
                document.getElementById(`lineId${index}`).style.cssText = `display: none`
                console.log(document.getElementById(`listStringId${index}`));
            }
            if(todo.stringOut === 0){
                document.getElementById(`listStringId${index}`).style.cssText = `display: flex`
                document.getElementById(`lineId${index}`).style.cssText = `display: flex`
            }
        })
    }
    if(element.id === 'listLiId0'){
        ToDoListArr.forEach((todo, index) => {
            document.getElementById(`listStringId${index}`).style.cssText = `display: flex`
            document.getElementById(`lineId${index}`).style.cssText = `display: flex`
        })
    }
}

function updateBackgroundAfterReboot(){
    moon.addEventListener('click', ()=>{
        const headingList = document.querySelector(".headingList");
        if(updateBackgroundValue === 0){
            bodye.style.cssText= `background: #252525;`;
            textbox.style.cssText = 
            `
            border-radius: 5px;
            border: 1px solid var(--white, #F7F7F7);
            background: #252525;
            `;
            headingList.style.cssText = 'color: var(--white, #F7F7F7);'
            heading.style.cssText = 'color: var(--white, #F7F7F7);';
            updateBackgroundValue++
        }
        else{
            bodye.style.cssText= `background: none;`;
            textbox.style.cssText = 
            `
            border-radius: none;
            border: 1px solid var(--purple, #6C63FF);
            background: none;
            `;
            heading.style.cssText = 'color: none';
            headingList.style.cssText = 'color: none';
            updateBackgroundValue--;
        }
    })
}
function updateBackground(){
    const headingList = document.querySelectorAll(".headingList");
    if(updateBackgroundValue === 0){
        bodye.style.cssText= `background: #252525;`;
        textbox.style.cssText = 
        `
        border-radius: 5px;
        border: 1px solid var(--white, #F7F7F7);
        background: #252525;
        `;
        headingList.style.cssText = 'color: var(--white, #F7F7F7);'
        heading.style.cssText = 'color: var(--white, #F7F7F7);';
        updateBackgroundValue++
    }
    else{
        bodye.style.cssText= `background: none;`;
        textbox.style.cssText = 
        `
        border-radius: none;
        border: 1px solid var(--purple, #6C63FF);
        background: white;
        `;
        headingList.style.cssText = 'none';
        heading.style.cssText = 'color: none';
        updateBackgroundValue--;
    }
}

addList.addEventListener('click', addToDoList);
apply.addEventListener('click', function(e){
    e.preventDefault();
    const ToDoLists = {
        todo: textInTextBox[0].value,
        checked: 0,
        stringOut: 0
    };
    ToDoListArr.push(ToDoLists);
    
    createDOM();
});
cancel.addEventListener('click', cancelToDoList);
listLi.forEach((element, i)=>{
    element.addEventListener('click', (event) => {
        customSelect(element, i)
    })
})
moon.addEventListener('click', updateBackground)

//console.log(ToDoListArr);