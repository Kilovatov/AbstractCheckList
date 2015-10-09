/* 
File for working with task parameters
We define here task constructor
implement creation of a task, changes in a task and a possibility to delete task
function safePush() stands for saving data, 
if user forgot to push "save" or "move deadline" buttons
*/

function Task(arr) {
    var keys = Object.keys(tasks.scheme);
    for (var i = 0; i< arr.length; i++){
        var key = keys[i];
        this[key] = arr[i];               
    }
}

function createTask(form){    
    var arr = [];

    for (var i = 0; i<form.elements.length; i++){
        if (form.elements[i].type=='date'){
            arr[i]= new Date(form.elements[i].value);
        }else {
            arr[i]= form.elements[i].value? form.elements[i].value : false; //false for done field
        }
    }    
    var task = new Task(arr);
    tasks.list.push(task);   
    form.reset(); 
    renderTask(task);
}

function del(task){
    safePush();
    for (var i = tasks.list.length - 1; i >= 0; i--) {
        if (task.childNodes[1].textContent == tasks.list[i].texts) {
            tasks.list.splice(i,1);
            task.remove();
            save();
            break;
        }
    }
}



function mv(task){
    safePush();
    var text = task.childNodes[1].textContent;
    task.innerHTML="";
    var input = document.createElement("input");
    var label = document.createElement("label"); 
    label.innerHTML="'" + text + "'" + "   till";
    task.appendChild(label);
    input.type = 'date';
    input.classList.add("form-control");
    task.appendChild(input);
    var saveButton = document.createElement("button");
    saveButton.textContent = "move deadline";
    saveButton.classList.add('btn-default');
    saveButton.classList.add('btn');
    saveButton.id = 'save';
    task.appendChild(saveButton);
    task.classList.add('form-inline');
    saveButton.onclick = function() {
        for (var i = 0; i < tasks.list.length; i++) {
            if (text == tasks.list[i].texts) {
                if (input.value != "") {                    
                    tasks.list[i].deadline = new Date(input.value);
                    save();
                    renderList(task.parentNode.parentNode, tasks.list);
                    refresh();     
                    break;                                   
                }
            }
        }
    }
}



function edt(text) {
    safePush();
    var tsk = text.parentNode;
    var oldValue = tsk.childNodes[1].textContent;
    tsk.innerHTML = "";
    var input = document.createElement("input");
    input.value = oldValue;
    input.setAttribute("class", "form-control change-task");
    tsk.appendChild(input);
    var saveButton = document.createElement("button");
    saveButton.textContent = "save";
    saveButton.classList.add('btn-default');
    saveButton.classList.add('btn');
    saveButton.id = 'save';
    tsk.appendChild(saveButton);

    saveButton.onclick = function() {
        for (var i = 0; i < tasks.list.length; i++) {
            if (oldValue == tasks.list[i].texts) {
                if (input.value != "") {
                    tasks.list[i].texts = input.value;
                    save();
                    renderList(tsk.parentNode.parentNode, tasks.list);
                    refresh();
                    break;
                }
            }
        }
    }
};

function check(box) {
    safePush();
    for (var i = tasks.list.length - 1; i >= 0; i--) {
        if (box.childNodes[1].textContent == tasks.list[i].texts) {
            tasks.list[i].done = !tasks.list[i].done;
            save();
            refresh();
            break;
        }
    }    
}

function safePush() {
    if (document.getElementById("save")) {
        document.getElementById("save").click();
    }
}

document.onkeyup = function(e) {
    if (e.keyCode === 13) {
        safePush();
    }
};
