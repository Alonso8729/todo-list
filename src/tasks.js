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


})();

export default tasks;