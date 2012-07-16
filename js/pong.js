// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;
document.body.appendChild(canvas);


var timer = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);



// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "img/bg.png";


//datos para la posicion de los sticks
var stickL = {};
var stickR = {};
var ball = {};
//Y position
stickR.y = 100;
stickL.y = 100;
ball.x = 100;
ball.y = 100;
ball.len = 20;
//Velocidad
stickR.speed = 1.5;
stickL.speed = 1.5;
ball.speedX = 1;
ball.speedY = 0.2;
//lenght
stickR.len = 100;
stickL.len = 100;
//--- --- --- ---


//Param valor a sumar a la Y del stick
function moveL(mov) {
	if((stickL.y+stickL.len < 400 && mov > 0) || (stickL.y > 0 && mov < 0) ){
		stickL.y += mov*stickL.speed;
	}

}
function moveR(mov) {
	if((stickR.y+stickR.len < 400 && mov > 0) || (stickR.y > 0 && mov < 0) ){
		stickR.y += mov*stickL.speed;
	}

}

sentido = 'RL';
//Mover bola
function moveBall(){

	//choque stickL => sentido == 'RL'
	if(ball.x <= 20 && (ball.y+20 >= stickL.y && ball.y <= stickL.y + stickL.len)){
		//cambio de sentido
		sentido = 'LR';
		ball.speedY = Math.random();		
		//cambio de signo
		if(Math.random() < 0.5){
			ball.speedY = -ball.speedY;
		}

	}	

	//choque stickR => sentido == 'LR'
	if(ball.x >=560 && (ball.y+20 >= stickR.y && ball.y <= stickR.y + stickR.len)){
		//cambio de sentido
		sentido = 'RL';
		ball.speedY = Math.random();
		//cambio de signo
		if(Math.random() < 0.5){
			ball.speedY = -ball.speedY;
		}
	}	

	if(sentido == 'LR' && ball.x + ball.len < 600){ 		// <-------
		ball.x += ball.speedX;
	}else if(sentido == 'RL' && ball.x > 0){ 	// ------>
		ball.x -= ball.speedX;
	}


	//rebote arriba y abajo
	if(ball.y <= 1 || ball.y >= 378){
		ball.speedY = -ball.speedY;
	}



	if(ball.y + ball.speedY > 0 && ball.y + ball.speedY <= 380 && (ball.x > 40 && ball.x < 580)){
		ball.y += ball.speedY;
	}}







// Update game objects
var update = function () {

	if (38 in keysDown) { // Player holding up
		moveL(-1);
		moveR(-1);
	}
	if (40 in keysDown) { // Player holding down
		moveL(+1);
		moveR(+1);
	}
}



// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}


	//Stick L
	ctx.beginPath();
        ctx.rect(10, stickL.y, 20, stickL.len);
        ctx.fillStyle = 'white';
        ctx.fill();
        //ctx.lineWidth = 1;
        //ctx.strokeStyle = '';
        //ctx.stroke();
	
	//Stick R
	ctx.beginPath();
        ctx.rect(570, stickR.y, 20, stickR.len);
        ctx.fillStyle = 'white';
        ctx.fill();
        //ctx.lineWidth = 1;
        //ctx.strokeStyle = '';
        //ctx.stroke();
moveBall();
	//Ball
	ctx.beginPath();
        ctx.rect(ball.x, ball.y, 20, 20);
        ctx.fillStyle = 'white';
        ctx.fill();
        //ctx.lineWidth = 1;
        //ctx.strokeStyle = '';
        //ctx.stroke();


/*		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "34px Helvetica";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText("StickL (" + stickL.y + ")" , 170, 200);

	ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "34px Helvetica";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText("StickL+len (" + (stickL.y+stickL.len) + ")" , 170, 250);

	ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "34px Helvetica";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText("ball.y (" + (ball.y) + ")" , 170, 300);

	ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "34px Helvetica";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText("ball.speedY (" + (ball.speedY) + ")" , 170, 320);


*/

}




// The main game loop
var main = function () {

	

	var now = Date.now();
	var delta = now - then;

	timer++;
	//$('#timer').html(timer + "-" + stickL.y );	
	

	update();
	render();
	then = now;
	
};

// Let's play this game!
//reset();
var then = Date.now();
setInterval(main, 1); // Execute as fast as possible
