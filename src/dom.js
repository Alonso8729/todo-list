
import { format, parseISO, differenceInDays } from 'date-fns';
import projects from './projects.js';


const dom = (() => {
    //variable declaration and assignment
    const mainTitleText = document.querySelector('.main-title-text');
    const mainTitleIcon = document.querySelector('.main-title-icon');
    const addTaskBtn = document.getElementById('add-task');
    const taskCounter = document.getElementById('tasks-counter');
    const tasksList = document.querySelector('.tasks-list');
    const modal = document.querySelector('.modal');
    const modalTitle = document.querySelector('.modal-title');
    const modalTitleError = document.querySelector('.empty-input-error');

    function showProjects() {
        const projectCounter = document.getElementById('projects-counter');
        //show projects count
        projectCounter.textContent = projects.projectsList.length;

        // SAVE PROJECTS TO LOCAL STORAGE
        localStorage.setItem('projects', JSON.stringify(projects.projectsList));

        for (let i = 0; i < projects.projectsList.length; i++) {
            const projectsList = document.querySelector('.projects-list');
            const projectLink = document.createElement('div');
            const projectTitle = document.createElement('p');
            const projectIconsDiv = document.createElement('div');
            const leftProjectDiv = document.createElement('div');
            const projectIcon = document.createElement('i');
            const editIcon = document.createElement('i');
            const trashIcon = document.createElement('i');

            projectLink.classList.add('link', 'project-link', 'flex', 'pointer', 'project-element', 'select');
            projectLink.setAttribute('href', '#');
            projectLink.setAttribute('data-link-index', i);
            projectsList.appendChild(projectLink);

            //Assign and append project icon to leftProjectLink
            projectIcon.classList.add('fa-solid', 'fa-list', 'project-element', 'select', 'icon-link');
            projectIcon.setAttribute('data-link-index', i);
            leftProjectDiv.appendChild(projectIcon);
            leftProjectDiv.setAttribute('data-link-index', i);

            //Assign project title and append to leftProjectLink
            projectTitle.classList.add('project-link-title', 'project-element', 'select');
            projectTitle.setAttribute('data-link-index', i);
            projectTitle.textContent = projects.projectsList[i].title;
            leftProjectDiv.appendChild(projectTitle)

            leftProjectDiv.classList.add('left-project-div', 'project-element', 'select');
            projectLink.appendChild(leftProjectDiv);

            //Add class and attribute and append projectIconsDiv
            projectIconsDiv.classList.add('project-link-icons', 'flex', 'project-element', 'select');
            projectIconsDiv.setAttribute('data-link-index', i);
            projectLink.appendChild(projectIconsDiv);

            //Add icons to icons div
            editIcon.classList.add('fa-regular', 'fa-pen-to-square', 'project-element', 'project-btn', 'select', 'icon-link');
            editIcon.setAttribute('data-link-index', i);
            projectIconsDiv.appendChild(editIcon);
            trashIcon.classList.add('fa-regular', 'fa-trash-can', 'project-element', 'project-btn', 'select', 'icon-link');
            trashIcon.setAttribute('data-link-index', i);
            projectIconsDiv.appendChild(trashIcon);
        }
    }

    function showMainTitle(index) {
        const allMenuIcons = document.querySelectorAll('.icon-link');
        const selectedIcon = allMenuIcons[index].getAttribute('data-icon');
        const allMenuTitles = document.querySelectorAll('.link-text');
        const selectedTitle = allMenuTitles[index].textContent;

        mainTitleText.textContent = selectedTitle;
        //Split the selectedIcon into individual class names
        const iconClasses = selectedIcon.split(' ');

        iconClasses.forEach((className) => {
            if (className.length > 0)
                mainTitleIcon.classList.add(className);
        })
        // Add class to mainTitleIcon
        mainTitleIcon.classList.add('main-title-icon')

        document.title = `Todo List - ${mainTitleText.textContent}`;
    }

    function changeMainTitle(target, index) {
        mainTitleIcon.className = "";
        //Clicked on project link
        if (target.classList.contains('project-element')) {
            mainTitleIcon.classList.add('fa-solid', 'fa-list', 'main-title-icon');
            mainTitleText.textContent = projects.projectsList[index].title;
            document.title = `Todo List - ${mainTitleText.textContent}`;
        }
        //Clicked on menu Link
        else if (target.classList.contains('menu-element')) {
            showMainTitle(index);
        }
    }

    function showTasks(menuCategory, projectIndexStart, projectIndexEnd) {
        const todayDate = format(new Date(), 'yyyy-MM-dd');
        let taskNumber = 0;
        taskCounter.textContent = 0;
        tasksList.textContent = "";
        for (let i = projectIndexStart; i < projectIndexEnd; i++) {
            for (let j = 0; j < projects.projectsList[i].tasks.length; j++) {
                const taskDiv = document.createElement('div');
                const taskLeftDiv = document.createElement('div');
                const taskRightDiv = document.createElement('div');
                const circleIcon = document.createElement('i');
                const taskTitle = document.createElement('p');
                const dueDate = document.createElement('p');
                const editIcon = document.createElement('i');
                const trashIcon = document.createElement('i');
                const infoIcon = document.createElement('i');


                //Clicked on 'important' - Filter unimportant tasks
                if (menuCategory === 'important' && projects.projectsList[i].tasks[j].priority !== 'high') {
                    continue;
                }
                //Clicked on 'today' - Filter tasks not from today   
                else if (menuCategory === 'today' && projects.projectsList[i].tasks[j].date !== todayDate) {
                    continue;
                }
                //Clicked on 'completed' - Filter tasks which us incomplete
                else if (menuCategory === 'completed' && projects.projectsList[i].tasks[j].completed === false) {
                    continue;
                }
                //Clicked on 'week' - Filter tasks which doesn't take place at the following week
                else if (menuCategory === 'week') {
                    const taskDate = parseISO(projects.projectsList[i].tasks[j].date);
                    const dateOfToday = parseISO(todayDate);

                    if (!(differenceInDays(taskDate, dateOfToday) <= 7 && differenceInDays(taskDate, dateOfToday) >= 0)) {
                        continue;
                    }
                }
                taskNumber++;
                taskCounter.textContent = taskNumber;

                //Add classes and icons to task list 
                taskDiv.classList.add('task-div', 'flex', 'pointer', 'task-element');
                taskLeftDiv.classList.add('task-left-side', 'flex', 'task-element');
                taskTitle.classList.add('task-title', 'task-element');
                if (projects.projectsList[i].tasks[j].completed !== true) {
                    circleIcon.classList.add('fa-regular', 'fa-circle', 'task-element');
                }
                else {
                    circleIcon.classList.add('fa-regular', 'fa-circle-check', 'task-element');
                    taskTitle.classList.add('completed');
                }
                taskRightDiv.classList.add('task-right-side', 'flex');
                dueDate.classList.add('task-due-date');
                editIcon.classList.add('fa-regular', 'fa-pen-to-square', 'task-icon');
                trashIcon.classList.add('fa-regular', 'fa-trash-can', 'task-icon');
                infoIcon.classList.add('fa-solid', 'fa-circle-info', 'task-icon');

                //Add circle color class based on priority
                if (projects.projectsList[i].tasks[j].priority === 'high') {
                    circleIcon.classList.add('high-priority')
                }
                else if (projects.projectsList[i].tasks[j].priority === 'medium') {
                    circleIcon.classList.add('medium-priority');
                }
                else if (projects.projectsList[i].tasks[j].priority === 'low') {
                    circleIcon.classList.add('low-priority');
                }

                //Add text
                taskTitle.textContent = projects.projectsList[i].tasks[j].title;

                if (projects.projectsList[i].tasks[j].date !== undefined) {
                    dueDate.textContent = projects.projectsList[i].tasks[j].date;
                }
                else
                    dueDate.textContent = '';

                //Add attributes
                taskDiv.setAttribute('data-project-index', i);
                taskDiv.setAttribute('data-task-index', j);
                taskTitle.setAttribute('data-project-index', i);
                taskTitle.setAttribute('data-task-index', j);
                editIcon.setAttribute('data-project-index', i);
                editIcon.setAttribute('data-task-index', j);
                trashIcon.setAttribute('data-project-index', i);
                trashIcon.setAttribute('data-task-index', j);
                infoIcon.setAttribute('data-project-index', i);
                infoIcon.setAttribute('data-task-index', j);

                //Append elements
                taskLeftDiv.appendChild(circleIcon);
                taskLeftDiv.appendChild(taskTitle);
                taskRightDiv.appendChild(dueDate);
                taskRightDiv.appendChild(editIcon);
                taskRightDiv.appendChild(trashIcon);
                taskRightDiv.appendChild(infoIcon);

                taskDiv.appendChild(taskLeftDiv);
                taskDiv.appendChild(taskRightDiv);
                tasksList.appendChild(taskDiv);

                //TASK COMPLETION
                if (projects.projectsList[i].tasks[j].completed === false) {
                    taskTitle.classList.remove('completed');
                    circleIcon.classList.remove('fa-circle-check');
                    circleIcon.classList.add('fa-circle');
                }
                else {
                    taskTitle.classList.add('completed');
                    circleIcon.classList.remove('fa-circle');
                    circleIcon.classList.add('fa-circle-check');
                }
            }
        }
        handleModal('close');
    }

    function getTasks(title, projectIndex) {
        let startProjectIndex;
        let endProjectIndex

        // SAVE PROJECTS WITH TASKS TO LOCAL STORAGE
        localStorage.setItem('projects', JSON.stringify(projects.projectsList));

        //Clicked on project link
        if (title === 'project') {
            startProjectIndex = projectIndex;
            endProjectIndex = projectIndex + 1;

            //If the selected projects doesn't have any tasks
            if (projects.projectsList[projectIndex].tasks.length === 0) {
                taskCounter.textContent = 0;
            }
        }
        //Clicked on menu link
        else {
            startProjectIndex = 0;
            endProjectIndex = projects.projectsList.length;
        }
        showTasks(title, startProjectIndex, endProjectIndex);
    }

    function handleModal(modalStatus, modalTitle, modalFunction, projectIndex, taskIndex) {
        const modalHeader = document.querySelector('.modal-header');
        const cancelBtn = document.querySelector('.cancel-btn');
        const confirmBtn = document.querySelector('.confirm-btn');


    }

    function selectLink(target, index) {
        const allLinks = document.querySelectorAll('.link')
        const title = target.getAttribute('data-title');

        addTaskBtn.classList.add('hide');

        allLinks.forEach((link) => {
            link.classList.remove('selected-link');
        })

        //Clicked directly on menu or project link
        if (target.classList.contains('link')) {
            target.classList.add('selected-link');
        }
        //Clicked somewhere on project-link
        else if (target.classList.contains('project-element')) {
            addTaskBtn.classList.remove('hide');

            if (target.classList.contains('left-project-div') || target.classList.contains('project-link-icons')) {
                target.parentElement.classList.add('selected-link');
            }
            else if (target.classList.contains('fa-list') || target.classList.contains('fa-trash-can') || target.classList.contains('fa-pen-to-square')) {
                target.parentElement.parentElement.classList.add('selected-link');
            }
            else if (target.classList.contains('project-link-title')) {
                target.parentElement.parentElement.classList.add('selected-link');
            }
        }
        //Clicked somewhere on menu link
        else if (target.classList.contains('menu-element')) {
            if (target.classList.contains('menu-icon') || target.classList.contains('link-text')) {
                target.parentElement.classList.add('selected-link');
            }
        }

        if (target.classList.contains('project-element')) {
            addTaskBtn.classList.remove('hide');
            getTasks('project', index)
        }
        else {
            getTasks(title);
        }

    }

    return {
        showProjects, showMainTitle, handleModal, showTasks, selectLink, changeMainTitle, getTasks
    };
})();

export default dom;