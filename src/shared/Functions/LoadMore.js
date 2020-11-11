import { callback } from '../../pages/Containers/CategoryPage';

let newIndex = 24;

export function addScroll(/*category, lastIndex, request_cat*/) {

    if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight) {

        const [category, request_cat] = callback();
        newIndex = newIndex + 24;
        request_cat(category, " ", newIndex);
    }
}


