import dom from './dom.js';
import eventHandler from './eventHandler.js';

dom.showProjects();
dom.showMainTitle(0);
dom.getTasks('all');

eventHandler.clickListener();