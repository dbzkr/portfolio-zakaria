const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
    const windowHeight = window.innerHeight;

    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;

        if(top < windowHeight - 100){
            el.classList.add("active");
        }
    });
});