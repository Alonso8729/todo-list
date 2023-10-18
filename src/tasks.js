import dom from "./dom.js";
import projects from "./projects.js";

const tasks = (() => {
  class Task {
    constructor(title, description, date, priority, projectIndex, taskIndex) {
      this.title = title;
      this.description = description;
      this.date = date;
      this.priority = priority;
      this, (projectIndex = projectIndex);
      this.taskIndex = taskIndex;
      this.completed = false;
    }
  }

  function addTask(title, description, date, priority, projectIndex) {
    const task = new Task(title, description, date, priority, projectIndex);
    projects.projectsList[projectIndex].tasks.push(task);
    dom.showTasks();
  }

  function deleteTask(projectIndex, taskIndex) {
    projects.projectsList[projectIndex].tasks.splice(taskIndex, 1);
    dom.showTasks("all");
  }

  function editTask(
    title,
    description,
    date,
    priority,
    projectIndex,
    taskIndex,
    selectedLink,
  ) {
    projects.projectsList[projectIndex].tasks[taskIndex].title = title;
    projects.projectsList[projectIndex].tasks[taskIndex].description =
      description;
    projects.projectsList[projectIndex].tasks[taskIndex].date = date;
    projects.projectsList[projectIndex].tasks[taskIndex].priority = priority;

    if (selectedLink.classList.contains("menu-element"))
      dom.getTasks(projectIndex);
    else dom.getTasks("project", projectIndex);
  }

  function toggleCompletedTask(selectedLink, projectIndex, taskIndex) {
    let currentLink;

    if (
      projects.projectsList[projectIndex].tasks[taskIndex].completed === true
    ) {
      projects.projectsList[projectIndex].tasks[taskIndex].completed = false;
    } else {
      projects.projectsList[projectIndex].tasks[taskIndex].completed = true;
    }

    if (selectedLink.classList.contains("project-element")) {
      currentLink = "project";
    } else currentLink = selectedLink.getAttribute("data-title");

    dom.getTasks(currentLink, projectIndex);
  }

  return {
    addTask,
    deleteTask,
    editTask,
    toggleCompletedTask,
  };
})();

export default tasks;
