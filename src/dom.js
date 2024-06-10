import * as logic from "./logic";
import trash from "./images/trash.png"
import pencil from "./images/crayon.png"

let founded;
let a = 1;
export function MyProjects(projects, found) {
    const sidebar = document.querySelector("#sidebar");
    sidebar.innerHTML = ''; // Clear existing content

    const mainBody = document.querySelector("#main");
    mainBody.innerHTML = ''; 

    const header = document.createElement("h3");
    header.innerHTML = "My Projects" + " "  + `<span> ${logic.projects.length}<span>`;

    const projectsList = document.createElement("ul");

    const addDiv = document.createElement("div");
    const addProjectBtn = document.createElement("button");
    const addPara = document.createElement("p");

    addPara.textContent = "Add project";
    addProjectBtn.textContent = "+";
    addProjectBtn.className = 'add-btn';

    addDiv.appendChild(addProjectBtn);
    addDiv.appendChild(addPara);
    addDiv.className = "add-div"

    for (let project of projects) {
        const projectsListEle = document.createElement("li");
        projectsListEle.innerHTML = project.name + `<span> ${project.listSize()} <span>`;
        projectsList.appendChild(projectsListEle);
//last add
       
    }

    sidebar.appendChild(addDiv);
    sidebar.appendChild(header);
    sidebar.appendChild(projectsList);

    // Ensure the event listener for the add button is set up correctly for next time
    addProjectBtn.addEventListener("click", () => {
        showAddProjectDialog();
    });
//contain the main part
   
    emptyProject(found);
    
   
    const addTaskDiv = document.querySelector("#main > :nth-child(2)")
    const addTaskBtn = document.querySelector("#main > :nth-child(2) button")
    addTaskBtn.addEventListener("click",()=>{
        addTaskDiv.style.display = "none"
        addTaskForm() // add event listener here ydir MyProject w taskFormDAta
        
    })
    const projectsListEles = document.querySelectorAll("li")
    projectsListEles.forEach((li)=>{
        li.addEventListener("click", ()=>{
            const liText = li.textContent.trim(); // Get text content and trim any extra whitespace
            const projectName = liText.split(' ')[0]; // Assuming name and list size are separated by a space
        
        const found = projects.find((element) => element.name == projectName)
        founded = found;
        if(found && found.name != "All")
            MyProjects(logic.projects, found)
        else if(found.name == "All")
            MyProjects(logic.projects, found)
    })
})

}

export function showAddProjectDialog() {
    const dialog = document.querySelector(".project");
    const submitBtn = document.querySelector("#add-project");

    dialog.showModal();

    // Move the event listener here to avoid adding multiple listeners
    submitBtn.addEventListener("click", handleProjectSubmit, { once: true });
}

function handleProjectSubmit(e) {
    e.preventDefault();
    const dialog = document.querySelector(".project");
    const nameInput = document.querySelector("#name-project");

    logic.createNewProject(nameInput.value || "Nameless");

    // Close dialog and refresh project list
    dialog.close();
    MyProjects(logic.projects, founded || logic.projects[0]);
}

function emptyProject(project){
    const mainBody = document.querySelector("#main")
    mainBody.innerHTML = ""
    const divTasks = document.createElement("div");

    const divHeader = document.createElement("div");
    const projectHeader = document.createElement("h2");
    const deleteProjectBtn = document.createElement("button");
    const trashIcon = document.createElement("img")

    const divAddTask = document.createElement("div");
    const addTaskBtn = document.createElement("button");
    const addTaskPara = document.createElement("p");

    addTaskBtn.textContent = "+"
    addTaskPara.textContent = "Add Task"

    divAddTask.appendChild(addTaskBtn)
    divAddTask.appendChild(addTaskPara)

    projectHeader.textContent = project.name;
    trashIcon.src = trash

    deleteProjectBtn.appendChild(trashIcon)

    divHeader.appendChild(projectHeader)
    divHeader.appendChild(deleteProjectBtn)

    mainBody.appendChild(divHeader)
    mainBody.appendChild(divAddTask)
    mainBody.appendChild(divTasks)

    deleteProject(project);
    displayTasks(project)
}   

