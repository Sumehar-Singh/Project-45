var bgImg;
var bg;
var soldier,soldierImg, soldeirStanding;
var gameState = 0;
var invisibleGround; 
var zombieImg, zombie;
var wall1, wall2, wall3;
function preload()
{
  bgImg = loadAnimation("Images/forest5.jpg");
  bgImg2 = loadAnimation("Images/forest8.png");
  soldierImg = loadAnimation("Images/pic1 (2).png", "Images/Pic2 (2).png", "Images/Pic4 (2).png", "Images/Pic5.png", "Images/Pic6.png");
  soldeirStanding = loadAnimation("Images/23 (1).png"); 
  soldierCrouch = loadAnimation("Images/25 (1).png");
  soldierJump = loadAnimation("Images/12 (1).png");
  soldierShooting = loadAnimation("Images/1 (1).png", "Images/2 (1).png", "Images/3 (1).png", "Images/4 (1).png");
  soldierKnife = loadAnimation("Images/6 (1).png", "Images/7 (1).png","Images/8 (1).png","Images/6 (1).png");

  zombieImg = loadAnimation("Images/zombie2.gif");

  wall1Img = loadImage("Images/45.png");
  wall2Img = loadImage("Images/45.png");
  wall3Img = loadImage("Images/44.png");
  }
function setup() {
  createCanvas(windowWidth,windowHeight-0.001);
  bg = createSprite(windowWidth/2,windowHeight/2-240);
  bg.addAnimation("bg2", bgImg2);
  bg.addAnimation("bg", bgImg);
  bg.scale = 2.5;
  
  soldier = createSprite(150, 660, 50, 50);
  soldier.addAnimation("standing",soldeirStanding);
  soldier.addAnimation("running", soldierImg);
  soldier.addAnimation("crouch", soldierCrouch);
  soldier.addAnimation("jump", soldierJump);
  soldier.addAnimation("shoot", soldierShooting);
  soldier.addAnimation("knife", soldierKnife);
  soldier.scale = 0.3;
  soldier.velocityY = 0;
 // soldier.debug = true;
  soldier.setCollider("rectangle", -25, -5, 200, 390);

  invisibleGround = createSprite(windowWidth/2, 730, windowWidth+500, 50);
  invisibleGround.shapeColor = "#0C1122";

  zombie = createSprite(windowWidth-300, 620, 50, 50);
  zombie.addAnimation("zombie", zombieImg);
  zombie.scale = 0.7;

  wall1 = createSprite(windowWidth-10, windowHeight/2-215);
  wall1.addImage(wall1Img);
  wall1.scale = 4;
  //wall1.debug = true;
  wall1.setCollider("rectangle", 0,0,30, 155);
  wall1.visible = false;

  wall2 = createSprite(windowWidth-10, windowHeight/2-30);
  wall2.addImage(wall2Img);
  wall2.scale = 4;
  //wall2.debug = true;
  wall2.setCollider("rectangle", 0,0,30, 155);
  wall2.visible = false;

  wall3 = createSprite(windowWidth-10, windowHeight/2+150);
  wall3.addImage(wall3Img);
  wall3.scale = 4;
  //wall3.debug = true;
  wall3.setCollider("rectangle", 0,0,30, 80);
  wall3.visible = false; 
}

function draw() {
  background(0);
    //camera.position.x = soldier.position.x;
  //camera.position.y = soldier.position.y;
 
  if(keyDown("d") && soldier.scale===0.3)
  {
    soldier.changeAnimation("running", soldierImg);
    soldier.x = soldier.x + 8;
 
    soldier.setCollider("rectangle", -25, -5, 200, 390);
  }
  
  if(keyWentUp("d"))
  {
    soldier.changeAnimation("standing", soldeirStanding);
    soldier.scale = 0.3;
  }


  
  if(keyWentDown("w") &&soldier.scale === 0.3 && soldier.velocityY === 0)
  {
    soldier.changeAnimation("jump", soldierJump);
    soldier.velocityY = -18  ;
  }

soldier.velocityY = soldier.velocityY + 1;

if(keyWentUp("w"))
{
  soldier.changeAnimation("standing", soldeirStanding);
}

if(keyDown("s") && soldier.isTouching(invisibleGround))
  {
    soldier.changeAnimation("crouch", soldierCrouch);
    soldier.scale = 0.24;
  }

  if(keyWentUp("s"))
  {
    soldier.changeAnimation("standing", soldeirStanding);
    soldier.scale = 0.3;
  }

  //}


  if(keyDown("j"))
  {
    soldier.scale = 0.325;
    
  }
  if(soldier.scale === 0.325)
  {
    soldier.changeAnimation("shoot", soldierShooting);
  
  }
  if(keyWentUp("j"))
  {
    soldier.changeAnimation("standing", soldeirStanding);
    soldier.scale = 0.3;
  }
  if(keyWentDown("k"))
  {
    
    soldier.scale = 0.32;
    
  }
  if(soldier.scale===0.32)
  {
    soldier.changeAnimation("knife", soldierKnife);
  }
  if(keyWentUp("k"))
  {
    soldier.changeAnimation("standing", soldeirStanding);
    soldier.scale = 0.3;
    
  }
  if(keyDown("s"))
    {
      if(keyDown("k"))
      {
        soldier.scale = 0.32;
        soldier.changeAnimation("knife", soldierKnife);
      }
    }

if(gameState === 0 && soldier.x - 100 >windowWidth)
{

  gameState = 1;
  soldier.x = -100;
  bg.changeAnimation("bg", bgImg);
  bg.y= windowHeight/2-100;
  bg.scale = 1.6;
  invisibleGround.y = 730;
  invisibleGround.shapeColor = "#06191D";
  
}
if(gameState === 1 && soldier.x - 50 >windowWidth)
{
  gameState = 2;
  soldier.x = -100;
  bg.changeAnimation("bg2", bgImg2);
  zombie.remove();
  
  bg.y= windowHeight/2-240;
  bg.scale = 2.5;
  //invisibleGround.y = 800;
  invisibleGround.shapeColor = "#0C1122";
 }

if(gameState === 2)
{
  wall1.visible = true;
  wall2.visible = true;
  wall3.visible = true;
  soldier.collide(wall1);
  soldier.collide(wall2);
  soldier.collide(wall3);
}
soldier.collide(invisibleGround);

  drawSprites();
}