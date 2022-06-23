const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');


let particleArray;
ctx.fillStyle = 'white';
ctx.font = '12px Arial';
ctx.fillText('MUSIC', 5, 15);

ctx.fillStyle = 'white';
ctx.font = '10px Arial';
ctx.fillText("FESTiVAL", 5, 25);
const textCoordinate = ctx.getImageData(0, 0, 500, 500);


window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight / 2;
})

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 3;
        this.dx = (Math.random() - 0.5) * 2;
        this.dy = (Math.random() - 0.5) * 2;
        this.density = (Math.random() * 30 + 1);
    }
    draw() {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update() {

        if (this.x + this.size > innerWidth || this.x - this.size < 0) {
            this.dx = -this.dx
        }
        if (this.y + this.size > innerHeight || this.y - this.size < 0) {
            this.dy = -this.dy
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();

    }
}

function init() {
    particleArray = [];
    for (let y = 0, y2 = textCoordinate.height; y < y2; y++) {
        for (let x = 0, x2 = textCoordinate.width; x < x2; x++) {
            if (textCoordinate.data[(y * 4 * textCoordinate.width) + (x * 4) + 3] > 128) {
                let positionX = x;
                let positionY = y;
                particleArray.push(new Particle(positionX * 5, positionY * 5));
            }
        }
    }

}

init();

function animate() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw();
        // particleArray[i].update();

        setTimeout(() => {
            particleArray[i].update();
            document.querySelector('h2').classList.add('show');
        }, 5000);
    }
    requestAnimationFrame(animate);
}

animate();
