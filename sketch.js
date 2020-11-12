var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running,ground
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score,ground,monkey

function preload()
{
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,450);
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running)
  monkey.scale=.1
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4
  obstaclesGroup = new Group();

    FoodGroup = new Group();

  score = 0
  //monkey.debug=true;
}

function draw()
{
background("white");
   text("survivaltime: "+ score, 500,50);
drawSprites();
   
  monkey.collide(ground)
  if(gameState === PLAY){
   if(ground.x<0) 
   {
    ground.x=ground.width/2;
   }
  
  
   
    if(keyDown("space"))
    {
      monkey.velocityY = -10;
    }
  
  
  monkey.velocityY=monkey.velocityY+0.8
  
  monkey.collide(ground)
   

    if(obstaclesGroup.isTouching(monkey)){
      gameState = END
    
    
    }
   
    
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach()
   
    
    }
     spawnobstacles() 
  spawnfood()
 
  score = score + Math.round(frameCount/60);
     
   }
  
   else if (gameState === END) {
  ground.velocityX = 0;
        monkey.velocityY = 0;
      
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
      
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
    
     
     
     
   }
  

}
function spawnobstacles() {
   if (frameCount % 60 === 0) {
    var obstacles = createSprite(400,340); 
      obstacles.addImage(obstacleImage); 
     obstacles.scale=0.1
     obstacles.velocityX=-4
      obstaclesGroup.add(obstacles);
     obstacles.lifetime = 300;
    
   }
  
  



}
function spawnfood()
{
   if (frameCount % 60 === 0) {
    var bananas = createSprite(400,250); 
      bananas.addImage(bananaImage); 
     bananas.scale=0.1
     bananas.velocityX=-4
      bananas.lifetime = 300 ;
     FoodGroup.add(bananas)
   }
  
  



}

