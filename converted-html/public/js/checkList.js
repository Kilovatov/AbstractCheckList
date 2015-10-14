var checkList = (function(my, doc) {



    var toDo = document.createElement('div');
    var keyScheme = '_StorageScheme';
    var keyList = '_StorageList';
    var tasks = localStorage.getItem(keyList) ? {
        scheme: JSON.parse(localStorage.getItem(keyScheme)),
        list: JSON.parse(localStorage.getItem(keyList))
    } : {
        scheme: {
            texts: 'string',
            deadline: 'date',
            done: 'boolean'
        },
        list: []
    };
    

    var tabs = {
        scheme: {
            name: 'string',
            condition: 'function'
        },
        list: [{
            name: 'Today',
            condition: deadlineCondition((new Date().setDate((new Date()).getDate() + 1)))
        }, {
            name: 'Week',
            condition: deadlineCondition((new Date().setDate((new Date()).getDate() + 7)))
        }, {
            name: 'All',
            condition: function(task) {
                return !isDoneCondition()(task)
            }
        }, {
            name: 'Done',
            condition: isDoneCondition()
        }]
    };

    var formDefault = [{
        label: '',
        type: 'text',
        name: 'text',
        placeholder: 'Task'
    }, {
        label: 'till',
        type: 'date',
        name: 'till',
        placeholder: new Date()
    }];

    function templater(html) {
        return function(data) {
            for (var x in data) {
                var re = "{{\\s?" + x + "\\s?}}";
                html = html.replace(new RegExp(re, "ig"), data[x]);
            }
            return html;
        };
    };

    var Task = function(arr) {
        var keys = Object.keys(tasks.scheme);
        for (var i = 0; i < arr.length; i++) {
            var key = keys[i];
            this[key] = arr[i];
        }
    }



    function safePush() {
        if (doc.getElementById("save")) {
            doc.getElementById("save").click();
        }
    }


    function renderForm(place) {
        var form = document.createElement('form');
        form.name = "create";
        // form.setAttribute('onsubmit', "createTask(this); return false;");
        form.classList.add('form-inline');
        for (var i = 0; i < formDefault.length; i++) {
            var div = document.createElement('div');
            div.classList.add('form-group');
            div.innerHTML = templater(
                '<label>{{ label }}</label>' +
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
        // button.type = 'submit';
        button.classList.add('btn');
        button.classList.add('btn-default');
        button.innerHTML = 'create';
        form.appendChild(button);
        // button.addEventListener('click', function(e){
        //     e.preventDefault();
        //     createTask(this);
        // })
        place.appendChild(form);
        renderPanel(place,'All');
    }
    // 
    function renderPanel(place, activeTabName) {

        var panel = document.createElement('nav');
        panel.classList.add('nav');
        panel.classList.add('nav-tabs');
        for (var i = 0; i < tabs.list.length; i++) {
            var li = document.createElement('li');
            li.classList.add('tab__control__item');

            li.innerHTML = templater('<a href="#">{{ title }}</a>')({
                title: tabs.list[i].name
            });
            panel.appendChild(li);
            if (tabs.list[i].name == activeTabName) {
                li.classList.add('active');
            }
        }
        place.appendChild(panel);
        renderList(place, tasks.list);
    }
    
    

    function renderTask(task) {

        var template = templater(
            '<section class="task">' +
            '<input type="checkbox" {{checked}}>' +
            '<p>{{ task }}</p>' +
            '<button class="btn btn-default" name="del">delete</button>' +
            '<button type="button" class="btn btn-default" name="move">move to</button>' +
            '<button type="button" class="btn btn-default" name="edit">edit</button>' +
            '</section>');
        toDo.innerHTML += template({
            task: task.texts,
            checked: task.done ? 'checked' : ''
        });
    }

    function renderList(place, list) {
        toDo.innerHTML = '';
        for (var i = 0; i < list.length; i++) {
            renderTask(list[i]);
        }
        place.appendChild(toDo);        
        save();        
        refresh();
    }


    function save() {
        localStorage.setItem(keyScheme, JSON.stringify(tasks.scheme));
        localStorage.setItem(keyList, JSON.stringify(tasks.list));
    }


    //function for showing actual list of tasks
    // function createList(condition){
    //     var list1 = tasks.list.filter(function(task){
    //         return condition(task);        
    //     });
    //     renderList(list1);
    // }


    function activePanel(panel) {
        clearTabControls('tab__control__item');
        panel.classList.add('active');
        for (var i = 0; i < tabs.list.length; i++) {
            if (tabs.list[i].name == panel.textContent) {
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

    function refresh() {
        var tab = document.querySelector('.active');
        activePanel(tab);

    }


    function showItems(container, condition) {
        for (var i = 0; i < tasks.list.length; i++) {
            if (condition(tasks.list[i])) {
                container.childNodes[i].style.display = 'block';
            } else {
                container.childNodes[i].style.display = 'none';
            }
        }
    }



    function createTask(form) {
        
        var arr = [];
        for (var i = 0; i < form.elements.length; i++) {
            if (form.elements[i].type == 'date') {
                arr[i] = new Date(form.elements[i].value);
            } else {
                arr[i] = form.elements[i].value ? form.elements[i].value : false; //false for done field
            }
        }
        var task = new Task(arr);
        tasks.list.push(task);
        form.reset();
        renderTask(task);
    }

    function del(task) {
        safePush();
        for (var i = tasks.list.length - 1; i >= 0; i--) {
            if (task.childNodes[1].textContent == tasks.list[i].texts) {
                tasks.list.splice(i, 1);
                task.remove();
                save();
                break;
            }
        }
    }



    function mv(task) {

        safePush();
        var text = task.childNodes[1].textContent;
        task.innerHTML = "";
        var input = document.createElement("input");
        var label = document.createElement("label");
        label.innerHTML = "'" + text + "'" + "   till";
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
            addFunctionality();
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
            addFunctionality();
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



    function deadlineCondition(deadline) {
        return function(task) {
            if (new Date(task.deadline) < deadline && new Date(task.deadline) > new Date() && !isDoneCondition()(task)) {
                return true;
            } else {
                return false;
            }
        }
    }

    function expiredCondition() {
        return function(task) {
            if (task.deadline < new Date()) {
                return !isDoneCondition(task);
            } else {
                return false;
            }
        }
    }

    function isDoneCondition() {
        return function(task) {
            return task.done;
        }
    }



    
    function addFunctionality (){
        var panels = doc.getElementsByClassName('tab__control__item');
        for(var i = 0; i< panels.length; i++){
            panels[i].addEventListener('click',function(){
                clearTabControls('tab__control__item');
                this.classList.add('active');
                for (var i = 0; i < tabs.list.length; i++) {
                    if (tabs.list[i].name == this.textContent) {
                        showItems(toDo, tabs.list[i].condition);
                    }
                }
            });
        }

        var form = doc.getElementsByName('create')[0];        
        form.onsubmit=(function(e){
            createTask(this);
            save();            
            refresh();
            addFunctionality();
            e.preventDefault();            
        });

        var checkBoxes = doc.querySelectorAll('input[type=checkbox]');
        for(var i = 0; i< checkBoxes.length; i++){
            checkBoxes[i].addEventListener('click',function(){
                check(this.parentNode);
            });
        }

        var delbuttons = doc.getElementsByName('del');
        for(var i = 0 ; i < delbuttons.length; i++){
            delbuttons[i].addEventListener('click',function(){
                del(this.parentNode);
            });
        }

        var moveButtons = doc.getElementsByName('move');
        for(var i = 0 ; i < moveButtons.length; i++){
            moveButtons[i].addEventListener('click',function(){                
                mv(this.parentNode);
                
            });
        }

        var editButtons = doc.getElementsByName('edit');
        for(var i = 0 ; i < editButtons.length; i++){
            editButtons[i].addEventListener('click',function(){
                edt(this);
                
            });
        }

    }

    doc.onkeyup = function(e) {
        if (e.keyCode === 13) {
            console.log('ENTER!');
            safePush();
        }
    };

    my.startToDo = function(place){
        renderForm(place);       
        addFunctionality();
    }


    return my;


    

}(checkList||{}, document));
