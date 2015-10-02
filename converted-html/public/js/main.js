//our page structure
var panel = document.getElementById('panel');
var container = document.getElementById('box');
var form = document.getElementById('frm1');

//div for showing tasks
var toDo = document.createElement('div');

//local storage implimentation
var keyScheme = '_StorageScheme';
var keyList = '_StorageList';
function save() {
    localStorage.setItem(keyScheme, JSON.stringify(tasks.scheme));
    localStorage.setItem(keyList, JSON.stringify(tasks.list));
}
//main data is in tasks
var tasks = localStorage.getItem(keyList) ? {
    scheme: JSON.parse(localStorage.getItem(keyScheme)), 
    list: JSON.parse(localStorage.getItem(keyList))}: 
    {
    scheme : {
        texts: 'string',
        deadline: 'date',
        done: 'boolean'
    },
    list: []    
};
console.log(tasks);


/*initial tabs, we may add new tab, using simple constructor
function Tab (name, condition){
    this.name = name;
    this.condition = condition;
}
and adding new Tab() to tabs.list
*/
var tabs = {scheme: {
    name: 'string',
    condition: 'function'
    },
    list: [{
        name:'Today',
        condition: deadlineCondition((new Date().setDate((new Date()).getDate()+1))) 
    },
    {
        name:'Week',
        condition: deadlineCondition((new Date().setDate((new Date()).getDate()+7))) 
    },
    {
        name: 'All',
        condition: function(task) {return !isDoneCondition()(task)}
    },
    {
        name: 'Done',
        condition: isDoneCondition()
    }
]}; 

//function for showing actual list of tasks
function createList(condition){
    var list1 = tasks.list.filter(function(task){
        return condition(task);        
    });
    renderList(list1);
}

//Starting functions: rendering tabs and initiating tasks' container
renderPanel('All');
refresh();
