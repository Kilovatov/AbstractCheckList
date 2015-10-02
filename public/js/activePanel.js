/*
File for working with panels
Here we implement the activation of panels and refresh function
*/

panel.onclick = function (event){
	var target = event.target;
	activePanel(target.parentNode);
}

function activePanel(panel){
    clearTabControls('tab__control__item');
    panel.classList.add('active');
    for (var i = 0; i < tabs.list.length; i++){        
        if (tabs.list[i].name == panel.textContent){
            createList(tabs.list[i].condition);      
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
    for (var i = 0; i < tabs.list.length; i++){        
        if (tabs.list[i].name == tab.textContent){
            createList(tabs.list[i].condition);      
        }
    }
}