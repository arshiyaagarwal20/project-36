var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//var feed;
var lastfed;
//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
feedDog1=createButton("Feed the Dog")
feedDog1.position(800,200)
feedDog1.mousePressed(feedDog)
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  var feed=database.ref('FeedTime')
 feed.on("value",function(data){
   lastfed=data.val();
 })
  //write code to display text lastFed time here
if(lastfed>=12){
  text("LAST FED:"+lastfed % 12+"pm",60,40)
}
 else if(lastfed==0){
   text("lastfed:12am",60,40)
 }
 else{
   text("lastfed:"+lastfed+"am",60,40)
 }
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
var foodstock1=foodObj.getFoodStock()                                      
if(foodstock1<=0){
  foodObj.updateFoodStock(foodstock1*0)
}
else{
  foodObj.updateFoodStock(foodstock1-1)
}
  //write code here to update food stock and last fed time
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()

})
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
