
var monkey , monkey_running;
var banana ,bananaImage, bananaGroup; 
var obstacle, obstacleImage, obstacleGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var survivalTime;
var score;
function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
 createCanvas(600,250);
 
  monkey = createSprite(50,180,20,50);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,214,900,10);
  ground.velocityX = -5;
  ground.x = ground.width / 2;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  monkey.setCollider("circle",0,0,270);
  monkey.debug = false;
  
  survivalTime = 0;
  score = 0;
}

function draw() {
background(250);

if (gameState === PLAY){
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score,500,50);
  
  
  
  stroke("black");
  textSize(20);
  fill("black")
  survivalTime = Math.round(frameCount/frameRate());
  text("survivalTime: " + survivalTime, 100,50);
  
if (ground.x>0){
    ground.x = ground.width /2;
    }
  
if (keyDown("space")&& monkey.y >= 170){
    monkey.velocityY = -15;
    }
  monkey.velocityY = monkey.velocityY + 0.8;

  if (monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    }
if (monkey.isTouching(obstacleGroup)){
    gameState = END;
    }
  
   food();
  spawnObstacles();
}  
else if(gameState === END){
        monkey.velocityX = 0;
        ground.velocityX = 0;
        bananaGroup.setVelocityXEach(0);
        obstacleGroup.setVelocityXEach(0);
        bananaGroup.setLifetimeEach(-1);
        obstacleGroup.setLifetimeEach(-1);
        
} 
  monkey.collide(ground);
   drawSprites();
}

function food () {
if (frameCount % 150 === 0){
  banana = createSprite(600,100,20,20);
  banana.y = Math.round(random(80,130));
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -4;
  banana.lifetime = 155;
  bananaGroup.add(banana);
  
}
  
}

function spawnObstacles () {
if (frameCount%200 === 0){
  obstacle = createSprite(600,190,20,20);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.1;
  obstacle.velocityX = -4;
  obstacle.lifetime = 150;
  obstacleGroup.add(obstacle);
}
}