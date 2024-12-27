// sketch.js
// Canvas
// AME 230
//

let treeImage, dessertImage, brickImage, oreImage, wheatImage, sheepImage;
let image2,image3,image4,image5,image6,image8,image9,image10,image11,image12;
let woodCard,sheepCard,grainCard,oreCard,brickCard,developmentCard;

let hexPosition = [];
let hexResource = [];
let hexNumber = [];

let totalGrainCollected = 2;
let totalBrickCollected = 4;
let totalOreCollected = 0;
let totalWoodCollected = 4;
let totalSheepCollected = 2;


let currentHighlightedHexes = [];

let settlements = []; 
let roads = []; 
let initialPlacement = false; // Flag for initial placement phase

let possibleRoadLocations = [];

let can_Build_Settelment_boo = false;
let can_Build_Road_boo = false;
let resourcesChanged = false;



function preload() {

  treeImage = loadImage("resources/tree2.png");
  dessertImage = loadImage("resources/dessert.png");
  brickImage = loadImage("resources/brick3.png");
  oreImage = loadImage("resources/oref.png");
  wheatImage = loadImage("resources/wheat.png");
  sheepImage = loadImage("resources/sheep1.png");

  image2 =loadImage("numbers/number2.png");
  image3 =loadImage("numbers/number3.png");
  image4 =loadImage("numbers/number4.png");
  image5 =loadImage("numbers/number5.png");
  image6 =loadImage("numbers/number6.png");
  image8 =loadImage("numbers/number8.png");
  image9 =loadImage("numbers/number9.png");
  image10 =loadImage("numbers/number10.png");
  image11 =loadImage("numbers/number11.png");
  image12 =loadImage("numbers/number12.png");

  woodCard = loadImage("resourceCards/woodcard.png");
  sheepCard = loadImage("resourceCards/sheepcard.png");
  grainCard = loadImage("resourceCards/graincard.png");
  oreCard = loadImage("resourceCards/orecard.png");
  brickCard = loadImage("resourceCards/brickcard.png");
  developmentCard =  loadImage("resourceCards/developmentcard.png");


}
function setup() {
  createCanvas(800, 800);
  background(230,190,100);
  drawHexGrid(75);

  stroke(255)
  fill(10,100,155);
  rect(10,670,350,100,10);

  
  console.log("Edges are ", generateAllHexagonEdges());
  console.log("Edges for get_p5p2XVals are ", get_p5p2XVals());
  

  const close = 20;
  rect(390-close,690,70,70,10);
  rect(470-close,690,70,70,10);
  rect(550-close,690,70,70,10);
  rect(630-close,690,70,70,10);
  rect(710-close,690,70,70,10);

  drawSettelement(585-close,735,"Black");
  drawCity(665-close,735,"Black");
  drawRoad(485,710,"Black");
  
   
  stroke(0,0,155)
  fill(10,155,100);
  rect(690,20,100,420,10);
  stroke(0,155,155)
  fill(200,100,0);
  rect(690,460,100,100,10);

  const imageX = 710;
  const imageY = 25;
  const imageW = 55;
  const imageL = 80;

  image(woodCard,imageX,imageY,imageW,imageL);
  image(sheepCard,imageX,imageY+imageL+5,imageW,imageL);
  image(grainCard,imageX,imageY+2*imageL+5,imageW,imageL);
  image(oreCard,imageX,imageY+3*imageL+10,imageW,imageL);
  image(brickCard,imageX,imageY+4*imageL+10,imageW,imageL);
  image(developmentCard,imageX,imageY+5*imageL+45,imageW,imageL);
}
function draw()
{
    fill(255);
    rect(10,2,40,30,2)
    textSize(20);
    fill(0);
    noStroke();
    text(mouseX,10,15);
    text(mouseY,10,30); 
    /*
    resourceQuantity("lumber",RGX+4*imageW,RGY);
    resourceQuantity("brick",RGX+2*imageW,RGY);
    resourceQuantity("sheep",RGX,RGY);
    resourceQuantity("wheat",RGX+imageW,RGY);
    resourceQuantity("ore",RGX+3*imageW,RGY);
    console.log()*/
    if (resourcesChanged) {
      updateAllResourceQuantities();
      resourcesChanged = false;
    }
    
}
function drawHexGrid(size)
{
  const hexHeight = sqrt(3)*size;
  const hexWidth = 2 *size;
  const centerX = width/2;
  const centerY = height/2;

  const positions = [
    { q: 0, r: 0}, 
    { q: 0.60, r: -0.85 }, 
    { q: 1.15, r: 0},
    { q: 0.60, r:0.85 },
    { q: -0.60, r:0.85 },
    { q: -1.15, r: 0 },
    { q:-0.60, r:-0.85 },
    { q: -1.20, r: -1.75},
    { q: 0, r: -1.75},
    { q: 1.20, r: -1.75},
    { q: 1.80, r: -0.85},
    { q: 2.35, r: 0},
    { q: 1.80, r: 0.85},
    { q: 1.20, r: 1.75},
    { q: 0, r: 1.75},
    { q: -1.2, r: 1.75},
    { q: -1.78, r: 0.87},
    { q: -2.35, r: 0},
    { q:  -1.77, r: -0.87},
  ];
  
  const resources = [
    "desert", "sheep", "wheat", "brick", "ore", "lumber", "wheat", "sheep", "ore",
    "brick", "lumber", "sheep", "wheat", "brick", "ore", "lumber", "sheep", "wheat", "lumber"
  ];

  const numbers = ["2","3","3","4","4","5","5","6","6","8"
  ,"8","9","9","10","10","11","11","12"];

  suffleArray(resources);
  suffleArray(numbers);
  const desertIndex =  resources.indexOf("desert");
  numbers.splice(desertIndex, 0, null);
  
  const resourceImages = {
    desert: dessertImage,
    sheep: sheepImage,
    wheat: wheatImage,
    brick: brickImage,
    ore: oreImage,
    lumber: treeImage
  };
  const numberImages = {
    2 : image2,
    3: image3,
    4: image4,
    5: image5,
    6: image6,
    8: image8,
    9: image9,
    10: image10,
    11: image11,
    12: image12
  };

  for (let i = 0; i < positions.length; i++) {
    const pos = positions[i];
    const resource = resources[i];
    const numb = numbers[i];
    const imageToDraw = resourceImages[resource];
    const numberimageTD = numberImages[numb];
  
    const x = (centerX -50)+ (pos.q * hexWidth * 0.75);
    const y = (centerY -50)+ (pos.r * hexHeight);
    
    hexPosition.push({x, y});
    hexResource.push(resource);
    hexNumber.push(numb);
    
    drawHexagon(x, y, size); 

    if (imageToDraw) {
      image(imageToDraw, x - 137 / 2, y - 137 / 2, 137, 137); // Draw the resource image
      
    }
    if (numberimageTD && resource != "desert" ) {
      image(numberimageTD, x - 45 / 2, y - 20 / 2, 50, 50); // Draw the resource image
    }
    
  }
  
}
function drawHexagon(x, y, size)
{
  fill(255); 
  stroke(0);
  strokeWeight(5);


  beginShape();
  for(let i = 0; i < 6; i++)
  {
    const angle = TWO_PI/6 * i;
    const xOffset = x + sin(angle)*size;
    const yOffset = y + cos(angle)*size;
    //rect(xOffset,yOffset,10,10)
    vertex(xOffset,yOffset);
  }
  endShape(CLOSE);
}
function  suffleArray(array)
{
  for (let i = array.length-1; i > 0; i-- )
  {
    const j =  Math.floor(Math.random()*(i+1));
     [array[i], array[j]] = [array[j], array[i]]; 
  }
}
function drawDice(x, y, size, value) {
  // Draw the dice background
  rectMode(CORNER); 
  fill(120,255,0); 
  stroke(255,0,0); 
  strokeWeight(2);
  rect(x, y, size, size, 10); // Rounded corners

  // Draw the dots based on the value
  fill(0); // Black dots
  stroke(0,0,0);
  strokeWeight(5);
  const dotRadius = size * 0.1; // Adjust dot size based on dice size
  const centerX = x + size / 2;
  const centerY = y + size / 2;
  const offset = size * 0.25; // Offset for positioning dots

  
  if (value === 1) {
    ellipse(centerX, centerY, dotRadius); 
  } else if (value === 2) {
    ellipse(centerX - offset, centerY - offset, dotRadius); 
    ellipse(centerX + offset, centerY + offset, dotRadius); 
  } else if (value === 3) {
    ellipse(centerX, centerY, dotRadius);
    ellipse(centerX - offset, centerY - offset, dotRadius);
    ellipse(centerX + offset, centerY + offset, dotRadius);
  } else if (value === 4) {
     ellipse(centerX-offset,centerY-offset,dotRadius);
     ellipse(centerX-offset, centerY+offset,dotRadius);
     ellipse(centerX+offset, centerY-offset,dotRadius);
     ellipse(centerX+offset, centerY+offset,dotRadius);

  } else if (value === 5) {
    ellipse(centerX, centerY, dotRadius);
    ellipse(centerX - offset, centerY - offset, dotRadius); 
    ellipse(centerX + offset, centerY - offset, dotRadius); 
    ellipse(centerX - offset, centerY + offset, dotRadius); 
    ellipse(centerX + offset, centerY + offset, dotRadius);
  } else if (value === 6) {
    ellipse(centerX - offset, centerY - offset, dotRadius);
    ellipse(centerX + offset, centerY - offset, dotRadius);
    ellipse(centerX - offset, centerY, dotRadius); 
    ellipse(centerX + offset, centerY, dotRadius); 
    ellipse(centerX - offset, centerY + offset, dotRadius);
    ellipse(centerX + offset, centerY + offset, dotRadius);
  }
}
function diceRolled()
{
  const dice1Value = int(random(1, 7)); 
  const dice2Value = int(random(1, 7)); 
  console.log("dice1Value is ",dice1Value);
  console.log("dice2Value is ",dice2Value);
  drawDice(600, 530, 50, dice1Value);
  drawDice(650, 530, 50, dice2Value);

  const diceSum = dice1Value + dice2Value;


  for (let i = 0; i < currentHighlightedHexes.length; i++) {
   
    unhighLightHexagon(currentHighlightedHexes[i].x, currentHighlightedHexes[i].y, 70,0);
}
currentHighlightedHexes = [];

 for(let i = 0; i < hexPosition.length; i++) {
    if(hexNumber[i] == diceSum) {
      console.log("The sum of the dice is:", diceSum);
      console.log("hexPosition[i].x",hexPosition[i].x)
      console.log("hexPosition[i].y",hexPosition[i].y)

      const settlementCount = countAdjecent_Settelment(hexPosition[i].x, hexPosition[i].y);
      if (settlementCount > 0) {
        for (let j = 0; j < settlementCount; j++) {
          resourceTaken(hexResource[i]);
        }
      }
      console.log("The i of the dice is:", i);

      //isDrawingVisible = true
     //highLightHexagon(hexPosition[i].x, hexPosition[i].y, 75,10);
      currentHighlightedHexes.push({ x: hexPosition[i].x, y: hexPosition[i].y });
      
        // Use the x and y values from currentHighlightedHexes to call highLightHexagon
        for (let i = 0; i < currentHighlightedHexes.length; i++) { 
          highLightHexagon(currentHighlightedHexes[i].x, currentHighlightedHexes[i].y, 70,0);
        }
         //highLightHexagon(currentHighlightedHexes[i].x, currentHighlightedHexes[i].y, 75,100);
              
    }
  }
}
function mousePressed() {
  const hexSize = 75; 
  const hexHeight = sqrt(3) * hexSize;
  const hexWidth = 2 * hexSize;
  const centerX = width / 2;
  const centerY = height / 2;

  const positions = [
    { q: 0, r: 0 },
    { q: 0.6, r: -0.85 }, { q: 1.15, r: 0 }, { q: 0.6, r: 0.85 },
    { q: -0.6, r: 0.85 }, { q: -1.15, r: 0 }, { q: -0.6, r: -0.85 },
    { q: -1.2, r: -1.75 }, { q: 0, r: -1.75 }, { q: 1.2, r: -1.75 },
    { q: 1.8, r: -0.85 }, { q: 2.35, r: 0 }, { q: 1.8, r: 0.85 },
    { q: 1.2, r: 1.75 }, { q: 0, r: 1.75 }, { q: -1.2, r: 1.75 },
    { q: -1.78, r: 0.87 }, { q: -2.35, r: 0 }, { q: -1.77, r: -0.87 }
  ];

  for (let pos of positions) {
    const hexX = centerX - 50 + pos.q * hexWidth * 0.75;
    const hexY = centerY - 50 + pos.r * hexHeight;
    const closestEdge = getClosestHexEdge(hexX, hexY, hexSize);

    if (dist(mouseX, mouseY, closestEdge.x, closestEdge.y) < 10) {
      // Check if placement is legal before drawing settlement

     if(endInitialPlacement() || can_Build_Settelment()){

       if (isLegalSettlementPlacement(closestEdge.x, closestEdge.y)) {
        drawSettelement(closestEdge.x, closestEdge.y, "Green");

        totalBrickCollected--;
        totalWoodCollected--;
        totalSheepCollected--;
        totalGrainCollected--;
        resourcesChanged = true;

        settlements.push({ x: closestEdge.x, y: closestEdge.y });
        console.log("Settlement placed at", closestEdge.x, closestEdge.y);
  
  }
        
      } else {
        console.log("Illegal settlement placement");
        fill(255, 0, 0, 100);
        noStroke();
        circle(closestEdge.x, closestEdge.y, 20);
      }
      break;
    
    }
    console.log("Illegal" ,settlements.length," has settlement placement. Now place a road");
    }
  

  let isValidEdge = false;

  for (let pos of positions) {
    const hexX = centerX - 50 + pos.q * hexWidth * 0.75;
    const hexY = centerY - 50 + pos.r * hexHeight;
    const closestEdge = getClosestHexEdge(hexX, hexY, hexSize);
    
    if (dist(mouseX, mouseY, closestEdge.x, closestEdge.y) < 10) {
      isValidEdge = true;
      break;
    }
  }
  if(can_Build_Road()){
  if(mouseX > 10 && mouseX < 680 &&
    mouseY > 50 && mouseY < 650){
if(!(mouseX >= 600 && mouseY >= 530 &&  mouseX <= 700 && mouseY <= 580)){
  if (!isValidEdge) {
    drawRoad(mouseX, mouseY, "Red");
    totalBrickCollected--;
    totalWoodCollected--;
    resourcesChanged = true;
  }
}
    }
  }

  dicePressed();
 

}

