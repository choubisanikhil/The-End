var ground, Ground, GroundImg;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var BananaGroup, obstacleGroup;
var stone;
var gameState = "play";
var score;
var gameOver, restart;

function preload(){
  
  GroundImg = loadImage("jungle.jpg");
  
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
 gameOverImg = loadImage("Game Over.jpg");
 restartImg = loadImage("Restart.jpg");
}

function setup() {
  createCanvas(700,450);
  
 monkey = createSprite(80,315,20,20);
 monkey.addAnimation("moving", monkey_running);
 monkey.scale=0.1;
  
 ground = createSprite(400,350,900,10);
 ground.visible = false;

 Ground = createSprite(200,70);
 Ground.velocityX = -(6+3*score/10);
 Ground.velocityX=-4;
 Ground.addImage(GroundImg);
 Ground.scale = 1.5;
 Ground.x = ground.width/2;
  
 Ground.depth = monkey.depth;
 monkey.depth = monkey.depth + 1;
  
 BananaGroup = createGroup();
 ObstaclesGroup = createGroup();

 score = 0;
}


function draw() {
  
 monkey.setCollider("circle",0,0,250);
 //monkey.debug = true;

 background("White");

 if (gameState === "play") {

   if (Ground.x < 0){
      Ground.x = Ground.width/2;
    }
 
     if(keyDown("space")&& monkey.y >= 314) {
        monkey.velocityY = -12;
    } 
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.5
    monkey.collide(ground);
  
    food();
    obstacles();
   
    if(ObstaclesGroup.isTouching(monkey)){
      gameState = "end"
}}

  drawSprites();
  textscore();
  
  if (gameState === "end") {

   monkey.destroy();
   BananaGroup.destroyEach();
   ObstaclesGroup.destroyEach();

   Black = createSprite(225,350,1000,1000);
   Black.shapeColor="White";

   gameOver = createSprite(300,150);
   gameOver.addImage(gameOverImg);

   restart = createSprite(300,280);
   restart.addImage(restartImg);
  
   gameOver.scale = 0.3;
   restart.scale = 0.2;
    
   gameOver.position.x = restart.position.x = camera.x

    //set velcity of each game object to 0
    Ground.velocityX = 0;
    monkey.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    BananaGroup.setVelocityXEach(0);
        
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    BananaGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
       reset();
}}}

function food(){
   if (frameCount % 180 === 0){
     banana = createSprite(800,200,20,20);
     banana.velocityX = -(6+3*score/10);
     banana.addImage(bananaImage);
     banana.scale = 0.1;
     banana.y = Math.round(random(150,230));
     banana.velocityX = -4;
     banana.lifetime = 200;
     
     BananaGroup.add(banana);
}}

function obstacles(){
   if (frameCount % 280 === 0){
     stone = createSprite(800,325,20,20);
     stone.velocityX = -(6+3*score/10);
     stone.addImage(obstacleImage);
     stone.scale = 0.1;
     stone.velocityX = -4;
     stone.lifetime = 200;
     
     ObstaclesGroup.add(stone);
   }
}

function textscore(){
  
   stroke("Black");
   fill("Black");
   textSize(28);
   text("Score: " + score,25,35);  
  
   
   if(BananaGroup.isTouching(monkey)){
     BananaGroup.destroyEach();
     score=score+2;
   }
}

function reset(){
  gameState = "play";
  gameOver.visible = false;
  restart.visible = false;
  
  ObstaclesGroup.destroyEach();
  BananaGroup.destroyEach();
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400,350,900,10);
  ground.visible = false;

  Ground = createSprite(200,70);
  Ground.velocityX = -(6+3*score/10);
  Ground.velocityX=-4;
  Ground.addImage(GroundImg);
  Ground.scale = 1.5;
  Ground.x = ground.width/2;
  
  Ground.depth = monkey.depth;
  monkey.depth = monkey.depth + 1;
    
  score = 0;
}