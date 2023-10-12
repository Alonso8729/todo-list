import dom from './dom.js'

const eventHandler = (() => {

    function clickListener() {
        let projectIndex;
        let taskIndex;

        document.addEventListener(click, (event) => {
            const { target } = event;

            //MODAL for add-project
            if (target.classList.contains('modal-optional-btn'))
                dom.handleModal();

        })
    }

})();

export default eventHandler;