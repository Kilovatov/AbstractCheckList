(function (window) {
    

    var CheckList = function(){
    }

    var myCheckList = new CheckList();
    window.myThis = myCheckList;
    window.startToDo = function(place){            
            //Starting functions: rendering forms, tabs and initiating tasks' container
            myCheckList.renderForm(place);
            myCheckList.renderPanel(place, 'All');
            myCheckList.renderList(place, myThis.tasks.list);
            myCheckList.refresh();
        }
}(window));



    //CheckList.prototype.createTask=function(form){    
    //     var arr = [];

    //     for (var i = 0; i<form.elements.length; i++){
    //         if (form.elements[i].type=='date'){
    //             arr[i]= new Date(form.elements[i].value);
    //         }else {
    //             arr[i]= form.elements[i].value? form.elements[i].value : false; //false for done field
    //         }
    //     }    
    //     var task = new this.Task(arr);
    //     this.tasks.list.push(task);   
    //     form.reset(); 
    //     this.renderTask(task);
    // }

    // CheckList.prototype.del=function(task){
    //     this.safePush();
    //     for (var i = this.tasks.list.length - 1; i >= 0; i--) {
    //         if (task.childNodes[1].textContent == this.tasks.list[i].texts) {
    //             this.tasks.list.splice(i,1);
    //             task.remove();
    //             this.save();
    //             break;
    //         }
    //     }
    // }



    // CheckList.prototype.mv=function(task){
    //     this.safePush();
    //     var text = task.childNodes[1].textContent;
    //     task.innerHTML="";
    //     var input = document.createElement("input");
    //     var label = document.createElement("label"); 
    //     label.innerHTML="'" + text + "'" + "   till";
    //     task.appendChild(label);
    //     input.type = 'date';
    //     input.classList.add("form-control");
    //     task.appendChild(input);
    //     var saveButton = document.createElement("button");
    //     saveButton.textContent = "move deadline";
    //     saveButton.classList.add('btn-default');
    //     saveButton.classList.add('btn');
    //     saveButton.id = 'save';
    //     task.appendChild(saveButton);
    //     task.classList.add('form-inline');
    //     saveButton.onclick = function() {
    //         for (var i = 0; i < myThis.tasks.list.length; i++) {
    //             if (text == myThis.tasks.list[i].texts) {
    //                 if (input.value != "") {                    
    //                     myThis.tasks.list[i].deadline = new Date(input.value);
    //                     myThis.save();
    //                     myThis.renderList(task.parentNode.parentNode, myThis.tasks.list);
    //                     myThis.refresh();     
    //                     break;                                   
    //                 }
    //             }
    //         }
    //     }
    // }


    //     CheckList.prototype.safePush = function() {
    //     if (document.getElementById("save")) {
    //         document.getElementById("save").click();
    //     }
    // }


    // CheckList.prototype.renderForm = function(place){
    //     var form=document.createElement('form');
    //     form.name = "create";
    //     form.setAttribute('onsubmit',"myThis.createTask(this); return false;");
    //     form.classList.add('form-inline');
    //     for (var i = 0; i < this.formDefault.length; i++){
    //         var div = document.createElement('div');
    //         div.classList.add('form-group');
    //         div.innerHTML = this.templater(
    //         '<label>{{ label }}</label>'+
    //         '<input type={{ myType }} class="form-control"' +
    //         'placeholder={{myPlaceholder}} name="myName" required>')({
    //             label: this.formDefault[i].label,
    //             myType: this.formDefault[i].type,
    //             myPlaceholder: this.formDefault[i].placeholder,
    //             myName: this.formDefault[i].name
    //         });
    //         form.appendChild(div);
    //     }
    //     var button = document.createElement('button');
    //     // button.type = 'submit';
    //     button.classList.add('btn');
    //     button.classList.add('btn-default');
    //     button.innerHTML='create';
    //     form.appendChild(button);
    //     // button.addEventListener('click', function(e){
    //     //     e.preventDefault();
    //     //     createTask(this);
    //     // })
    //     place.appendChild(form);
    // }
    // // 
    // CheckList.prototype.renderPanel= function (place, activeTabName) {
        
    //     var panel = document.createElement('nav');
    //     panel.classList.add('nav');
    //     panel.classList.add('nav-tabs');
    //     for (var i = 0; i < this.tabs.list.length; i++) {
    //         var li = document.createElement('li');
    //         li.classList.add('tab__control__item'); 
    //         var op = this;   
    //         li.innerHTML=this.templater('<a href="#" onclick="myThis.activePanel(this.parentNode)">{{ title }}</a>')({
    //             title: this.tabs.list[i].name
    //         });
    //         panel.appendChild(li);
    //         if (this.tabs.list[i].name==activeTabName){
    //             li.classList.add('active');
    //         }
    //     }
    //     place.appendChild(panel);
    // }

    // CheckList.prototype.renderTask = function (task) {
    //     var template = this.templater(
    //             '<section class="task">' +
    //             '<input type="checkbox" {{checked}} onclick="myThis.check(this.parentNode)">' +
    //             '<p>{{ task }}</p>' +
    //             '<button class="btn btn-default" onclick="myThis.del(this.parentNode)">delete</button>' +
    //             '<button type="button" class="btn btn-default" onclick="myThis.mv(this.parentNode)">move to</button>'+
    //             '<button type="button" class="btn btn-default" onclick="myThis.edt(this,parentNode)">edit</button>' +
    //             '</section>');
    //     this.toDo.innerHTML += template({
    //         task: task.texts,
    //         checked: task.done? 'checked' : ''
    //     });
    // }

    // CheckList.prototype.renderList=function(place, list) {
    //     this.toDo.innerHTML = '';
    //     for (var i = 0; i < list.length; i++) {
    //         this.renderTask(list[i]);     
    //     }
    //     place.appendChild(this.toDo);
    //     this.save();
    // }


    // CheckList.prototype.save = function() {
    //     localStorage.setItem(this.keyScheme, JSON.stringify(this.tasks.scheme));
    //     localStorage.setItem(this.keyList, JSON.stringify(this.tasks.list));
    // }
    
    
    // //function for showing actual list of tasks
    // // function createList(condition){
    // //     var list1 = tasks.list.filter(function(task){
    // //         return condition(task);        
    // //     });
    // //     renderList(list1);
    // // }

  
    // CheckList.prototype.activePanel = function(panel){
    //     clearTabControls('tab__control__item');
    //     panel.classList.add('active');
    //     for (var i = 0; i < this.tabs.list.length; i++){        
    //         if (this.tabs.list[i].name == panel.textContent){
    //             this.showItems(this.toDo, this.tabs.list[i].condition);      
    //         }
    //     }
    // }


    // function clearTabControls(className) {
    //     var controls = document.querySelectorAll('.' + className);
    //     for (var i = 0; i < controls.length; i++) {
    //         controls[i].classList.remove('active');
    //     }
    // }

    // CheckList.prototype.refresh=function(){
    //     var tab=document.querySelector('.active');
    //     this.activePanel(tab);    
    // }


    // CheckList.prototype.showItems = function(container, condition){
    //     for (var i = 0; i<this.tasks.list.length; i++){
    //         if (condition(this.tasks.list[i])){
    //             container.childNodes[i].style.display = 'block';
    //         }else{
    //             container.childNodes[i].style.display = 'none';
    //         }
    //     }
    // }

    

    



    // CheckList.prototype.edt = function(text) {
    //     this.safePush();
    //     var tsk = text.parentNode;
    //     var oldValue = tsk.childNodes[1].textContent;
    //     tsk.innerHTML = "";
    //     var input = document.createElement("input");
    //     input.value = oldValue;
    //     input.setAttribute("class", "form-control change-task");
    //     tsk.appendChild(input);
    //     var saveButton = document.createElement("button");
    //     saveButton.textContent = "save";
    //     saveButton.classList.add('btn-default');
    //     saveButton.classList.add('btn');
    //     saveButton.id = 'save';
    //     tsk.appendChild(saveButton);

    //     saveButton.onclick = function() {
    //         for (var i = 0; i < myThis.tasks.list.length; i++) {
    //             if (oldValue == myThis.tasks.list[i].texts) {
    //                 if (input.value != "") {
    //                     myThis.tasks.list[i].texts = input.value;
    //                     myThis.save();
    //                     myThis.renderList(tsk.parentNode.parentNode, myThis.tasks.list);
    //                     myThis.refresh();
    //                     break;
    //                 }
    //             }
    //         }
    //     }
    // };

    // CheckList.prototype.check=function(box) {
    //     this.safePush();
    //     for (var i = this.tasks.list.length - 1; i >= 0; i--) {
    //         if (box.childNodes[1].textContent == this.tasks.list[i].texts) {
    //             this.tasks.list[i].done = !this.tasks.list[i].done;
    //             this.save();
    //             this.refresh();
    //             break;
    //         }
    //     }    
    // }

    

    // function deadlineCondition(deadline){
    //     return function(task){
    //         if (new Date(task.deadline) < deadline && new Date(task.deadline) > new Date() && !isDoneCondition()(task)){
    //             return true;
    //         }else{
    //             return false;
    //         }
    //     }
    // }

    // function expiredCondition(){
    //     return function(task){
    //         if (task.deadline < new Date()){
    //             return !isDoneCondition(task);
    //         }else{
    //             return false;
    //         }
    //     }    
    // }

    // function isDoneCondition(){
    //     return function(task){
    //         return task.done;
    //     }   
    // }