function resourceTaken(resourceGiven){

  const RGX = 20;
  const RGY = 690;
  const imageW = 55;
  const imageL = 80;
 if(resourceGiven == "sheep")
 {
  image(sheepCard,RGX,RGY,imageW,imageL);
  totalSheepCollected++;
  resourceQuantity("sheep",RGX,RGY);
 }
 else if (resourceGiven == "wheat")
 {
  image(grainCard,RGX+imageW,RGY,imageW,imageL);
  totalGrainCollected++;
  resourceQuantity("wheat",RGX+imageW,RGY);
 }
 else if (resourceGiven == "brick")
 {
  image(brickCard,RGX+2*imageW,RGY,imageW,imageL);
  totalBrickCollected++;
  resourceQuantity("brick",RGX+2*imageW,RGY);
 }
 else if (resourceGiven =="ore")
 {
  image(oreCard,RGX+3*imageW,RGY,imageW,imageL);
  totalOreCollected++;
  resourceQuantity("ore",RGX+3*imageW,RGY);
 }
 else if (resourceGiven =="lumber")
 {
  image(woodCard,RGX+4*imageW,RGY,imageW,imageL);
  totalWoodCollected++;
  resourceQuantity("lumber",RGX+4*imageW,RGY);
 }

}
function resourceQuantity(resourceName,RGX,RGY){
  const imageW = 55;
  const imageL = 80;
  
  if(resourceName == "wheat"){

  textSize(20);
  fill(0);
  noStroke();
  image(grainCard,RGX,RGY,imageW,imageL);
  text(totalGrainCollected,RGX,RGY+13);

  }
  if(resourceName == "brick"){  
    textSize(20);
    fill(0);
    noStroke();
    image(brickCard,RGX,RGY,imageW,imageL);
    text(totalBrickCollected,RGX,RGY+13);
    }
 if(resourceName == "ore"){  
textSize(20);
fill(0);
noStroke();
image(oreCard,RGX,RGY,imageW,imageL);
text(totalOreCollected,RGX,RGY+13);
}
if(resourceName == "lumber"){  
  

textSize(20);
fill(0);
noStroke();
image(woodCard,RGX,RGY,imageW,imageL);
text(totalWoodCollected,RGX,RGY+13);
 }
 if(resourceName == "sheep"){  
textSize(20);
fill(0);
noStroke();
image(sheepCard,RGX,RGY,imageW,imageL);
text(totalSheepCollected,RGX,RGY+13);
 }

}
function dicePressed(){
  if(mouseIsPressed && mouseX >= 600 && mouseY >= 530 && mouseX <=700 && mouseY <= 580)
  {
   diceRolled();
   console.log("can_Build_Settelment_boo",can_Build_Settelment_boo);
  }
}




