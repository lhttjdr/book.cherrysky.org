// list2tree
Array.prototype.forEach.call(
    document.querySelectorAll('ul > li:first-child'),
    elm => {
        if (/<!-- list2tree -->/.test(elm.innerHTML)) {
            elm.parentNode.classList.add('list2tree');
        }
    }
);