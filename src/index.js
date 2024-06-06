import * as dom from "./dom";
import * as logic from "./logic";
import "./style.css"

function initializeApp() {
    dom.MyProjects(logic.projects);
}

initializeApp();