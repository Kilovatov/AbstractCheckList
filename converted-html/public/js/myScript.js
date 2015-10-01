var panel = document.getElementById('panel');
var container = document.getElementById('box');
var radioDiv = document.getElementById('radio-div');
var form = document.querySelector('form');

var toDo = document.createElement('div');




var key = '_Storage';
var list = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];

var deadlines = ['today', 'week', 'oneDay'];
var panelNames = ['Today','This week','One day','All']; //or =deadlines; panelNames.push('All');

function createList(deadline) {
    for (var i = 0; i < deadlines.length; i++) {
        if (deadlines[i] == deadline) {
            var list1 = list.filter(function(task) {
                return task.deadline == deadline;
            });
            renderList(list1);
            return;
        }
    }
    renderList(list);
}

function save() { //impimentation of local storage for our task list
    localStorage.setItem(key, JSON.stringify(list));
}


renderRadio();
renderPanel();
createList(list);
