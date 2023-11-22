import { ctx, width, height, randomRGB } from "./canvas-setup.js";

export class Ball {

    constructor(x, y, velX, velY, color, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }

// En la función math.Pi quitamos los paraentesis q la siguen  
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
        ctx.fill();
    }


    update() {
        //Verifica la posicion x de la pelota mas su tamaño supera el ancho del lienzo
        if ((this.x + this.size) >= width) {
            // Si hay colision con el borde derecho
            this.velX = - (Math.abs(this.velX))
        }
        //Verifica si la posicion x de la pelota menos su tamaño es menor o igual a 0
        if ((this.x - this.size) <= 0) {
            // Si hay colision con el borde izquierdo se invierte la direccion horizontal
            this.velX = (Math.abs(this.velX))
        }
        if ((this.y + this.size) >= height) {
            this.velY = -(Math.abs(this.velY))
        }
        if ((this.y + this.size) <= 0) {
            this.velY = Math.abs(this.velY)
        }
        this.x += this.velX;
        this.y += this.velY;
    }


    collisionDetect() {

        for (const ball of balls) {
            if (!(this === ball)) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < this.size + ball.size) {
                    ball.color = this.color = randomRGB();
                }
            }

        }

    }
}

export const balls = [];