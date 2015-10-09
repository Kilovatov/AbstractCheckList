/*
File with renders. We implement here rendering of tabs and tasks' container
*/

var templater = function(html) {
    return function(data) {
        for (var x in data) {
            var re = "{{\\s?" + x + "\\s?}}";
            html = html.replace(new RegExp(re, "ig"), data[x]);
        }
        return html;
    };
};



function renderForm(place){
    var form=document.createElement('form');
    form.name = "create";
    form.setAttribute('onsubmit',"createTask(this); return false;");
    form.classList.add('form-inline');
    for (var i = 0; i < formDefault.length; i++){
        var div = document.createElement('div');
        div.classList.add('form-group');
        div.innerHTML = templater(
        '<label>{{ label }}</label>'+
        '<input type={{ myType }} class="form-control"' +
        'placeholder={{myPlaceholder}} name="myName" required>')({
            label: formDefault[i].label,
            myType: formDefault[i].type,
            myPlaceholder: formDefault[i].placeholder,
            myName: formDefault[i].name
        });
        form.appendChild(div);
    }
    var button = document.createElement('button');
    button.type = 'submit';
    button.classList.add('btn');
    button.classList.add('btn-default');
    button.innerHTML='create';
    form.appendChild(button);
    place.appendChild(form);
}
// 
function renderPanel(place, activeTabName) {
    var panel = document.createElement('nav');
    panel.classList.add('nav');
    panel.classList.add('nav-tabs');
    for (var i = 0; i < tabs.list.length; i++) {
        var li = document.createElement('li');
        li.classList.add('tab__control__item');    
        li.innerHTML=templater('<a href="#" onclick="activePanel(this.parentNode)">{{ title }}</a>')({
            title: tabs.list[i].name
        });
        panel.appendChild(li);
        if (tabs.list[i].name==activeTabName){
            li.classList.add('active');
        }
    }
    place.appendChild(panel);
}

function renderTask(task) {
    var template = templater(
            '<section class="task">' +
            '<input type="checkbox" {{checked}} onclick="check(this.parentNode)">' +
            '<p>{{ task }}</p>' +
            '<button class="btn btn-default" onclick="del(this.parentNode)">delete</button>' +
            '<button type="button" class="btn btn-default" onclick="mv(this.parentNode)">move to</button>'+
            '<button type="button" class="btn btn-default" onclick="edt(this,parentNode)">edit</button>' +
            '</section>');
    toDo.innerHTML += template({
        task: task.texts,
        checked: task.done? 'checked' : ''
    });
}

function renderList(place, list) {
    toDo.innerHTML = '';
    for (var i = 0; i < list.length; i++) {
        renderTask(list[i]);     
    }
    place.appendChild(toDo);
    save();
}


