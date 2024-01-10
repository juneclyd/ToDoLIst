'use strict'
const addList = document.querySelector('.circle');
const main = document.querySelector('.main');
const bodye = document.getElementsByTagName('body')[0];
const add = document.querySelector(".add");
const moon = document.querySelector('.moon');
const textbox = document.querySelector(".textbox");
const textInTextBox = document.querySelectorAll('.textboxAdd');
const aplly = document.querySelector(".aplly")
const cancel = document.querySelector('.cancel');
const menu = document.querySelector(".menu");
const checkbox = document.querySelector(".checkbox");
const lists = document.getElementById("lists");
const pen = document.querySelector(".pen");
const penAndBasket = document.querySelector(".penAndBasket");
const custom_select = document.querySelector(".custom-select");
const listLi = document.querySelectorAll(".listLi");
const heading = document.querySelector(".heading");
let updateBackgroundValue = 0;

let stringTextInTextBox = "";
let checkboxValueNum = 0;
let applyIndex = 0;
let boolCancel = 0;

const ToDoListArr = []

function addToDoList() {
    boolCancel = 0;
    bodye.style.cssText=
    `
    background:#666666;
    `;
    moon.style.opacity = "0.6";
    textbox.style.opacity = "0.6"; 
    custom_select.style.opacity = "0.6";
    add.style.display = "flex";
}
function cancelToDoList(){
    add.style.display = "none";
    bodye.style.cssText = `none`;
    moon.style.opacity = "1";
    custom_select.style.opacity = "1";
    textbox.style.opacity = "1";

    boolCancel = 1;
    MouseoverClick();
    stringOut();
    checkboxForFuncDeleteToDoList();
}
function customSelect(element, i){
    if(element.id === 'listLiId2'){
        ToDoListArr.forEach((todo, index) => {
            if(todo.stringOut === 0 ){
                document.getElementById(`listStringId${index}`).style.cssText = `display: none`
                document.getElementById(`lineId${index}`).style.cssText = `display: none`
                console.log(document.getElementById(`listStringId${index}`));
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

function checkboxForFuncDeleteToDoList(){
    const checkbox = document.querySelectorAll(".checkbox");
    checkbox.forEach((element, i)=> {
        element.addEventListener("change", function(event){
            if(element.checked !== false){
                DeleteToDoList(i);
                
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
        const listsElement = document.querySelector(".lists");
        listsElement.removeChild(document.getElementById(`listStringId${i}`));
        listsElement.removeChild(document.getElementById(`lineId${i}`));
        ToDoListArr.splice(index,1);
    })
    return 0;
    // basketElemets.forEach(function(element, i = 0){
    //     element.addEventListener("click", function(event){
    //         const index = element.getAttribute('index-data');
    //         const listsElement = document.querySelector(".lists");
    //         listsElement.removeChild(document.getElementById(`item${i}`));
    //         listsElement.removeChild(document.getElementById(`lineId${i}`));
    //         ToDoListArr.splice(index,1);
    //     })
    // })
}
function MouseoverClick(){
    const listStringElemets = document.querySelectorAll(".listString");
    listStringElemets.forEach(function(element, i = 0){
        element.addEventListener('mouseover', function(event) {
            document.getElementById(`penAndBasketId${i}`).style.cssText = 
            `
            display: flex;
            `;
        })
        element.addEventListener('mouseleave', function(event) {
            document.getElementById(`penAndBasketId${i}`).style.cssText = 
            `
            display: none;
            `;
        })
    })
}
function stringOut(){
    let elementsWithPenClass = document.querySelectorAll('.pen');
    elementsWithPenClass.forEach(function(element, i = 0){
        element.addEventListener('click', function(event) {
            if(ToDoListArr[i].stringOut === 0){
                ToDoListArr[i].stringOut++;
                document.getElementById(`headingListId${i}`).style.cssText = 
                `
                text-decoration: line-through;
                text-decoration-color: rgba(37, 37, 37, 0.50);
                color: rgba(37, 37, 37, 0.50);
                `;
                console.log(ToDoListArr);
                
            }else{
                ToDoListArr[i].stringOut--;
                document.getElementById(`headingListId${i}`).style.cssText = 
                `
                text-decoration: none;
                text-decoration-color: none;
                `;
                console.log(ToDoListArr);
            }
        })
    });
    
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
cancel.addEventListener('click', cancelToDoList);
aplly.addEventListener('click', function(){
    const ToDoLists = {
        todo: textInTextBox[0].value,
        checked: 0,
        stringOut: 0
    };
    ToDoListArr.push(ToDoLists);
    createDOM();
});
listLi.forEach((element, i)=>{
    element.addEventListener('click', (event) => {
        customSelect(element, i)
    })
})
moon.addEventListener('click', updateBackground)

console.log(ToDoListArr);

// function DropList(){
//     const mainSelect = document.querySelector(".mainSelect");
//     const sisterMainSelect = document.querySelectorAll(".sisterMainSelect");
    
// }









// var raz = document.getElementById('pet-select'),
//     t = raz.nextElementSibling,
//     i = 1;
// console.log(t)
// raz.addEventListener("click", function() {
//   t.value += 'click' + i + '\n';
//   t.scrollTop = t.scrollHeight;
//   i += 1;
//   console.log("1")
// });
// raz.addEventListener("change", function() {
//     t = raz.nextElementSibling,
//     i = 1;
// });


// document.addEventListener('DOMContentLoaded', function() {
//     const penElements = document.getElementById('penId0');
//     console.log(penElements);
//     console.log(penElements);
//     penElements.addEventListener('click', function() {
//             console.log(penElements)
//     });
// });

// document.addEventListener('DOMContentLoaded', function() {
//     let elementsWithPenClass = document.querySelectorAll('.pen');
//     console.log(elementsWithPenClass);
//     elementsWithPenClass.forEach(function(element){
//         element.addEventListener('click', function(event) {
//             console.log("211");
//         })
//     })
//     // document.addEventListener('click', function(event) {
//     //     // if(listItem.target.classList.contains(`pen`)){
//     //     //     console.log(listItem)
//     //     // }
        
//     //     if (event.target.classList.contains(`pen`)){

//     //         const pen = this.querySelector(".pen")
//     //         console.log(pen);
//     //         console.log(event.target.id.replace(/[a-z]/gi, ''))
//     //         const listItem = event.target.closest('.listString');
//     //         console.log(listItem);
//     //         const heading = listItem.querySelector(`#headingListId0`);
//     //         console.log(heading);
//     //         let name = heading.classList[1];
//     //         console.log(event.target.classList.contains('pen'));
//     //         console.log(name.replace(/[a-z]/gi, ''));
//     //     }
//     //     // if (event.target.classList.contains('pen')) {
//     //     //     let heading = "";
//     //     //     const pen = "";
//     //     //     ToDoListArr.forEach(function(item){
//     //     //         checkboxValueNum++;
//     //     //         // const listItem = event.target.closest('.listString');
//     //     //         // if(pen = document.querySelector(`.pen`) === 0){
//     //     //         //     heading = listItem.querySelector(`.headingListId${item.index}`);
//     //     //         // }
//     //     //         // heading = listItem.querySelector(`.headingListId${item.index}`)
//     //     //         // console.log(heading);
//     //     //         // console.log(item.index);
//     //     //     })
//     //     //     for(let i = 0; i <= checkboxValueNum; i++) {

//     //     //     }
//     //     //     console.log(ToDoListArr)
//     //     //     console.log(pen);
//     //     // }
//     // });
// });







