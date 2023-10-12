
import { format, parseISO, differenceInDays } from 'date-fns';
import projects from './projects.js';


const dom = (() => {
    //variable declaration and assignment
    const mainTitleText = document.querySelector('.main-title-text');
    const mainTitleIcon = document.querySelector('.main-title-icon');
    const addTaskBtn = document.getElementById('add-task');
    const taskCounter = document.getElementById('tasks-counter');
    const tasksList = document.querySelector('.tasks-list');

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

            projectLink.classList.add('link', 'project-link', 'flex', 'pointer', 'project-element');
            projectLink.setAttribute('href', '#');
            projectLink.setAttribute('data-link-index', i);
            projectsList.appendChild(projectLink);



            //Assign and append project icon to leftProjectLink
            projectIcon.classList.add('fa-solid', 'fa-list', 'project-element');
            leftProjectDiv.appendChild(projectIcon);

            //Assign project title and append to leftProjectLink
            projectTitle.classList.add('project-link-title', 'project-element');
            projectTitle.textContent = projects.projectsList[i].title;
            leftProjectDiv.appendChild(projectTitle)

            leftProjectDiv.classList.add('leftProjectDiv', 'project-element');
            projectLink.appendChild(leftProjectDiv);

            //Add class and append projectIconsDiv
            projectIconsDiv.classList.add('project-link-icons', 'flex', 'project-element');
            projectLink.appendChild(projectIconsDiv);

            //Add icons to icons div
            editIcon.classList.add('fa-regular', 'fa-pen-to-square', 'project-element');
            projectIconsDiv.appendChild(editIcon);
            trashIcon.classList.add('fa-regular', 'fa-trash-can', 'project-element');
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
        // Remove existing classes from mainTitleIcon


        iconClasses.forEach(className => {
            mainTitleIcon.classList.add(className);

        })


        document.title = `Todo List - ${mainTitleText.textContent}`;
    }

    function showTasks(menuCategory, projectIndexStart, projectIndexEnd) {
        const todayDate = format(new Date(), 'yyyy-MM-dd');
        const taskNumber = 0;

        taskCounter.textContent = 0;
        tasksList.textContent = 0;

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
                taskDiv.classList.add('task-div', 'flex', 'pointer');
                taskLeftDiv.classList.add('task-left-side', 'flex');
                taskTitle.classList.add('task-title');
                if (projects.projectsList[i].tasks[j].completed !== true) {
                    circleIcon.classList.add('fa-regular', 'fa-circle');
                }
                else {
                    circleIcon.classList.add('fa-regular', 'fa-circle-check');
                    taskTitle.classList.add('completed');
                }
                taskRightDiv.classList.add('task-right-side', 'flex');
                dueDate.classList.add('task-due-date');
                editIcon.classList.add('fa-regular', 'fa-pen-to-square');
                trashIcon.classList.add('fa-regular', 'fa-trash-can');
                infoIcon.classList.add('fa-solid', 'fa-circle-info');

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
            }
        }
        handleModal('close');
    }

    function handleModal(modalStatus, modalTitle, modalFunction, projectIndex, taskIndex) {

    }

    function selectLink(target, index, action) {
        const projectLinks = document.querySelectorAll('.project-link');
        const allLinks = document.querySelectorAll('.link')

        addTaskBtn.classList.add('hide');

        allLinks.forEach(link => {
            link.classList.remove('selected-link');
        })

        //Clicked on project or menu link
        if (target.classList.contains('link')) {
            target.classList.add('selected-link');
            //Clicked on edit icons
            if (action === 'edit')
                projectLinks[index].classList.add('selected-link');
        }
        //Clicked on menu-link's child element
        else if (target.classList.contains('link-text') || target.classList.contains('icon-link')) {
            target.parentElement.classList.add('selected-link');
        }

        //Clicked anywhere on menuLink
        if (target.classList.contains('nav-menu-link') || target.classList.contains('icon-link') || target.classList.contains('link-text')) {
            //getTask('menuTitle')
        }
        //Clicked anywhere on project
        if (target.classList.contains('project-element')) {
            addTaskBtn.classList.remove('hide');
            //getTast()
            //Clicked on one of the icons
            if (target.classList.contains('fa-list') || target.classList.contains('fa-trash') || target.classList.contains('fa-pen-to-square')) {
                target.parentElement.classList.add('selected-link');
            }
            //Clicked on one of the divs
            else if (target.classList.contains('leftProjectDiv') || target.classList.contains('project-link-icons')) {
                target.parentElement.classList.add('selected-link');
            }
        }



    }

    return {
        showProjects, showMainTitle, handleModal, showTasks, selectLink
    };
})();

export default dom;