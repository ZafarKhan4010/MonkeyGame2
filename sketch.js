var PLAY=1;
var END=0; 
gameState=PLAY;
var Player,Player_running,backGround,backGroudImage;
var banana,bananaImage,bananaGroup,obstacle,obstacleImage,obstaclesGroup;
var ground,groundImage,invisibleGround;
var score;

function preload(){
  
  player_running=loadImage("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
 
 bananaImage=loadImage("banana.png");
 obstacleImage=loadImage("stone.png");
 backGroundImage=loadImage("jungle.jpg");
}

function setup(){
 createCanvas(600,600);
  
 
  backGround=createSprite(40,200,20,20);  
  backGround.addImage( backGroundImage);
  backGround.velocityX=-1;
  backGround.x = backGround.width /2;
  console.log(backGround.x);
  
  player=createSprite(80,290,20,20);
  player.addImage(player_running);
  player.scale=0.3;
  player.setCollider("circle",30,30,370);
  player.debug = false;
    
  invisibleGround = createSprite(90,500,1050,20);
  invisibleGround.visible = false; 
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
   
  
  
  score=0;
}

function draw(){
 background(890);
 stroke("white");
 textSize(20);
 fill("white");
 text("Score:"+score,500,50); 
  
  
 
  
 if (backGround.x < 0){
      backGround.x = backGround.width/2;
    }   
 
    //jump when the space key is pressed
    if(keyDown("space")&& player.y >=100) {
        player.velocityY = -13;
    }
    
    //add gravity
    player.velocityY = player.velocityY + 0.8

 
  obstaclesGroup=new Group();
  bananaGroup=new Group();
  
   //stop trex from falling down
  player.collide(invisibleGround);
  
   if (bananaGroup.isTouching(player)){
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    score=score+2;
  }
  
   if(obstaclesGroup.isTouching(player)){
    player.scale=0.2;
  }
  
  switch (score){
  case 10:player.scale=0.12;
      break;
  case 20:player.scale=0.14;
      break;
  case 30:player.scale=0.16;
      break;
  case 40:player.scale=0.18;
      break;
  default :break;
 
      
  }
 
 
  
  spawnFood();
  
  drawSprites();
 text("Score:"+score,500,50); 
}

function spawnFood(){
  if (frameCount%180===0){
     
  obstacle=createSprite(370,450,30,30);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.3;
  obstacle.velocityX=-3; 
  obstacle.setLifetimeEach=-2;  
    
  obstaclesGroup.add(obstacle); 
  }
  if(frameCount%290===0){
     
  banana=createSprite(280,90,20,20);
  banana.addImage(bananaImage);
  banana.scale=0.1;    
  banana.velocityX=-3;  
  banana.setLifetimeEach=300; 
    
  bananaGroup.add(banana);  
  }
  
 
  
}