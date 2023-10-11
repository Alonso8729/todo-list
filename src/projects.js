import dom from './dom';

const projects = (() => {
    let projectsList = [];
    //setting default projects and tasks in case localStorage doesn't have projects
    if (localStorage.getItem('projects') === null) {
        projectsList = [
            {
                title: 'Coding',
                tasks: [{
                    title: 'Finish tic-tac-toe project',
                    description: 'finish main container positioning and push all commits',
                    date: '2023-08-08',
                    priority: 'high',
                    projectIndex: 0,
                    taskIndex: 0,
                    completed: false
                }]
            },
            {
                title: 'Cleaning',
                tasks: [{
                    title: 'Cleaning my room',
                    description: 'Remove any item that is not belong to the room, and use vacuum cleaner to clean up the carpet',
                    date: '2023-10-23',
                    priority: 'low',
                    projects: 1,
                    taskIndex: 0,
                    completed: true
                }]
            }
        ]
    }
    else {
        projectsList = JSON.parse(localStorage.getItem('projects'));
    }



    class Project {
        constructor(title) {
            this.title = title;
            this.tasks = [];
        }
    }

    function addProject(title) {
        const project = new Project(title);
        projectsList.push(project);
        dom.showProjects();
    }

    function deleteProject(index) {
        projectsList.splice(index, 1);

        dom.showProjects();
    }


    return {
        projectsList, addProject, deleteProject
    }

})();

export default projects;