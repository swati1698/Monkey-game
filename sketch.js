
var monkey , monkey_running,monkeyImage;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup,invisibleGround;
var score=0;
var gameState="play";

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage=loadImage("ground.jpg");
}

function setup() { 
  createCanvas(500,400);
  
  ground=createSprite(250,250,10,10);
  ground.addImage(groundImage);
  ground.x=ground.width/2;
  ground.velocityX=-6;
  
  monkey=createSprite(50,350,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.15;
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  //monkey.debug=true;
  
  invisibleGround=createSprite(250,405,500,10);
  invisibleGround.visible=false;
  
  bananaGroup= new Group();
  obstacleGroup= new Group();
  
}


function draw() {
  background("pink");

  if(gameState==="play")
  {
  score=score+Math.round(frameCount/230);
  
  if(ground.x<0)
  {
    ground.x=ground.width/2;
  }
   
  if(keyDown("space") && monkey.y>=353.95)
  {
    monkey.velocityY=-20;
  }    
    
  monkey.velocityY=monkey.velocityY+0.6;
  
  spawnbanana();
  
  spawnobstacle();
  
  if(monkey.isTouching(bananaGroup))
  {
    bananaGroup.destroyEach();
  }
  
  if(monkey.isTouching(obstacleGroup))
  {
    
    gameState="end";
    
  }
  }
  
  if(gameState==="end")
    
  {
    monkey.velocityY=0;
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    ground.velocityX=0;
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
  }
    
  monkey.collide(invisibleGround);
  drawSprites();
  
  fill("white");
  rect(50,15,200,50);
  fill("green");
  textSize(20);
  text("Survival Time: "+score,50,50); 
 
}


function spawnbanana()
{
  if(frameCount%100===0)
     {
     banana=createSprite(510,Math.round(random(150,350)),20,50);
      banana.velocityX=-6;
       banana.addImage(bananaImage);
       banana.lifetime=150;
       banana.scale=0.15;
      banana.setCollider("rectangle",0,0,banana.width,banana.height);
       //banana.debug=true;
       bananaGroup.add(banana);
     }


}

function spawnobstacle()
{
  if(frameCount%200===0)
     {
     obstacle=createSprite(510,360,20,50);
      obstacle.velocityX=-6;
       obstacle.addImage(obstacleImage);
       obstacle.lifetime=150;
       obstacle.scale=0.2;
      //obstacle.debug=true;
    obstacle.setCollider("rectangle",0,0,obstacle.width,obstacle.height);
       obstacleGroup.add(obstacle);
     
     }
}