//drawing 
function drawSettelement(Sx,Sy,color)
{
  if(color == "Red")
  {
    fill(255,0,0)
  }
  else if(color == "Blue")
  {
    fill(0,0,255)
  }
  else if(color == "Green")
  {
    fill(0,200,100)
  }
  else if(color == "Black")
  {
    fill(0,0,0)
  }
  //fill(255,0,0)
  stroke(255);

  stroke('lime');
  strokeWeight(3);
  
  // Main house structure
  beginShape();
  // Start from top point
  vertex(Sx, Sy-25);
  // Right top diagonal
  vertex(Sx+15, Sy-15);
  // Right vertical
  vertex(Sx+15, Sy+7);
  // Right bottom leg
  vertex(Sx+10, Sy+20);
  // Bottom horizontal
  vertex(Sx-10, Sy+20);
  // Left bottom leg
  vertex(Sx-15, Sy+7);
  // Left vertical
  vertex(Sx-15, Sy-15);
  // Back to top point to close shape
  vertex(Sx, Sy-25);
  endShape();
  
  // Middle vertical line (drawn separately since it's internal)
  line(Sx, Sy-25, Sx, Sy-5);

  line(Sx, Sy-5, Sx+15, Sy+7);//done
  line(Sx, Sy-5, Sx-15, Sy+7);

  rect(Sx-2,Sy+10,5,10)

}
function getClosestHexEdge(x, y, size) {
  let closest = { x: 0, y: 0 }, minDist = Infinity;
  for (let i = 0; i < 6; i++) {
    const angle = TWO_PI / 6 * i;
    const edgeX = x + sin(angle) * size;
    const edgeY = y + cos(angle) * size;
    const d = dist(mouseX, mouseY, edgeX, edgeY);
    if (d < minDist) {
      minDist = d;
      closest = { x: edgeX, y: edgeY };
    }
  }
  return closest;
}
function drawCity(Sx,Sy,color)
{
  if(color == "Red")
  {
    fill(255,0,0)
  }
  else if(color == "Blue")
  {
    fill(0,0,255)
  }
  else if(color == "Green")
  {
    fill(0,200,100)
  }
  else if(color == "Black")
  {
    fill(0,0,0)
  }
  //fill(255,0,0)
  stroke(255);

  stroke('lime');
  strokeWeight(3);
  

  const toleft = -15;
  // Main house structure
  beginShape();
  // Start from top point
  vertex(Sx+toleft, Sy-25);
  // Right top diagonal
  vertex(Sx+15+toleft, Sy-15);
  // Right vertical
  vertex(Sx+15+toleft, Sy+7);
  // Right bottom leg
  vertex(Sx+10+toleft, Sy+20);
  // Bottom horizontal
  vertex(Sx-10+toleft, Sy+20);
  // Left bottom leg
  vertex(Sx-15+toleft, Sy+7);
  // Left vertical
  vertex(Sx-15+toleft, Sy-15);
  // Back to top point to close shape
  vertex(Sx+toleft, Sy-25);
  endShape();

  
  beginShape();
  const toright = 15;
  // Start from top point
  vertex(Sx+toright, Sy-25);
  // Right top diagonal
  vertex(Sx+15+toright, Sy-15);
  // Right vertical
  vertex(Sx+15+toright, Sy+7);
  // Right bottom leg
  vertex(Sx+10+toright, Sy+20);
  // Bottom horizontal
  vertex(Sx-10+toright, Sy+20);
  // Left bottom leg
  vertex(Sx-15+toright, Sy+7);
  // Left vertical
  vertex(Sx-15+toright, Sy-15);
  // Back to top point to close shape
  vertex(Sx+toright, Sy-25);
  endShape();
  
  // Middle vertical line (drawn separately since it's internal)
  line(Sx+toleft, Sy-25, Sx+toleft, Sy-5);

  line(Sx+toleft, Sy-5, Sx+15+toleft, Sy+7);//done
  line(Sx+toleft, Sy-5, Sx-15+toleft, Sy+7);

  rect(Sx+toleft-2,Sy+10,5,10)



  line(Sx+toright, Sy-25, Sx+toright, Sy-5);

  line(Sx+toright, Sy-5, Sx+15+toright, Sy+7);//done
  line(Sx+toright, Sy-5, Sx-15+toright, Sy+7);

  rect(Sx-2+toright,Sy+10,5,10)


  rect(Sx-5,Sy-38,10,20)
}
function drawRoad(Sx,Sy,color)
{
  
  
      
  if(color == "Red")
  {
    fill(255,0,0)
  }
  else if(color == "Blue")
  {
    fill(0,0,255)
  }
  else if(color == "Green")
  {
    fill(0,200,100)
  }
  else if(color == "Black")
  {
    fill(0,0,0)
  }
  function isWithinRange(value, array, margin) {
    return array.some(item => Math.abs(item - value) <= margin);
  }
  

  let angle ;
 
const p5p2XVals = get_p5p2XVals();
const p0p3XVals = get_p0p3XVals();
const p1p4XVals = get_p1p4XVals();

const p5p2YVals = get_p5p2YVals();
const p0p3YVals = get_p0p3YVals();
const p1p4YVals = get_p1p4YVals();

console.log("angle before" ,angle );
console.log("p5p2XVals" ,p5p2XVals );
console.log("p0p3XVals" ,p0p3XVals );
  console.log("SX " ,Sx );
  console.log("Sy " ,Sy );
  if(isWithinRange(Sx,p5p2XVals,5) && isWithinRange(Sy,p5p2YVals,5)){
    angle = 1.5;
  }
  else if(isWithinRange(Sx,p1p4XVals,5) || isWithinRange(Sy,p1p4YVals,5)){
    angle = 3;
  }
  else if(isWithinRange(Sx,p0p3XVals,10) && isWithinRange(Sy,p0p3YVals,10)){
    angle = 0;
  }

  const road = {
    start: { x: Sx, y: Sy },
    end: { x: Sx + 80 * cos(PI/angle), y: Sy + 80 * sin(PI/angle) },
    color: color
  };


  roads.push(road);
  console.log("angle after" ,angle );

  push();
  stroke(255);
  translate(Sx, Sy);
  rotate(PI/angle);
  rect(-5, -25, 10, 70, 10);
  stroke('lime');
  strokeWeight(3);
  pop();
}



