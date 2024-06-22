let posPlayer = ['',''],
    posEnemy = ['',''],
    posBall = ['',''],
    vBall = ['',''];
let t = 0,
    ptsP = 0,
    ptsE = 0;

function setup() {
  createCanvas(600, 400);
  bgMusic.loop(0, 1, 0.25);
  posPlayer[0] = 25; posPlayer[1] = 180;
  posEnemy[0] = 600-25; posEnemy[1] = 180;
  posBall = [300, 200];
  vBall = [2*random([-1, 1]), 2*random([-1, 1])];
  font = loadFont('Copse-Regular.ttf');
  //console.log(vBall);
}

function draw() {
  background(30);
  let ptsSizeP = ptsP.toString().length -1,
      ptsSizeE = ptsE.toString().length -1;
  //console.log(ptsSizeP + ' and ' + ptsSizeE);
  
  PlayerMovement();
  BallMovement();
  EnemyMovement();
  
  fill(45);
  stroke(60);
  rect(43, 20, 38+23*ptsSizeP, 50);
  rect(600-43, 20, -38-23*ptsSizeE, 50);
  
  fill('white');
  textFont(font);
  textSize(40);
  textStyle(BOLD);
  textAlign(LEFT);
  text(ptsP, 50, 60);
  textAlign(RIGHT);
  text(ptsE, 600-50, 60);
}

function BallMovement() {
  posBall[0] += vBall[0];
  posBall[1] += vBall[1];
  rect(posBall[0]-10, posBall[1]-10, 20, 20);  
  
  let lhsHit = posBall[0]-10 < 0,
      rhsHit = posBall[0]+10 > 600;
  
  if (lhsHit || rhsHit) {
    vBall[0] *= -1;
    if (lhsHit) {
      ptsE += 1;
    } else { ptsP += 1 }
    pointSound.play();
    //console.log(ptsP + ' x ' + ptsE);
  }
  if (posBall[1]-10 < 0  ||  posBall[1]+10 > 400) {
    vBall[1] *= -1;
  }
  
  let playerHit = collideRectRect(posPlayer[0]-5, posPlayer[1]-40, 10, 80, posBall[0]-10, posBall[1]-10, 20, 20);
  let enemyHit = collideRectRect(posEnemy[0]-5, posEnemy[1]-40, 10, 80, posBall[0]-10, posBall[1]-10, 20, 20);
  
  if (playerHit || enemyHit) {
    if (t < 1) {
      if (playerHit) {ping.play()} else {pong.play()}
      t += 1;
      vBall[0] *= -1;
    } else {
      if (playerHit) {
        posBall[0] += 1;
        vBall[0] = 1.5;
      } else {
        posBall[0] += -1;
        vBall[0] = -1.5;
      }
    }
  } else {t = 0}
}

function PlayerMovement() {
  if (keyIsDown(UP_ARROW) && !keyIsDown(DOWN_ARROW)) {
    posPlayer[1] += -1.5;
    //console.log("yoo " + posPlayer[1]);
  }
  if (keyIsDown(DOWN_ARROW) && !keyIsDown(UP_ARROW)) {
    posPlayer[1] += 1.5;
    //console.log("yee " + posPlayer[1]);
  }
  rect(posPlayer[0]-5, posPlayer[1]-40, 10, 80)
}

function EnemyMovement() {
  let way = 0;
  if (posBall[1] != posEnemy[1]) {
    way = abs(posBall[1] - posEnemy[1])/(posBall[1] - posEnemy[1])
  }
  
  let speed = 1.5;
  
  if (abs(posBall[1] - posEnemy[1]) <= 25) {
    speed = 0
  }
  
  posEnemy[1] += way*speed;
  
  rect(posEnemy[0]-5, posEnemy[1]-40, 10, 80)
}

function preload() {
  pointSound = loadSound('point.mp3');
  ping = loadSound('ping.mp3');
  pong = loadSound('pong.mp3');
  bgMusic = loadSound('bg_music.mp3');
}