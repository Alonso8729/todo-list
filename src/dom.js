
//import { format, parseISO, differenceInDays } from 'date-fns';
import projects from './projects.js';


const dom = (() => {
    const mainTitleText = document.querySelector('.main-title-text');
    const mainTitleIcon = document.querySelector('.main-title-icon');


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
            const editIcon = document.createElement('i');
            const trashIcon = document.createElement('i');

            projectLink.classList.add('project-link', 'flex', 'hovering');
            projectLink.setAttribute('href', '#');
            projectLink.setAttribute('data-link-index', i);
            projectsList.appendChild(projectLink);

            //Assign project title and append to projectLink
            projectTitle.classList.add('project-link-title');
            projectTitle.textContent = projects.projectsList[i].title;
            projectLink.appendChild(projectTitle);

            //Add class and append projectIconsDiv
            projectIconsDiv.classList.add('project-link-icons', 'flex');
            projectLink.appendChild(projectIconsDiv);

            //Add icons to icons div
            editIcon.classList.add('fa-regular', 'fa-pen-to-square');
            projectIconsDiv.appendChild(editIcon);
            trashIcon.classList.add('fa-regular', 'fa-trash-can');
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

    return {
        showProjects, showMainTitle
    };
})();

export default dom;