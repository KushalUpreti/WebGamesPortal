import { request_category } from './Firebase';

export function addScroll(category, lastIndex, stateFunction, state) {
    if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight) {
        console.log("Loading new data");
        request_category(category, lastIndex, 30, stateFunction, state);
    }
}