function highLightHexagon(x, y, size,opacity) {
  fill(255, 255, 0, opacity);
  stroke(255, 255, 0);
  strokeWeight(2);
  beginShape();
  for(let i = 0; i < 6; i++) {
  const angle = TWO_PI/6 * i;
  const xOffset = x + sin(angle)*size;
  const yOffset = y + cos(angle)*size;
  vertex(xOffset, yOffset);
  }
  endShape(CLOSE);
  } 

function unhighLightHexagon(x, y, size,opacity) {
  fill(255, 0, 0, opacity);
  stroke(0, 0, 0);
  strokeWeight(2);
  beginShape();
  for(let i = 0; i < 6; i++) {
  const angle = TWO_PI/6 * i;
  const xOffset = x + sin(angle)*size;
  const yOffset = y + cos(angle)*size;
  vertex(xOffset, yOffset);
  }
  endShape(CLOSE);
  } 

function endInitialPlacement() {
  if(settlements.length < 2){
     return initialPlacement = true;
  }else { 
    return initialPlacement = false;
   }
}

//G Code
     //  \= mid;

function isLegalSettlementPlacement(x, y) {

  for (let settlement of settlements) {
    const distance = dist(x, y, settlement.x, settlement.y);
    if (distance < 85) { // Using hexSize as minimum distance
      console.log("Too close to another settlement",dist(x, y, settlement.x, settlement.y));
      return false;
    }
  }

  // During initial placement, no need to check for road connection
  if (initialPlacement) {
    return true;
  }

  // Check if connected to a road (except during initial placement)
  let hasConnectedRoad = false;
  for (let road of roads) {
    const distToRoadStart = dist(x, y, road.start.x, road.start.y);
    const distToRoadEnd = dist(x, y, road.end.x, road.end.y);
    console.log("roads",roads);
    console.log("distend",distToRoadEnd );
    console.log("diststart",distToRoadStart )
    if (distToRoadStart < 45 || distToRoadEnd < 45) {
      hasConnectedRoad = true;
      break;
    }
  }

  if (!hasConnectedRoad && !initialPlacement) {
    console.log("Must be connected to a road");
    return false;
  }

  return true;
}

