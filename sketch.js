//Create variables here
var dog,happyDog , database, foodS, foodStock;
var dogImage;
var database;

function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");

}

function setup() {
	createCanvas(500, 500);
  dog=createSprite(250,380,20,20);
  dog.addImage(dogImage);
  dog.scale=0.1;
  database=firebase.database();
  foodStock=database.ref("Food");
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);
  drawSprites();
  //add styles here
  fill("white");
  textSize(15);
  text("NOTE: Press UP_ARROW to feed drago milk",120,40);
  textSize(20);
  text("Food Remaining: "+foodS,170,280);
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

