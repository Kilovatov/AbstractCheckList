/*
File with renders. We implement here rendering of tabs and tasks' container
*/
var bind = [];

var templater = function(html) {
    return function(data) {
        for (var x in data) {
            var re = "{{\\s?" + x + "\\s?}}";
            html = html.replace(new RegExp(re, "ig"), data[x]);
        }
        return html;
    };
};

// 
function renderPanel(activeTabName) {
    for (var i = 0; i < tabs.list.length; i++) {
        var li = document.createElement('li');
        li.classList.add('tab__control__item');    
        li.innerHTML=templater('<a href="#">{{ title }}</a>')({
            title: tabs.list[i].name
        });
        panel.appendChild(li);
        if (tabs.list[i].name==activeTabName){
            li.classList.add('active');
        }
    }

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

function renderList(list) {
    toDo.innerHTML = '';
    for (var i = 0; i < list.length; i++) {
        renderTask(list[i]);     
    }
    container.appendChild(toDo);
    save();
}


