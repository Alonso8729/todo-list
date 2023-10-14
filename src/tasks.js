import dom from './dom.js'
import projects from './projects.js';

const tasks = (() => {

    class Task {
        constructor(title, description, date, priority, projectIndex, taskIndex) {
            this.title = title;
            this.description = description;
            this.date = date;
            this.priority = priority;
            this, projectIndex = projectIndex;
            this.taskIndex = taskIndex;
            this.completed = false;
        }
    }

    function addTask(title, description, date, priority, projectIndex, taskIndex) {
        const task = new Task(title, description, date, priority, projectIndex, taskIndex);
        projects.projectsList[projectIndex].tasks.push(task);
        dom.showTasks();
    }

    function deleteTask(projectIndex, taskIndex) {
        projects.projectsList[projectIndex].tasks.splice(taskIndex, 1);
        dom.showTasks('all');
    }

    function editTask(title, description, date, priority, projectIndex, taskIndex) {
        projects.projectsList[projectIndex].task[taskIndex].title = title;
        projects.projectsList[projectIndex].task[taskIndex].description = description;
        projects.projectsList[projectIndex].task[taskIndex].date = date;
        projects.projectsList[projectIndex].task[taskIndex].priority = priority;

        dom.showTasks('all');
    }

    function toggleCompletedTask(selectedLink, projectIndex, taskIndex) {
        let currentLink;

        if (projects.projectsList[projectIndex].tasks[taskIndex].completed === true) {
            projects.projectsList[projectIndex].tasks[taskIndex].completed = false
        }
        else {
            projects.projectsList[projectIndex].tasks[taskIndex].completed = true;
        }

        if (selectedLink.classList.contains('project-element')) {
            currentLink = 'project'
        }
        else
            currentLink = selectedLink.getAttribute('data-title');

        dom.getTasks(currentLink, projectIndex);
    }

    return {
        addTask, deleteTask, editTask, toggleCompletedTask
    };

})();

export default tasks;