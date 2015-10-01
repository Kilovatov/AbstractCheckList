var newDeadline = document.getElementById('new-deadline');
var addDeadline = document.getElementById('add-deadline');

addDeadline.onclick = function(e){
	safePush();
    e.preventDefault();
    e.stopPropagation();
    if (newDeadline.value === "") {
        return;
    }
    document.getElementById('panel').innerHTML='';
    
    deadlines.unshift(newDeadline.value.split(' ').join(''));
    panelNames.unshift(newDeadline.value);
    renderRadio();
	renderPanel();
	createList(list);
	newDeadline.value ="";
}