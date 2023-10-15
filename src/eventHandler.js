import dom from './dom.js'
import projects from './projects.js';
import tasks from './tasks.js';

const eventHandler = (() => {

    function clickListener() {
        let projectIndex;
        let taskIndex;

        document.addEventListener('click', (event) => {
            const { target } = event;
            const selectedLink = document.querySelector('.selected-link')
            const modalDeleteProjectText = document.querySelector('.delete-project-content');

            //const modalTitle = document.querySelector('.modal-title');
            const linkIndex = parseInt(target.getAttribute('data-link-index'), 10);
            //Style selected link
            if (target.classList.contains('select')) {
                dom.selectLink(target, linkIndex);
                dom.changeMainTitle(target, linkIndex);
            }
            //Modal for adding project
            if (target.classList.contains('add-project-icon')) {
                dom.handleModal('show', 'Add Project', 'add');
            }
            //Modal for deleting and editing project
            else if (target.classList.contains('project-btn')) {
                projectIndex = parseInt(target.getAttribute('data-link-index'), 10);
                //EDIT PROJECT MODAL
                if (target.classList.contains('fa-pen-to-square')) {
                    dom.handleModal('show', 'Edit Project', 'edit', projectIndex);
                }
                //DELETE MODAL
                else if (target.classList.contains('fa-trash-can')) {
                    dom.handleModal('show', 'Delete Project', 'delete', projectIndex);
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

            //If cancel button or close button is clicked
            if (target.classList.contains('cancel-btn') || target.classList.contains('fa-xmark')) {
                dom.handleModal('close')
            }
            //Clicked on task element, change completed status
            if (target.classList.contains('task-element')) {
                projectIndex = parseInt(target.getAttribute('data-project-index'));
                taskIndex = parseInt(target.getAttribute('data-task-index'));
                tasks.toggleCompletedTask(selectedLink, projectIndex, taskIndex)
            }
            //Validate Form
            if (target.classList.contains('confirm-btn')) {
                //Adding 
                if (target.textContent === 'Add') {
                    projectIndex = parseInt(selectedLink.getAttribute('data-link-index'), 10);
                    dom.validateModal('add', projectIndex, '', selectedLink);
                    //dom.handleModal('close');
                }
                else if (target.textContent === 'Delete') {
                    //DELETE PROJECT
                    projectIndex = parseInt(selectedLink.getAttribute('data-link-index'), 10);
                    if (!(modalDeleteProjectText.classList.contains('hide'))) {
                        dom.validateModal('delete', projectIndex, '', selectedLink);
                        dom.showMainTitle(0);
                        dom.getTasks('all');
                    }
                }
                else if (target.textContent === 'Edit') {
                    projectIndex = parseInt(selectedLink.getAttribute('data-link-index'), 10);
                    dom.validateModal('edit', projectIndex, "", selectedLink);
                    dom.handleModal('close');
                }
            }
        })
    }
    return {
        clickListener
    }

})();

export default eventHandler;