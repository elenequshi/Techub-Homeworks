function generate(param) {

    for (let i = 0; i < param.count; i++) {
        let tag = document.createElement(param.tagName);
        let parent = document.querySelector(param.parentSelector);
        parent.appendChild(tag);
        for (let j = 0; j < param.childCount; j++) {
            let child = document.createElement(param.childElement);
            child.textContent = param.content;
            tag.appendChild(child);
        }
    }
}


generate({
    count: 3,
    tagName: 'ul',
    parentSelector: "#container",
    content: 'elene',
    childCount: 5,
    childElement: 'li'
});