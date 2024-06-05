class Project{
    constructor(name){
        this.tasksNum = 0;
        this.name = name;
        this.tasks = [];
    }
    addToList(task){
        this.tasks.push(task);
        this.tasksNum++;
    }
    listSize(){
        return this.tasksNum;
    }
    displayTasksName(){
        this.tasks.forEach((task)=> console.log(task.name))
    }
}

class Task{
    constructor(title, description, 
        date, priority, project){
            this.title = title;
            this.description = description;
            this.date = date;
            this.priority = priority;
            this.project = project;
        }
    editTask(property, newValue){
        this[property] = newValue;
    }
    
}

const defaultList = new Project("defaultList");
const projects = [ defaultList ];

function createNewProject(name){
    const project = new Project(name);
    projects.push(project);
}

function addTaskToList(task, project){
    project.addToList(task);
    defaultList.addToList(task);
}

function createNewTask(title, description, date, priority, project){
    const task = new Task(title, description, date, priority, project);
    const list = projects.find((list)=> list.name == project);
    if(!list){
        createNewProject(project);
        addTaskToList(task, projects[projects.length - 1])
    }
    else
        addTaskToList(task, list)
}

