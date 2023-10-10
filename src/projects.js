import dom from './dom';


const projects = (() => {
    let projectList = [];
    //setting default projects and tasks in case localStorage doesn't have projects
    if (localStorage.getItem('projects') === null) {
        projectList = [
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
                tasks:[{
                    title:'Cleaning my room',
                    description:'Remove any item that is not belong to the room, and use vacuum cleaner to clean up the carpet',
                    date:'2023-10-23',
                    priority:'low',
                    projects:1,
                    taskIndex:0,
                    completed:true
                }]
            }
        ]
    }
    else{
        projectList = JSON.parse(localStorage.getItem('projects'));
    }



    class Project {
        constructor(title) {
            this.title = title;
            this.tasks = [];
        }
    }

    function addProject(title) {

    }

    function deleteProject(index) {

    }


})();

export default projects;