import { loop } from "./canvas-setup.js";

document.addEventListener('DOMContentLoaded', () => {
    loop()
})

/////////////////////////////////////////////////////////

import { ctx, width, height, randomRGB } from "./canvas-setup.js";
 
export class Ball{
 
    constructor(x,y,velX,velY,color,size){
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x,this.y,this.size, 0, 2 * Math.PI)
        ctx.fill();
    }
    update(){
        //Verifica la posicion x de la pelota mas su tamaño supera el ancho del lienzo
        if ((this.x + this.size) >= width) {
            // Si hay colision con el borde derecho
            this.velX = - (Math.abs(this.velX))
        }
        //Verifica si la posicion x de la pelota menos su tamaño es menor o igual a 0
        if ((this.x - this.size) <= 0){
            // Si hay colision con el borde izquierdo se invierte la direccion horizontal
            this.velX = (Math.abs(this.velX))
        }
        if((this.y + this.size) >= height){
            this.velY = -(Math.abs(this.velY))
        }
        if((this.y + this.size) <= 0){
            this.velY = Math.abs(this.velY)
        }
        this.x += this.velX;
        this.y += this.velY;
    }
    collisionDetect() {
 
        for (const ball of balls){
            if(!(this === ball)){
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx*dx + dy*dy)
 
                if (distance < this.size + ball.size){
                    ball.color = this.color = randomRGB();
                }
            }
           
        }
     
    }    
}
 
export const balls = [];

//////////////////////////////////////////////

import { Ball, balls } from "./ball-class.js";
 
 
const canvas = document.querySelector('canvas');
export const ctx = canvas.getContext('2d');
 
export const width = canvas.width = window.innerWidth;
export const height = canvas.height = window.innerHeight;
 
const random = (min,max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
export const randomRGB = () =>{
    return `rgb(${random(0,255)},${random(0,255)},${random(0,255)})`
}
 
export const loop = () =>{
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
    ctx.fillRect(0,0,width,height)
 
    while (balls.length < 25){
        const size = random(10,20)
   
        const ball = new Ball(
            random(0 + size,width -size),
            random(0 + size,height -size)  ,
            random(-7, 7),
            random(-7, 7),
            randomRGB(),
            size
        )
        balls.push(ball);
    }
 
    for(const ball of balls){
        ball.draw();
        ball.update();
        ball.collisionDetect();
    }
 
requestAnimationFrame(loop);
}