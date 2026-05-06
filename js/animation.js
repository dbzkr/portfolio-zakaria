const text = [
    "Étudiant BTS SIO SISR",
    "Passionné réseaux & cybersécurité",
    "Futur administrateur systèmes"
];

let i = 0;
let j = 0;
let currentText = "";
let isDeleting = false;

function typeEffect(){
    currentText = text[i];

    if(!isDeleting){
        document.getElementById("typing").textContent =
        currentText.substring(0,j++);
    }else{
        document.getElementById("typing").textContent =
        currentText.substring(0,j--);
    }

    if(j === currentText.length){
        isDeleting = true;
        setTimeout(typeEffect,1000);
        return;
    }

    if(j === 0){
        isDeleting = false;
        i = (i + 1) % text.length;
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();