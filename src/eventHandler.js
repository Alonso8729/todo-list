import dom from './dom.js'

const eventHandler = (() => {

    function clickListener() {
        let projectIndex;
        let taskIndex;

        document.addEventListener(click, (event) => {
            const { target } = event;
            const selectedLink = document.querySelector('.selected-link')
            const modalTitle = document.querySelector('.modal-title');
            const linkIndex = parseInt(target.getAttribute('data-link-index'), 10);

            //Modal for adding project
            if (target.classList.contains('add-project-icon')) {
                dom.handleModal('show', 'Add Project', 'add');
            }
            //Modal for deleting and editing project
            else if (target.classList.contains('project-btn')) {
                projectIndex = parseInt(target.getAttribute('data-project-index'), 10);
                //EDIT MODAL
                if (target.classList.contains('fa-pen-to-square')) {
                    dom.handleModal('show', 'Edit Task', 'edit', projectIndex);
                }
                //DELETE MODAL
                else if (target.classList.contains('fa-trash-can')) {
                    dom.handleModal('show', 'Delete Task', 'delete', projectIndex);
                }
            }
            //ADDING TASK MODAL
            if (target.classList.contains('add-task-icon')) {
                projectIndex = parseInt(target.getAttribute('data-project-index'), 10);
                taskIndex = parseInt(target.getAttribute('data-task-index'), 10);
                dom.handleModal('show', 'Add Task', 'add', projectIndex, taskIndex);
            }
            //Modal for delete, edit, info task
            if (target.classList.contains('task-icon')) {
                projectIndex = parseInt(target.getAttribute('data-project-index'), 10);
                taskIndex = parseInt(target.getAttribute('data-task-index'), 10);
                //EDIT MODAL
                if (target.classList.contains('fa-pen-to-square')) {
                    dom.handleModal('show', 'Edit Task', 'edit', projectIndex, taskIndex);
                }
                else if (target.classList.contains('fa-trash-can')) {
                    dom.handleModal('show', 'Delete Task', 'delete', projectIndex, taskIndex);

                }
                else if (target.classList.contains('fa-circle-info')) {
                    dom.handleModal('show', 'Task Info', 'info', projectIndex, taskIndex);
                }


        }

        })
}

}) ();

export default eventHandler;