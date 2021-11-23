var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300, 300, 50, 50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.4;

  doorsGroup = new Group;
  climbersGroup = new Group;
  invisibleBlockGroup = new Group;
  
  //spookySound.loop();
}

function draw() {
  background(200);

  if(gameState == "play")
  {
    if(tower.y > 400)
    {
      tower.y = 300
    }
  
    if(keyDown("LEFT_ARROW"))
    {
      ghost.x = ghost.x - 5;
    }
   
    if(keyDown("RIGHT_ARROW"))
    {
      ghost.x = ghost.x + 5
    }
  
    if(keyDown("SPACE"))
    {
      ghost.velocityY = - 5
    }
  
    ghost.velocityY = ghost.velocityY + 0.8;
  
    if(climbersGroup.isTouching(ghost))
    {
      ghost.velocityY = 0;
    }
  
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600)
    {
      ghost.destroy();

      gameState = "end";
    }
  
    spawnDoor();
    
  }
  
  if(gameState == "end")
  {
    textSize(30);
    text("gameOver", 300, 300);

    tower.velocityY = 0;
    doorsGroup.destroyEach();
    climbersGroup.destroyYEach()
    invisibleBlockGroup.destroyYEach();

  }
  
  
   //ghost.debug = true;
   ghost.setCollider("rectangle", 0, 10, 200, 250  )
  
  drawSprites();
 
  if(gameState == "end")
  {
    fill(255)
    textSize(30);
    text("Game Over", 200, 300)
  }
}

function spawnDoor()
{
  if(frameCount % 300 == 0)
  {
    door = createSprite(0, -100, 60, 60);
    door.addImage(doorImg);
    door.velocityY = 1;
    door.x = Math.round(random(100, 400));
    door.lifetime = 800;
    doorsGroup.add(door);

    climber = createSprite(0, -40, 60, 60);
    climber.addImage(climberImg);
    climber.velocityY = 1;
    climber.x = door.x
    climber.lifetime = 800;
    climbersGroup.add(climber);

    invisibleBlock = createSprite(0, -30, 80, 5);
    invisibleBlock.visible =  false;
    invisibleBlock.velocityY = 1;
    invisibleBlock.x = door.x
    invisibleBlock.lifetime = 800;
    invisibleBlockGroup.add(invisibleBlock);



    ghost.depth = door.depth + 1;

    console.log(ghost.depth, door.depth);
  }
}

