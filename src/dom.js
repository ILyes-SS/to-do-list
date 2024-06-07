import * as logic from "./logic";
import trash from "./images/trash.png"

export function MyProjects(projects) {
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

    addPara.textContent = "Add task";
    addProjectBtn.textContent = "+";
    addProjectBtn.className = 'add-btn';

    addDiv.appendChild(addProjectBtn);
    addDiv.appendChild(addPara);
    addDiv.className = "add-div"

    for (let project of projects) {
        const projectsListEle = document.createElement("li");
        projectsListEle.innerHTML = project.name + `<span> ${project.listSize()} <span>`;
        projectsList.appendChild(projectsListEle);
    }

    sidebar.appendChild(addDiv);
    sidebar.appendChild(header);
    sidebar.appendChild(projectsList);

    // Ensure the event listener for the add button is set up correctly for next time
    addProjectBtn.addEventListener("click", () => {
        showAddProjectDialog();
    });

    emptyProject();
    const addTaskDiv = document.querySelector("#main > :nth-child(2)")
    const addTaskBtn = document.querySelector("#main > :nth-child(2) button")
    addTaskBtn.addEventListener("click",()=>{
        addTaskDiv.style.display = "none"
        addTaskForm()
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
    MyProjects(logic.projects);
}

function emptyProject(){
    const mainBody = document.querySelector("#main")
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

    projectHeader.textContent = "All"
    trashIcon.src = trash

    deleteProjectBtn.appendChild(trashIcon)

    divHeader.appendChild(projectHeader)
    divHeader.appendChild(deleteProjectBtn)

    mainBody.appendChild(divHeader)
    mainBody.appendChild(divAddTask)
    mainBody.appendChild(divTasks)
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


}