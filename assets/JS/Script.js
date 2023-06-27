let loader=document.getElementById("preLoader");
let toggleButton=document.getElementById("toggleButton");
let navMenu=document.getElementById("navMenu");

window.addEventListener("load",function (){
    loader.style.display= "none";
})

let toggle=false;
toggleButton.addEventListener('click',function (){
   if (toggle===false){
       toggleButton.className = 'fa-solid fa-x';
       navMenu.style.transform = 'translate(3.5vh, 3vh)';
       toggle = true;
   }else if (toggle===true){
       toggleButton.className = 'fa-solid fa-bars';
       navMenu.style.transform = 'translate(3.5vh, -50vh)';
       toggle = false;
   }
});

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let spots = [];
let hue = 0;

const mouse = {
    x: undefined,
    y: undefined
}

class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 2 + 0.1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = 'hsl(' + hue + ', 100%, 50%)';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.1) this.size -= 0.03;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

canvas.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;

    if (spots.length < 150) {
        spots.push(new Particle());
    }
});

/*function handleParticles() {
    for (let i = 0; i < spots.length; i++) {
        spots[i].update();
        spots[i].draw();

        for (let j = 0; j < spots.length; j++) {
            const dx = spots[i].x - spots[j].x;
            const dy = spots[i].y - spots[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 90) {
                ctx.beginPath();
                ctx.strokeStyle = spots[i].color;
                ctx.lineWidth = spots[i].size;
                ctx.moveTo(spots[i].x, spots[i].y);
                ctx.lineTo(spots[j].x, spots[j].y);
                ctx.stroke();
            }
        }

        if (spots[i].size <= 0.3) {
            spots.splice(i, 1);
            i--;
        }
    }
}*/

function handleParticles() {
    for (let i = 0; i < spots.length; i++) {
        spots[i].update();
        spots[i].draw();

        for (let j = 0; j < spots.length; j++) {
            const dx = spots[i].x - spots[j].x;
            const dy = spots[i].y - spots[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 10) {
                ctx.beginPath();
                ctx.strokeStyle = spots[i].color;
                ctx.lineWidth = spots[i].size * 0.5; // Adjust the multiplier to make it smaller or larger
                ctx.moveTo(spots[i].x, spots[i].y);
                ctx.lineTo(spots[j].x, spots[j].y);
                ctx.stroke();
            }
        }

        if (spots[i].size <= 0.3) {
            spots.splice(i, 1);
            i--;
        }
    }
}


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    hue++;
    requestAnimationFrame(animate);
}

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.addEventListener('mouseleave', function () {
    mouse.x = undefined;
    mouse.y = undefined;
});

animate();

//for send Email


function sendEmail() {
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "d24hostals@gmail.com",
        Password : "108857AED98C6492D0031A28C7FE2C64ED27",
        To : 'tharindumad221@gmail.com',
        From : "d24hostals@gmail.com",
        Subject : "Hi",
        Body : "Hi"
    }).then(
        message => alert(message)
    );
}
