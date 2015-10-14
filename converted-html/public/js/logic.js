var myContent = document.getElementById('content');
var myModal = new Modal({
    content: myContent,
    className: 'zoom'
});

myModal.open();
var place = document.getElementsByClassName('scotch-content')[0];
checkList.startToDo(place);

var checkList = (function(my, doc) {
    my.startToDo = function(place){
        renderForm(place);       
        addFunctionality();
    }
    return my;

}(checkList||{}, document));