function addTaskForm(){
    const divTasks = document.querySelector("#main > :last-child")
    const addForm = document.createElement("form")

    const legendRadio = document.createElement("legend")
    legendRadio.textContent = "Priority(increasing):"

    const para1 = document.createElement("p")
    const para2 = document.createElement("p")
    const para3 = document.createElement("p")
    const para4 = document.createElement("p")
    const para5 = document.createElement("p")
    const para6 = document.createElement("p")

    //para1
    const titleInput = document.createElement("input")

    titleInput.setAttribute("id",`title`)
    titleInput.setAttribute("type",`text`)
    titleInput.setAttribute("placeholder",`Task name`)

    para1.appendChild(titleInput)
     //para2
     const descInput = document.createElement("input")

     descInput.setAttribute("id",`description`)
     descInput.setAttribute("type",`text`)
     descInput.setAttribute("placeholder",`description`)
 
     para2.appendChild(descInput)
    //para2
    const calInput = document.createElement("input")

    calInput.setAttribute("id",`date`)
    calInput.setAttribute("type",`date`)
    calInput.setAttribute("placeholder",`date`)

    para3.appendChild(calInput)


    para4.appendChild(legendRadio);
    for(let i= 0; i < 4; i++){
        const RadiosDiv = document.createElement("div")
        const inputRadio = document.createElement("input")
        const label = document.createElement("label")

        inputRadio.setAttribute("id",`radio${i}`)
        inputRadio.setAttribute("type",`radio`)
        inputRadio.setAttribute("name",`priority`)
        inputRadio.setAttribute("value",`p${i}`)
        label.setAttribute("for",`radio${i}`)
        label.textContent = `p${i}`
        RadiosDiv.appendChild(label)
        RadiosDiv.appendChild(inputRadio)

        para4.appendChild(RadiosDiv)
    }
    const datalist = document.createElement("datalist");
        const input = document.createElement("input")
        const label = document.createElement("label")

        label.textContent = "Project:"
        input.setAttribute("id",`projectName`)
        input.setAttribute("placeHolder",`All`)
        label.setAttribute("for",`projectName`)
        input.setAttribute("list",`projectsList`)
        datalist.setAttribute("id","projectsList")
        
    for(let i = 0; i < logic.projects.length ; i++){
        const options = document.createElement("option")
         options.textContent = logic.projects[i].name

        datalist.appendChild(options)

         }
         para5.appendChild(label)
         para5.appendChild(input)
         para5.appendChild(datalist)

         const cancelBtn = document.createElement("button")
         const confirmBtn = document.createElement("button")

         cancelBtn.textContent = "Cancel"
         cancelBtn.className = "Cancel"
         confirmBtn.textContent = "Add task"

         cancelBtn.formNoValidate = true
         confirmBtn.setAttribute("type","submit")

         para6.appendChild(cancelBtn)
         para6.appendChild(confirmBtn)

     addForm.appendChild(para1);
     addForm.appendChild(para2);
     addForm.appendChild(para3);
     addForm.appendChild(para4);
     addForm.appendChild(para5);
     addForm.appendChild(para6);

     divTasks.appendChild(addForm)
     document.querySelector(".Cancel").addEventListener("click",(e)=>{
        e.preventDefault()
        document.querySelector("#main form").style.display = "none"
        MyProjects(logic.projects, founded || logic.projects[0]);

     })

     const submitTaskBtn = document.querySelector("p [type = 'submit']")
        submitTaskBtn.addEventListener("click",(e)=>{
            e.preventDefault();
           // if(a == 1)
                taskFormData();
           // else
           //     toEditData();
            MyProjects(logic.projects, founded || logic.projects[0]);
            
        })

}
function taskFormData(){
   
    let radioValue;
    const radioInputs = document.querySelectorAll("[type = 'radio']")

    for(let radio of radioInputs){
        if(radio.checked){
            radioValue = radio.value || "p0";
        }
    }

    const titleInput = document.querySelector("#title")
    const descInput = document.querySelector("#description")
    const dateInput = document.querySelector("#date")
    const listInput = document.querySelector("#projectName")

    logic.createNewTask(titleInput.value, descInput.value, dateInput.value, radioValue, listInput.value || "All")
}
/*function toEditData(task){
   
    
    const radioInputs = document.querySelectorAll("[type = 'radio']")
    if(radio.value == task.priority)
    
    for(let radio of radioInputs){
        if(radio.value == task.priority){
            radio.checked = true;
        }
    }
    const titleInput = document.querySelector("#title")
    const descInput = document.querySelector("#description")
    const dateInput = document.querySelector("#date")
    const listInput = document.querySelector("#projectName")

    titleInput.value= task.title
    descInput.value = task.description
    dateInput.value = task.date
    listInput.value = task.project
}
*/
function editTaskForm(task){
    const divTasks = document.querySelector("#main > :last-child")
    const addForm = document.createElement("form")

    const legendRadio = document.createElement("legend")
    legendRadio.textContent = "Priority(increasing):"

    const para1 = document.createElement("p")
    const para2 = document.createElement("p")
    const para3 = document.createElement("p")
    const para4 = document.createElement("p")
    const para5 = document.createElement("p")
    const para6 = document.createElement("p")

    //para1
    const titleInput = document.createElement("input")

    titleInput.setAttribute("id",`title`)
    titleInput.setAttribute("type",`text`)
    titleInput.setAttribute("placeholder",`Task name`)

    para1.appendChild(titleInput)
     //para2
     const descInput = document.createElement("input")

     descInput.setAttribute("id",`description`)
     descInput.setAttribute("type",`text`)
     descInput.setAttribute("placeholder",`description`)
 
     para2.appendChild(descInput)
    //para2
    const calInput = document.createElement("input")

    calInput.setAttribute("id",`date`)
    calInput.setAttribute("type",`date`)
    calInput.setAttribute("placeholder",`date`)

    para3.appendChild(calInput)


    para4.appendChild(legendRadio);
    for(let i= 0; i < 4; i++){
        const RadiosDiv = document.createElement("div")
        const inputRadio = document.createElement("input")
        const label = document.createElement("label")

        inputRadio.setAttribute("id",`radio${i}`)
        inputRadio.setAttribute("type",`radio`)
        inputRadio.setAttribute("name",`priority`)
        inputRadio.setAttribute("value",`p${i}`)
        label.setAttribute("for",`radio${i}`)
        label.textContent = `p${i}`
        RadiosDiv.appendChild(label)
        RadiosDiv.appendChild(inputRadio)

        para4.appendChild(RadiosDiv)
    }
    const datalist = document.createElement("datalist");
        const input = document.createElement("input")
        const label = document.createElement("label")

        label.textContent = "Project:"
        input.setAttribute("id",`projectName`)
        input.setAttribute("placeHolder",`All`)
        label.setAttribute("for",`projectName`)
        input.setAttribute("list",`projectsList`)
        datalist.setAttribute("id","projectsList")
        
    for(let i = 0; i < logic.projects.length ; i++){
        const options = document.createElement("option")
         options.textContent = logic.projects[i].name

        datalist.appendChild(options)

         }
         para5.appendChild(label)
         para5.appendChild(input)
         para5.appendChild(datalist)

         const cancelBtn = document.createElement("button")
         const confirmBtn = document.createElement("button")

         cancelBtn.textContent = "Delete"
         cancelBtn.className = "Cancel"
         confirmBtn.textContent = "Save"

         cancelBtn.formNoValidate = true
         confirmBtn.setAttribute("type","submit")

         para6.appendChild(cancelBtn)
         para6.appendChild(confirmBtn)

     addForm.appendChild(para1);
     addForm.appendChild(para2);
     addForm.appendChild(para3);
     addForm.appendChild(para4);
     addForm.appendChild(para5);
     addForm.appendChild(para6);

     divTasks.appendChild(addForm)

     const radioInputs = document.querySelectorAll("[type = 'radio']")
    
    
    for(let radio of radioInputs){
        if(radio.value == task.priority){
            radio.checked = true;
        }
    }
    const headerInput = document.querySelector("#title")
    const descriptionInput = document.querySelector("#description")
    const dateInput = document.querySelector("#date")
    const listInput = document.querySelector("#projectName")

    headerInput.value= task.title
    descriptionInput.value = task.description
    dateInput.value = task.date
    listInput.value = task.project
     document.querySelector(".Cancel").addEventListener("click",(e)=>{
        e.preventDefault()
        document.querySelector("#main form").style.display = "none"
        MyProjects(logic.projects, founded || logic.projects[0]);

     })
     const submitTaskBtn = document.querySelector("p [type = 'submit']")
        submitTaskBtn.addEventListener("click",(e)=>{
            e.preventDefault();
           // if(a == 1)
                taskFormData();
           // else
           //     toEditData();
            MyProjects(logic.projects, founded || logic.projects[0]);
            
        })

}

