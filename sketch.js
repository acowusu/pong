function setup() {
  createCanvas(400, 400);
  // background(200)
}

var circleposition = [200, 200];
var agentpadel = [360, 200];
var circlevelocity = [Math.random()*5
, Math.random()*5];
var speed = 1;
var humanscore = 0;
agentscore = 0;
gameisplaying = false;
function keyPressed() {
  if (keyCode === ENTER) {
    gameisplaying = true;
    humanscore = 0;
    agentscore = 0;
  }
}
function handlecollisions() {
  if (circleposition[0] < 60) {
    circlevelocity = [-circlevelocity[0]*1.01, circlevelocity[1]*1.01];
    if (Math.abs(circleposition[1] - mouseY) > 55) {
      console.log("miss");
      circleposition = [200, 200];

      agentscore++;
    }
    console.log("triggered08");
  }
  if (circleposition[0] > 340) {
    circlevelocity = [-circlevelocity[0]*1.01, circlevelocity[1]*1.01];
    if (Math.abs(circleposition[1] - agentpadel[1]) > 55) {
      console.log("miss");
      console.log(circleposition[1]);
      console.log(agentpadel[1])
      humanscore++;
    }
    console.log("triggered0");
  }
  if (circleposition[1] > 380) {
    circlevelocity = [circlevelocity[0]*1.01, -circlevelocity[1]*1.01]; // add some uncertainty to the direction of the refraction
  }
  if (circleposition[1] < 40) {
    circlevelocity = [circlevelocity[0]*1.01, -circlevelocity[1]*1.01];
  }
}
function draw() {
  // background(220);
  text("press enter to play", 150, 200);

  if (gameisplaying) {
    background(220);

    text("the score is " + humanscore + ":" + agentscore, 10, 60);

  
    handlecollisions() 

    if (humanscore == 5) {
      background(0, 255, 20);

      text("You win", 100, 100);
      gameisplaying = false;
    } else if (agentscore == 5) {
      background(255, 0, 20);

      text("Computer wins", 100, 100);
      gameisplaying = false;
    }
    //
    // console.log(circlevelocity)

    circleposition = drawball(circlevelocity, circleposition, 1);
    drawpadel([20, mouseY - 40]);
    drawpadel(agentpadel);
    // speed = Math.abs(speed)

    let spd =
      circleposition[1] < agentpadel[1] + 40 ? -humanscore - 1 : humanscore + 1;
    agentpadel = [agentpadel[0], agentpadel[1] + spd];
  }

  // agentpadel = movepadel(agentpadel, circleposition, 1, 10)
}

function drawball(velocity, position, timestep) {
  position = newposition(position, velocity, timestep);
  circle(position[0], position[1], 50);
  return position;
}

function drawpadel(position) {
  let l = 80;
  let w = 20;

  quad(
    position[0],
    position[1],
    position[0],
    position[1] + l,
    position[0] + w,
    position[1] + l,
    position[0] + w,
    position[1]
  );

  return position;
}

function newposition(position, velocity, timestep) {
  return position.map(function callback(currentposition, index) {
    // Return element for new_array
    return timestep * velocity[index] + currentposition;
  }, this);
}

  //   if(ballposition[1]> paddleposition[1]){
  //       console.log( newposition(paddleposition, [0,speed],timestep))
  // //   }else
  //     if (ballposition[1]< paddleposition[1]){
  //       speed = -Math.abs(speed)
  //     }else {
  //       speed = 0
  //     }
  //    return [paddleposition[0], paddleposition[1]+ speed]

