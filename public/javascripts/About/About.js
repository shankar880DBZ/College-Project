var c = document.getElementById("rain");

c.width = window.innerWidth;
c.height = window.innerHeight;

var ctx = c.getContext("2d");

let rainDrops = [];
let elements = document.getElementsByClassName("raindrop");
let length = 30;
let speed = 15;

let angle = (90 * Math.PI) / 180;
let angleSin = Math.sin(angle);
let angleCos = Math.cos(angle);

let spawnInterval = setInterval(newDrop, 50);

window.addEventListener("resize", onResize);

document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    clearInterval(spawnInterval);
  } else {
    spawnInterval = setInterval(newDrop, 50);
  }
});

function RainDrop(x, y, angle) {
  this.x = x;
  this.y = y;
  rainDrops.push(this);
}

function newDrop() {
  for (let x = 0; x < 50; x++) {
    new RainDrop(Math.random() * c.width, -40 - 100 * Math.random(), angle);
  }
}

update();

function update() {
  for (let x = 0; x < rainDrops.length; x++) {
    let drop = rainDrops[x];
    drop.x += speed * angleCos;
    drop.y += speed * angleSin;

    drop.endX = drop.x + length * angleCos;
    drop.endY = drop.y + length * angleSin;

    if (drop.y > c.height) {
      rainDrops.splice(x, 1);
      x--;
    }
  }

  //checkCollisions();
  draw();
}

function draw() {
  ctx.clearRect(0, 0, c.width, c.height);

  ctx.lineWidth = 1;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#0984e3";

  let gradient = ctx.createLinearGradient(0, 0, 0, c.height);

  gradient.addColorStop(0, "#00a8ff");
  gradient.addColorStop(0.6, "#00a8ff");
  gradient.addColorStop(1, "white");

  ctx.strokeStyle = gradient;

  ctx.beginPath();
  for (let i = 0; i < rainDrops.length; i++) {
    ctx.moveTo(Math.floor(rainDrops[i].x), Math.floor(rainDrops[i].y));
    ctx.lineTo(Math.floor(rainDrops[i].endX), Math.floor(rainDrops[i].endY));
  }
  ctx.stroke();

  clearRegions();
  window.requestAnimationFrame(update);
}

function onResize() {
  c.width = window.innerWidth;
  c.height = window.innerHeight;
}

function clearRegions() {
  ctx.globalCompositeOperation = "destination-out";

  for (let i = 0; i < elements.length; i++) {
    let boundingBox = elements[i].getBoundingClientRect();
    let yDistanceBottom = c.height - boundingBox.bottom;
    let yDistanceTop = c.height - boundingBox.top;

    let bottomLeftX =
      boundingBox.left + yDistanceBottom * Math.tan(Math.PI / 2 - angle);
    let bottomRightX =
      boundingBox.right + yDistanceBottom * Math.tan(Math.PI / 2 - angle);

    let bottomLeftX2 =
      boundingBox.left + yDistanceTop * Math.tan(Math.PI / 2 - angle);
    let bottomRightX2 =
      boundingBox.right + yDistanceTop * Math.tan(Math.PI / 2 - angle);

    //From bottom of element to edge of page
    ctx.beginPath();
    ctx.moveTo(boundingBox.left, boundingBox.bottom);
    ctx.lineTo(bottomLeftX, c.height);
    ctx.lineTo(bottomRightX, c.height);
    ctx.lineTo(boundingBox.right, boundingBox.bottom);
    ctx.closePath();
    ctx.fill();

    //From top of element to edge of page
    ctx.beginPath();
    ctx.moveTo(boundingBox.left, boundingBox.top);
    ctx.lineTo(bottomLeftX2, c.height);
    ctx.lineTo(bottomRightX2, c.height);
    ctx.lineTo(boundingBox.right, boundingBox.top);
    ctx.closePath();
    ctx.fill();
  }

  ctx.globalCompositeOperation = "source-over";
}

// Button Action 
let btn1 = document.querySelector('.Learn1');
let option1 = document.querySelector('#option1');

let  btn2 = document.querySelector('.Learn2');
let option2 = document.querySelector('#creater');

let btn3 = document.querySelector('.Learn3');
let option3 = document.querySelector('#option3');
var flag = 0 ;

btn1.addEventListener('click',function(){
  if(flag == 0)
  {
    option1.style.display='block';
    
    flag = 1;
  }
  else 
  {
    flag = 1;
    option1.style.display="none";
    flag = 0;
  }
})


btn2.addEventListener('click',function(){
    if(flag == 0){
      // option1.style.display='none';
        option2.style.display = "block";
        flag = 1;
    }
    else 
    {
        flag = 1;
        option2.style.display = "none";
        flag = 0;
    }


});

btn3.addEventListener('click',function(){
  if(flag == 0){
      option3.style.display = "block";
      flag = 1;
  }
  else 
  {
      flag = 1;
      option3.style.display = "none";
      flag = 0;
  }


});


