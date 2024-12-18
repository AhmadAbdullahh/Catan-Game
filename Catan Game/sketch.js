// sketch.js
// Canvas
// AME 230
//
let treeImage, dessertImage, brickImage, oreImage, wheatImage, sheepImage;
let image2,image3,image4,image5,image6,image8,image9,image10,image11,image12;


function preload() {

  treeImage = loadImage("resources/tree2.png");//done
  dessertImage = loadImage("resources/dessert.png");
  brickImage = loadImage("resources/brick3.png");//done
  oreImage = loadImage("resources/oref.png");//done
  wheatImage = loadImage("resources/wheat.png");
  sheepImage = loadImage("resources/sheep1.png");//done

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

}

function setup() {
  createCanvas(800, 800);
  background(230,190,100);
  drawHexGrid(75);
  //allSet(75)







}
function draw()
{
  if(mouseIsPressed && mouseX >= 600 && mouseY >= 530 && mouseX <=700 && mouseY <= 580)
  {
   diceRolled();
   
  }
  
    fill(255);
    rect(10,2,40,30,2)
    textSize(20);
    fill(0);
    noStroke();
    text(mouseX,10,15);
    text(mouseY,10,30);

  
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
    
    drawHexagon(x, y, size); // Draw the hexagon
    //allSet(x,y,75)
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
  fill(120,255,0); // White dice
  stroke(255,0,0); // Black border
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
  const dice1Value = int(random(1, 7)); // Random number between 1 and 6
  const dice2Value = int(random(1, 7)); // Random number between 1 and 6
  drawDice(600, 530, 50, dice1Value);
  drawDice(650, 530, 50, dice2Value);
}
function drawSettelment(Sx,Sy)
{
  fill(255,0,0)
  stroke(255);
  rectMode(CENTER);
  triangle(Sx - 28, Sy - 18, Sx + 28, Sy - 18, Sx, Sy - 40);
  rect(Sx, Sy, 30, 30);
  stroke(0);
  fill(0)
  rect(Sx + 1, Sy + 5, 3, 12);
}

function allSet(x,y,size)
{
  
  for(let i = 0; i < 6; i++)
  {
    const angle1 = TWO_PI/6 * i;
    const xCorner = x + sin(angle1)*size;
    const yCorner = y + cos(angle1)*size;
   
    drawSettelment(xCorner,yCorner);
  }
}
function mousePressed() {
  const hexSize = 75; // Same size used in `drawHexGrid`
  const hexHeight = sqrt(3) * hexSize;
  const hexWidth = 2 * hexSize;
  const centerX = width / 2;
  const centerY = height / 2;

  // Positions array matches `drawHexGrid` positions
  const positions = [
    { q: 0, r: 0 },
    { q: 0.60, r: -0.85 },
    { q: 1.15, r: 0 },
    { q: 0.60, r: 0.85 },
    { q: -0.60, r: 0.85 },
    { q: -1.15, r: 0 },
    { q: -0.60, r: -0.85 },
    { q: -1.20, r: -1.75 },
    { q: 0, r: -1.75 },
    { q: 1.20, r: -1.75 },
    { q: 1.80, r: -0.85 },
    { q: 2.35, r: 0 },
    { q: 1.80, r: 0.85 },
    { q: 1.20, r: 1.75 },
    { q: 0, r: 1.75 },
    { q: -1.2, r: 1.75 },
    { q: -1.78, r: 0.87 },
    { q: -2.35, r: 0 },
    { q: -1.77, r: -0.87 }
  ];

  // Iterate through all hexagon positions
  for (let i = 0; i < positions.length; i++) {
    const pos = positions[i];
    const x = (centerX - 50) + (pos.q * hexWidth * 0.75);
    const y = (centerY - 50) + (pos.r * hexHeight);

    if (isMouseNearHexEdge(x, y, hexSize)) {
      allSet(x, y, hexSize); // Call allSet when near an edge
      break; // Stop checking once a match is found
    }
  }
}

function isMouseNearHexEdge(hexX, hexY, size) {
  const threshold = 10; // Allowable distance from edge
  for (let i = 0; i < 6; i++) {
    const angle1 = TWO_PI / 6 * i;
    const angle2 = TWO_PI / 6 * (i + 1);

    const x1 = hexX + sin(angle1) * size;
    const y1 = hexY + cos(angle1) * size;

    const x2 = hexX + sin(angle2) * size;
    const y2 = hexY + cos(angle2) * size;

    // Check if the mouse is close to the edge (line segment)
    const d = distToSegment(mouseX, mouseY, x1, y1, x2, y2);
    if (d < threshold) {
      return true;
    }
  }
  return false;
}

// Helper to calculate the distance from a point to a line segment
function distToSegment(px, py, x1, y1, x2, y2) {
  const l2 = (x2 - x1) ** 2 + (y2 - y1) ** 2; // Length squared of the segment
  if (l2 == 0) return dist(px, py, x1, y1); // If the segment is a point
  let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
  t = max(0, min(1, t)); // Clamp t to the segment
  const projX = x1 + t * (x2 - x1);
  const projY = y1 + t * (y2 - y1);
  return dist(px, py, projX, projY);
}



