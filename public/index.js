function setupNavHover() {
    let dropdowns = document.getElementsByClassName("dropdown");
    for (let i = 0; i < dropdowns.length; i++) {
        dropdowns[i].addEventListener("mouseleave", function () {
            dropdowns[i].classList.remove("show");
        });
        let toggle = dropdowns[i].querySelector(".dropdown-toggle");
        toggle.addEventListener("mouseenter", function () { 
            dropdowns[i].classList.add("show");
        });
        let s = toggle.style.fontSize;
        toggle.style.fontSize = "1.3rem";
        let newW = toggle.offsetWidth;
        toggle.style.fontSize = s;
        dropdowns[i].style.width = `${newW}px`
    }
}

setupNavHover();