function calculateHexagonEdges(centerX, centerY, size) {
  const edges = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    const x = centerX + size * Math.cos(angle);
    const y = centerY + size * Math.sin(angle);
    edges.push({ x: Math.round(x), y: Math.round(y) });
  }
  return edges;
}

function generateAllHexagonEdges() {
  const allEdges = [];
  const hexSize = 75; // Adjust this based on your hexagon size
  const centerX = width / 2;
  const centerY = height / 2;
  
  const positions = [
    { q: 0, r: 0 },
    { q: 0.6, r: -0.85 },
    { q: 1.15, r: 0 },
    { q: 0.6, r: 0.85 },
    { q: -0.6, r: 0.85 },
    { q: -1.15, r: 0 },
    { q: -0.6, r: -0.85 },
    { q: -1.2, r: -1.75 },
    { q: 0, r: -1.75 },
    { q: 1.2, r: -1.75 },
    { q: 1.8, r: -0.85 },
    { q: 2.35, r: 0 },
    { q: 1.8, r: 0.85 },
    { q: 1.2, r: 1.75 },
    { q: 0, r: 1.75 },
    { q: -1.2, r: 1.75 },
    { q: -1.78, r: 0.87 },
    { q: -2.35, r: 0 },
    { q: -1.77, r: -0.87 }
  ];

  for (let pos of positions) {
    const hexX = centerX - 50 + pos.q * hexSize * 1.5;
    const hexY = centerY - 50 + pos.r * hexSize * Math.sqrt(3);
    const edges = calculateHexagonEdges(hexX, hexY, hexSize);
    allEdges.push(edges);
  }

  return allEdges;
}


