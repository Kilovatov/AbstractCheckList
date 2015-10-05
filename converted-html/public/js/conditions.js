/*
File for different conditions which are using to show actual tasks
*/

function deadlineCondition(deadline){
    return function(task){
        if (new Date(task.deadline) < deadline && new Date(task.deadline) > new Date() && !isDoneCondition()(task)){
            return true;
        }else{
            return false;
        }
    }
}

function expiredCondition(){
    return function(task){
        if (task.deadline < new Date()){
            return !isDoneCondition(task);
        }else{
            return false;
        }
    }    
}

function isDoneCondition(){
    return function(task){
        return task.done;
    }   
}
