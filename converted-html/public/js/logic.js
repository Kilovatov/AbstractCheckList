var myContent = document.getElementById('content');
var myModal = new Modal({
    content: myContent,
    className: 'zoom'
});

var triggerButton = document.getElementById('trigger');
triggerButton.addEventListener('click', function() {
    myModal.open();
    var place = document.getElementsByClassName('scotch-content')[0];
    checkList(place);    
});

var checkList = (function(doc){
    var startToDo = function(place) {
        //Starting functions: rendering forms, tabs and initiating tasks' container
        renderForm(place);       
        addFunctionality();
    }
    return startToDo;  

}(document));