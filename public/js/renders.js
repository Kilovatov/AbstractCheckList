var templater = function(html) {
    return function(data) {
        for (var x in data) {
            var re = "{{\\s?" + x + "\\s?}}";
            html = html.replace(new RegExp(re, "ig"), data[x]);
        }
        return html;
    };
};

function renderRadio() {    
    radioDiv.innerHTML='';
    for (var i = 0; i < deadlines.length; i++) {
        var label = document.createElement('label');
        label.classList.add('radio-inline');
        label.innerHTML = templater('<input type="radio" name="deadline" value={{ myValue }}> {{ time }}')({
            myValue: deadlines[i],
            time: panelNames[i]
        });
        radioDiv.appendChild(label);
    }
}

function renderPanel() {
    for (var i = 0; i < panelNames.length; i++) {
        var li = document.createElement('li');
        li.classList.add('tab__control__item');
        li.name=deadlines[i];        
        li.innerHTML=templater('<a href="#">{{ time }}</a>')({
            time: panelNames[i]
        });
        panel.appendChild(li);
    }

}

function renderList(list) {
    checkForExpiredTasks();
    
    toDo.innerHTML = '';
    for (var i = 0; i < list.length; i++) {
        var template = templater(
            '<section class="task">' +
            ' <input type="checkbox" onclick="check(this)">' +
            '<p>{{ task }}</p>' +
            '<button class="btn btn-default" onclick="del(this)">delete</button>' +
            '<button type="button" class="btn btn-default" onclick="edt(this)">edit</button>' +
            '</section>');
        toDo.innerHTML += template({
            task: list[i].texts
        });

        //implimentation for done task
        if (list[i].done) {
            toDo.lastChild.childNodes[2].setAttribute('class', 'done');
            toDo.lastChild.childNodes[1].setAttribute('checked', 'true');
            toDo.lastChild.childNodes[4].remove();
        }
        if (list[i].expired) {
            toDo.lastChild.childNodes[2].setAttribute('class', 'expired');
        }
    }
    container.appendChild(toDo);
    save();
}