function displayTasks(projectName){
    const tasksDiv = document.querySelector("#main > :last-child")
    
       for(let j= 0; j < projectName.tasks.length; j++){
        let task = projectName.tasks[j];
        const checkbox = document.createElement("input");
        const h5 = document.createElement("h5");
        const description = document.createElement("p");
        const date = document.createElement("p");
        const priority = document.createElement("p");
        const project = document.createElement("p");
        const div = document.createElement("div");
        div.setAttribute("class",`Task`)

        const div1 = document.createElement("div");
        const div2 = document.createElement("div");
        const div3 = document.createElement("div");
        const deleteBtn = document.createElement("button");
        const editBtn = document.createElement("button");
        const deleteImg = document.createElement("img");
        const editImg = document.createElement("img");

        deleteImg.src = trash
        editImg.src = pencil
        deleteBtn.setAttribute("class","delete-task")
        deleteBtn.setAttribute("data",`${j}`)

        editBtn.setAttribute("class","edit-task")
        editBtn.setAttribute("data",`${j}`)

        deleteBtn.appendChild(deleteImg)
        editBtn.appendChild(editImg)


        h5.textContent = task.title;
        description.textContent = task.description;
        date.textContent = task.date;
        priority.textContent = task.priority
        project.textContent = "# " + task.project;
        checkbox.setAttribute("type","checkbox")
        checkbox.setAttribute("class",task.priority)
        checkbox.setAttribute("data",j)

        div1.appendChild(checkbox)
        div1.appendChild(project)

        div2.appendChild(h5)
        div2.appendChild(description)
        div2.appendChild(date)

        div3.appendChild(deleteBtn)
        div3.appendChild(editBtn)

        div.appendChild(div1)
        div.appendChild(div2)
        div.appendChild(div3)
     
  tasksDiv.appendChild(div)   
    }
    const deleteBtns = document.querySelectorAll(".delete-task")
    deleteBtns.forEach((btn)=>{
        btn.addEventListener("click",()=>{
            deleteTask(projectName.tasks[btn.getAttribute("data")]);
            
        })
    })
    const editBtns = document.querySelectorAll(".edit-task")
    editBtns.forEach((btn)=>{
        btn.addEventListener("click",(e)=>{
            const taskElement = e.target.closest('.Task');
            taskElement.style.display = 'none';
            editTask(projectName.tasks[btn.getAttribute("data")])
            
            
        })
    })
    const checkInput = document.querySelectorAll("[type = 'checkbox']")
    checkInput.forEach((input)=>{
        input.addEventListener("click",(e)=>{
            const taskElement = e.target.closest('.Task');
            if(input.checked){
                taskElement.style.color = 'gray';
                projectName.tasks[input.getAttribute("data")].completeTask()
              
            }
            else{
               
                taskElement.style.color = 'black';
            }
           
            
        })
    })
}
function deleteProject(project){
    const deleteBtn = document.querySelector("h2 + button")
    deleteBtn.addEventListener("click",()=>{
        logic.deleteProject(project.name)
        MyProjects(logic.projects, logic.projects[0])
        founded = undefined
    })
}
function deleteTask(task){
    
        logic.deleteTaskFromLists(task)
        MyProjects(logic.projects, founded || logic.projects[0])
  
}
function editTask(task){
   deleteTask(task)
//  const taskDiv = document.querySelectorAll(`#main > :last-child > div`)
 // taskDiv.style.display="none"

   editTaskForm(task);
   
}
