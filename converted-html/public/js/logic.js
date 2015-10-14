var myContent = document.getElementById('content');
var myModal = new Modal({
    content: myContent,
    className: 'zoom'
});

var triggerButton = document.getElementById('trigger');
triggerButton.addEventListener('click', function() {
    myModal.open();
    var place = document.getElementsByClassName('scotch-content')[0];
    startToDo(place);
});

(function(doc,window){
   window.startToDo = function(place) {
        //Starting functions: rendering forms, tabs and initiating tasks' container
        renderForm(place);
        renderPanel(place, 'All');
        renderList(place, tasks.list);
        refresh();        
        addFunctionality();
    }
}(document, window));