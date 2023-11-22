import { balls, Ball } from "./classBall.js";

export const canvas = document.querySelector('canvas');
export const ctx = canvas.getContext("2d");

// Encontramos que en la construccion de la variable width 
//habia un window.innerheight y debia de ser innerwidth
export const width = canvas.width = window.innerWidth;
export const height = canvas.height = window.innerHeight;

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}


export function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);
    
    while (balls.length < 20) {
        const size = random(10, 20);
        const ball = new Ball(
            random(0 + size, width - size),
            random(0 + size, height - size),
            random(-7, 7),
            random(-7, 7),
            size
            );
            
            balls.push(ball);
        }
        for (const ball of balls) {
            ball.draw();
            ball.update();
            for (const otherBall of balls) {
                if (ball !== otherBall) {
                    ball.collisionDetect(otherBall);
                }
            }
    }

    requestAnimationFrame(loop);
}

loop();