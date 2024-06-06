import * as logic from "./logic";

export function MyProjects(projects) {
    const sidebar = document.querySelector("#sidebar");
    sidebar.innerHTML = ''; // Clear existing content

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