function get_p5p2XVals() {
  const result = [];
  const allEdges = generateAllHexagonEdges()
  for (let i = 0; i < allEdges.length; i++) {
    const subArray = allEdges[i];
    if (subArray.length >= 6) {
      result.push(
         subArray[2].x,
         subArray[5].x
      );
    }
  }
  return result;
}
 function get_p0p3XVals() {
  const result = [];
  const allEdges = generateAllHexagonEdges()
  for (let i = 0; i < allEdges.length; i++) {
    const subArray = allEdges[i];
    if (subArray.length >= 6) {
      result.push(
         subArray[0].x, subArray[3].x
      );
    }
  }
  return result;
}
 function get_p1p4XVals() {
  const result = [];
  const allEdges = generateAllHexagonEdges()
  for (let i = 0; i < allEdges.length; i++) {
    const subArray = allEdges[i];
    if (subArray.length >= 6) {
      result.push(
         subArray[1].x,
         subArray[4].x
      );
    }
  }
  return result;
}
  function get_p5p2YVals() {
  const result = [];
  const allEdges = generateAllHexagonEdges()
  for (let i = 0; i < allEdges.length; i++) {
    const subArray = allEdges[i];
    if (subArray.length >= 6) {
      result.push(
         subArray[2].y,
         subArray[5].y
      );
    }
  }
  return result;
}
 function get_p0p3YVals() {
  const result = [];
  const allEdges = generateAllHexagonEdges()
  for (let i = 0; i < allEdges.length; i++) {
    const subArray = allEdges[i];
    if (subArray.length >= 6) {
      result.push(
       subArray[0].y,
         subArray[3].y
      );
    }
  }
  return result;
}
 function get_p1p4YVals() {
  const result = [];
  const allEdges = generateAllHexagonEdges()
  for (let i = 0; i < allEdges.length; i++) {
    const subArray = allEdges[i];
    if (subArray.length >= 6) {
      result.push(
         subArray[1].y,
       subArray[4].y
      );
    }
  }
  return result;
}




