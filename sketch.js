//Create variables here
var dog,happyDog , database, foodS, foodStock;
var dogImage;
var database;
var hall;
var bowl;
var spriteBowl;

function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  hall = loadImage ("images/hall.jpg");
  bowl = loadImage("images/bowl.png");
}

function setup() {
	createCanvas(500, 500);
  dog=createSprite(320,420,20,20);
  dog.addImage(dogImage);
  dog.scale=0.15;

  spriteBowl=createSprite(210,460,10,10);
  spriteBowl.addImage(bowl);
  spriteBowl.scale=0.15;
  database=firebase.database();
  foodStock=database.ref("Food");
  foodStock.on("value",readStock);
}


function draw() {  
  background(hall);
  drawSprites();
  //add styles here
  fill("black");
  textSize(15);
  text("NOTE: Press UP_ARROW to feed drago milk",120,60);
  fill("white");
  textSize(20);
  text("Food Remaining: "+foodS,180,350);
 if(keyWentDown(UP_ARROW)){
   writeStock(foodS);
   dog.addImage(happyDog);
 }
}

function readStock(data){
   foodS=data.val();
}

function writeStock(x){
 
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
 
  database.ref('/').update({
    Food:x
  })
}

