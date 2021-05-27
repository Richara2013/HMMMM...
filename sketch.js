var backImage,backgr;
var player, player_running;
var ground,ground_img;
var score =0;
var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  obstaceImage = loadImage("stone.png");
  gameOvv= loadImage("game.ovvv.png");
  bananaImage=loadImage("banana.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  FoodGroup= createGroup();
  obstaclesGroup= createGroup();
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  if (FoodGroup.isTouching(player)){
    FoodGroup.destroyEach();
    score = score+2;
    player.scale= player.scale+0.1;
  }
  spawnFood();
  spawnObstacle();
  if(obstaclesGroup.isTouching(player)){
    gameState =END;
  } 
  if (gameState === END){
    backgr.velocityX = 0;
    player.addImage(gameOvv);
    FoodGroup.destroyEach();
    obstaclesGroup.destroyEach();
  }
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

  }
   
  drawSprites();
  textSize(30);
  fill(255);
  text("Score : "+score,650,30);
  if (gameState === END){
    textSize(30);
    fill(255);
    text("GAME OVER!", 300,200);
  }
}

function spawnFood(){
  if (frameCount % 80 === 0) {
  var banana = createSprite(600,250,40,10);
  banana.y = Math.round(random(50,100));
  banana.addImage(bananaImage);
  banana.scale = 0.05;
  banana.velocityX = -4;
  banana.scale = 0.1;
   //assign lifetime to the variable
  banana.lifetime = 300;
  player.depth + 1;
  FoodGroup.add(banana);
}}

function spawnObstacle(){
  if (frameCount % 300 === 0) {
  var obstacle = createSprite(400,339,40,10);
//  banana.y = Math.round(random(120,200));
  obstacle.addImage(obstaceImage);
  obstacle.scale = 0.1;
  obstacle.velocityX = -3;
  obstacle.scale = 0.2;
   //assign lifetime to the variable
  obstacle.lifetime = 200;
  obstaclesGroup.add(obstacle);
}}