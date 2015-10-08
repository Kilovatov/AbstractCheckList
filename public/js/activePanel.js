/*
File for working with panels
Here we implement the activation of panels and refresh function
*/

function activePanel(panel){
    clearTabControls('tab__control__item');
    panel.classList.add('active');
    for (var i = 0; i < tabs.list.length; i++){        
        if (tabs.list[i].name == panel.textContent){
            showItems(toDo, tabs.list[i].condition);      
        }
    }
}


function clearTabControls(className) {
    var controls = document.querySelectorAll('.' + className);
    for (var i = 0; i < controls.length; i++) {
        controls[i].classList.remove('active');
    }
}

function refresh(){
    var tab=document.querySelector('.active');
    activePanel(tab);    
}


function showItems(container, condition){
    for (var i = 0; i<tasks.list.length; i++){
        if (condition(tasks.list[i])){
            container.childNodes[i].style.display = 'block';
        }else{
            container.childNodes[i].style.display = 'none';
        }
    }
}