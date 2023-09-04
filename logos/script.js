// prevent text/element highlighting, copying
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
}, false)

// custom cursor
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.top = e.pageY + 'px'
    cursor.style.left = e.pageX + 'px'
})

// custom scroll padding
const navigation = document.querySelector(".primary-navigation")
const navigationHeight = navigation.offsetHeight;
document.documentElement.style.setProperty("--scroll-padding", navigationHeight + "px") 