//this.toDo = document.createElement('div');
        // this.keyScheme = '_StorageScheme';
        // this.keyList = '_StorageList';
        // this.tasks = localStorage.getItem(this.keyList) ? {
        // scheme: JSON.parse(localStorage.getItem(this.keyScheme)), 
        // list: JSON.parse(localStorage.getItem(this.keyList))}: 
        //     {
        //     scheme : {
        //         texts: 'string',
        //         deadline: 'date',
        //         done: 'boolean'
        //     },
        //     list: []    
        // };
        // /*initial tabs, we may add new tab, using simple constructor
        // function Tab (name, condition){
        //     this.name = name;
        //     this.condition = condition;
        // }
        // and adding new Tab() to tabs.list
        // */
        // this.tabs = {scheme: {
        //     name: 'string',
        //     condition: 'function'
        //     },
        //     list: [{
        //         name:'Today',
        //         condition: deadlineCondition((new Date().setDate((new Date()).getDate()+1))) 
        //     },
        //     {
        //         name:'Week',
        //         condition: deadlineCondition((new Date().setDate((new Date()).getDate()+7))) 
        //     },
        //     {
        //         name: 'All',
        //         condition: function(task) {return !isDoneCondition()(task)}
        //     },
        //     {
        //         name: 'Done',
        //         condition: isDoneCondition()
        //     }
        // ]}; 

        // this.formDefault = [
        //     {
        //         label: '',
        //         type: 'text',
        //         name: 'text',
        //         placeholder: 'Task'
        //     },
        //     {
        //         label: 'till',
        //         type: 'date',
        //         name: 'till',
        //         placeholder: new Date()       
        //     }];

        // this.templater = function(html) {
        //     return function(data) {
        //         for (var x in data) {
        //             var re = "{{\\s?" + x + "\\s?}}";
        //             html = html.replace(new RegExp(re, "ig"), data[x]);
        //         }
        //         return html;
        //     };
        // };

        // this.Task = function(arr) {
        //     var keys = Object.keys(myThis.tasks.scheme);
        //     for (var i = 0; i< arr.length; i++){
        //         var key = keys[i];
        //         this[key] = arr[i];               
        //     }
        // }