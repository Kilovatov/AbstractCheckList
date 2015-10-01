panel.onclick = function (event){
	var target = event.target;
	activePanel(target.parentNode);
}

function activePanel(panel){
    clearTabControls('tab__control__item');
    panel.classList.add('active');
    deadln = panel.name;
    var radios = document.getElementsByName('deadline');
    for (var i = 0; i<radios.length; i++){    	
        if (panel.name==radios[i].value){        	
            radios[i].checked=true; 
        }
    }
    createList(deadln);
}


function clearTabControls(className) {
    var controls = document.querySelectorAll('.' + className);
    for (var i = 0; i < controls.length; i++) {
        controls[i].classList.remove('active');
    }
}