import { differenceInDays, subDays, compareAsc, isToday } from "date-fns";



export class Project{
    constructor(name){
        this.tasksNum = 0;
        this.name = name;
        this.tasks = [];
    }
    addToList(task){
        
        if(this.tasks.some(element => 
        JSON.stringify(element) == JSON.stringify(task)))
            return;
        this.tasks.push(task);
        this.tasksNum++;
    }
    listSize(){
        return this.tasksNum;
    }
    displayTasksTitle(){
        this.tasks.forEach((task)=> console.log(task.title))
    }

    deleteTask(task){
        let index = this.tasks.findIndex(element => 
            JSON.stringify(element) == JSON.stringify(task))
         if(index != -1){
            this.tasks.splice(index, 1);
            this.tasksNum--;
         }   
    }
}

export class Task{
    constructor(title, description, 
        date, priority, project){
            this.title = title;
            this.description = description;
            this.date = date;
            this.priority = priority;
            this.project = project;
            this.complete = false;
        }
    editTask(property, newValue){
        if(property != "complete") 
            this[property] = newValue;
    }
    completeTask(){
        this.complete = true;
    }
    returnDate(){
      let dates = this.date.split("-");

      return new Date(dates[0], dates[1] - 1, dates[2] )
    }
}

export const defaultList = new Project("All");
export const today = new Project("Today");
export const thisWeek = new Project("thisWeek");

export const projects = [ defaultList, today, thisWeek ];

export function createNewProject(name){
    const project = new Project(name);
    projects.push(project);
}

export function addTaskToList(task, project){
    project.addToList(task);
    defaultList.addToList(task);
    if (isToday(task.returnDate())) { 
        today.addToList(task); 
    }
    if (differenceInDays(task.returnDate(), new Date()) <= 7
    && differenceInDays(task.returnDate(), new Date()) >= 0) { 
        thisWeek.addToList(task); 
    }
    
}

export function createNewTask(title, description, date, priority, project){
    const task = new Task(title, description, date, priority, project);
    const list = projects.find((list)=> list.name == project);
    if(!list){
        createNewProject(project);
        addTaskToList(task, projects[projects.length - 1])
    }
    else{
        addTaskToList(task, list)
    }
    return task;
}

export function deleteTaskFromLists(task){
    const list = projects.find((list)=> list.name == task.project);
    if(list && list.name != defaultList.name){
    list.deleteTask(task);
    defaultList.deleteTask(task);
    }
    else if(list)
    defaultList.deleteTask(task);
    if (isToday(task.returnDate())) { 
        today.deleteTask(task); 
    }
    if (differenceInDays(task.returnDate(), new Date()) <= 7
    && differenceInDays(task.returnDate(), new Date()) >= 0) { 
        thisWeek.deleteTask(task); 
    }
}
export function deleteProject(name){
    let foundIndex = projects.findIndex((element)=> element.name == name);
    projects.splice(foundIndex, 1);
    
    for(let i =0; i < defaultList.tasks.length; i++){
        let task = defaultList.tasks[i];
        if(task.project == name){
            defaultList.tasks.splice(i, 1);
            defaultList.tasksNum--;
            i--;
            if (isToday(task.returnDate())) { 
                today.deleteTask(task); 
            }
            if (differenceInDays(task.returnDate(), new Date()) <= 7
            && differenceInDays(task.returnDate(), new Date()) >= 0) { 
                thisWeek.deleteTask(task); 
            }
        }
       
        
    }
}