//Check if we have enough resourcess
function can_Build_Settelment(){

  console.log("Resources",totalSheepCollected,totalGrainCollected,totalBrickCollected,
  totalWoodCollected);
  if(totalGrainCollected > 0 &&
    totalBrickCollected > 0&&
    totalWoodCollected > 0  &&
    totalSheepCollected > 0 ){
     return  can_Build_Settelment_boo = true;
    }
    else {
      return can_Build_Settelment_boo = false;
    }
}

function can_Build_Road(){

  if(totalBrickCollected > 0 &&
      totalWoodCollected > 0 ){
     return  can_Build_Road_boo = true;
    }
    else {
      return can_Build_Road_boo = false;
    }
}


//check for the settelment before giving resources 
function countAdjecent_Settelment(hexX,hexY){
  let count = 0;

  for(let settelment of settlements){
    if(dist(hexX,hexY,settelment.x,settelment.y)<80){
      count++;
    }
  }
  return count;
}


function updateAllResourceQuantities() {
  const RGX = 20;
  const RGY = 690;
  const imageW = 55;
  const imageL = 80;
  resourceQuantity("wheat", RGX + imageW, RGY);
  resourceQuantity("brick", RGX + 2 * imageW, RGY);
  resourceQuantity("ore", RGX + 3 * imageW, RGY);
  resourceQuantity("lumber", RGX + 4 * imageW, RGY);
  resourceQuantity("sheep", RGX, RGY);
}