/*
Name: Diana Solis
Creative Coding Section A Fall 2022

Final Project: High Score - Game
Game: Mi Mamá's Cleaning 

Description: Mi Mamá's Cleaning is a cozy puzzle game in homage to my
Mexican mother's constant cleaning throughout my entire childhood. With a similar
coziness and simplicity to other puzzle games like Unpacking and Little to the Left,
this game uses unique p5 libraries such as the p5.sound library to create tasks
for the users to complete. Users follow instructions given throughout each task, each with their own game mechanics
to complete the cleaning tasks given. This game brings a cozy sentimental narrative
while still bringing the high score aspect of completing a game, with sounds incorporated
throughout the game. 

References used to complete the project:
1. 7.4: Adding and Removing Objects - p5.js Tutorial The Coding Train
2. 17.1: Loading and Playing - p5.js Sound Tutorial - The Coding Train

Title screen is drawn by me. Font is Core Gungseo (https://www.fontspring.com/fonts/s-core/core-gungseo)


*/

let scene = 0; // allows for the player to switch between screens - easiest way to do this without 
let title, hugIllustration, taskOneDishes; // images
let backgroundmusic, mic; // sound
let corefont;

var yuck = [];

function preload(){ // Loads images and other necessary items
	
	title = loadImage('data/TitleScreen_FinalProject_CC.png');
	hugIllustration = loadImage('data/Instructions_Illustration.png');
	taskOneDishes = loadImage ('data/TaskOne_Screen_FinalProject.png');
	
	corefont = loadFont('data/Core Gungseo W01 Regular.ttf');

	backgroundmusic = loadSound ('data/PerdonMadrecita.mp4');
	backgroundmusic.setVolume(0.01);
	
}

function setup(){
	createCanvas(1325,800);

	backgroundmusic.loop();
	backgroundmusic.setVolume(0.1);
	
	mic = new p5.AudioIn();
	mic.start();
	
	for (let x = 300; x< width; x+=100){
		for (var i = 0; i < 100; i++){
			yuck[i] = new Yuck();
	}
	}
	
}

function draw(){
	
	if (scene === 0){
		startPage();
	} else if (scene === 1){
		instructions();
	} else if (scene === 2){
		taskOne();
	} else if (scene === 3){
		taskTwo();
	} else if (scene === 4){
		taskCompleted();
	}
}

function startPage(){ // scene = 0
	background(title);
	
	textFont(corefont);
	textSize(50);
	fill (136, 155, 174);
	text ("press enter to begin tasks.", 100, 700);
	text ("press shift for instructions.", 100, 750);
}

function instructions(){ // scene = 1
	background(253, 253, 150);
	
	image (hugIllustration, 400, 25, width/2, height/2);
	

	textFont(corefont);
	textSize(30);
	fill(136,155,174);
	// text ('Press Backspace to return back to home screen.', 300, 100); // Right now - I haven't been able to get the keyCode to get to go back to the home screen from the instruction screen.
	text('for task one, use your microphone as a way to clean the dishes.', 200, 500);
	text('the higher you talk, the dirty germs will go away.', 200, 550);
	text('keep talking to help your mamá get the dishes clean.', 200, 600);
	text('for task two, use your mouse to put away everything into place.', 200, 650);
	text('help your mamá finish cleaning your home.', 200, 700);
}

function taskOne(){
	background (taskOneDishes);
	
	for (var i =0; i < yuck.length; i++){
		yuck[i].move();
		yuck[i].display();
	}
	
	var volume = mic.getLevel(); // Code inspiration drawn heavily from class example - https://openprocessing.org/sketch/795988
	
	var screamThreshold = 0.1;
	
	if (volume > screamThreshold){
		yuck.splice(0,1);	
	}
		
}

function taskTwo(){
	background (253, 253, 150);
	
}

function Yuck (x,y) {
	this.x = random(0, width);
	this.y = random(0, height);
		
	this.display = function(){
		stroke(0);
		fill(115,162,19);
		ellipse(this.x, this.y, 30, 30);		
	}
	
	this.move = function(){
		this.x = this.x + random (-1, 1);
		this.y = this.y + random (-1, 1);
	}
	
}

function keyPressed(){
	if (scene == 0){
		if (keyCode === ENTER){
			scene = 2;
		} else if (keyCode === SHIFT){
			scene = 1;
		}
		
	if (scene == 1){
		if (keyCode === BACKSPACE){
			scene = 0;
		} else scene = 1;
	}
	
	if (scene == 2){
		if (keyCode === RIGHT_ARROW){ // switch between screens for now - comment out later when figured out how to have task completed screen lead to new task 
			scene = 3;
		} 
	}
	
	if (scene == 3){
		if (keyCode === LEFT_ARROW){
			scene = 2;
		}
	}
	}
}