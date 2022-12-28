const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;

var ground1, ground2, ground3, gun, wallH;
var laser, box1, box2, box3, box4;

var gameState = "readyToLaunch";

function preload(){
bulletImg = loadImage("Images/Missile.png");
box1Img = loadImage("Images/BILLY.png");
box2Img = loadImage("Images/BILLY.png");
box3Img = loadImage("Images/BILLY.png");
box4Img = loadImage("Images/BILLY.png");
}

function setup(){

    var canvas = createCanvas(1100, 450);

    engine = Engine.create();
    world = engine.world;

    box1 = new Target(800, 379, 20, 50);
    box2 = new Target(800, 379, 20, 50);
    box3 = new Target(800, 179, 20, 50);
    box4 = new Target(800, 179, 20, 50); 

    ground1 = new Ground(800, 180, 108, 10);
    ground2 = new Ground(800, 380, 110, 10);
    ground3 = new Ground(550, 445, 1100, 20);
    wallH = new Wall(1989, 225, 10, 445);

    laser = new Bullet(150, 350, 10, 5);

    gun = new Rope(laser.body,{x:200, y:50});
}    

function draw(){
    background(0);
    Engine.update(engine);
    
    ground1.display();
    ground2.display();
    ground3.display();
    wallH.display();

    laser.display();
    gun.display();

    box1.display();
    box2.display();
    box3.display();
    box4.display();

    text("Use the mouse to drag the bullet and release it to launch", 225, 80);
    text("Press space to reset the block", 225, 100);
}

function mouseDragged(){
    if(gameState !== "deployed"){
        Matter.Body.setPosition(laser.body, {x: mouseX , y: mouseY});
    }
}

function mouseReleased(){
    gun.fly();
    gameState = "deployed";
}

function keyPressed(){
    if(keyCode == 32){
        Matter.Body.setPosition(laser.body, {x:200, y:50})
        gun.attach(laser.body)
        gameState = "readyToLaunch";
    }
} 