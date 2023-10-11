
//import { format, parseISO, differenceInDays } from 'date-fns';
import projects from './projects.js';


const dom = (() => {
    const mainTitleText = document.querySelector('.main-title-text');
    const mainTitleIcon = document.querySelector('.main-title-icon');
    const addTaskBtn = document.getElementById('add-task');

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

            projectLink.classList.add('link', 'project-link', 'flex', 'hovering', 'project-element');
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

    function showTasks(menuCategory, projectIndex) {

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