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

YOUTUBE:

1. 7.4: Adding and Removing Objects - p5.js Tutorial The Coding Train
2. 17.1: Loading and Playing - p5.js Sound Tutorial - The Coding Train
3. 7.2 Mouse & Key Inputs - p5.js Tutorial - xin xin
4. Animation Creation with p5.play - Data Science for Everyone
5. 14c How to make an event timer p5.js - flanniganable
6. How to Click and Drag Objects in JavaScript + P5js - Barney Codes
7. 7.4: Mouse Interaction with Objects - p5.js Tutorial

WEBSITES:

1. https://happycoding.io/tutorials/p5js/arrays
2. https://openprocessing.org/sketch/1002037/
3. http://learn.digitalharbor.org/courses/creative-programming/lessons/using-timers-in-p5-js/
4. https://editor.p5js.org/Pterodactyl_/sketches/SOu6kuuab

Illustrations made by me. Font is Core Gungseo (https://www.fontspring.com/fonts/s-core/core-gungseo)
Background Music is Perdon Madrecita (Madrecita Querida) by Vicente Fernandez. (https://www.youtube.com/watch?v=DBXDo6nyDy0&ab_channel=PuroMariachiKaraoke)


*/

// global variables

let scene = 0; // allows for the player to switch between screens - easiest way to do this without user input
let timer = 5800; // allows for the animation to play twice
let endOfAnimation = timer;
let title, hugIllustration, taskOneDishes, taskTwoTV; // images
let backgroundmusic, mic; // sound
let corefont; // font

var star;
var yuck = [];

var family1X = 0;
var family1Y = 0;
var family2X = 0;
var family2Y = 0;
var family3X = 0;
var family3Y = 0;

function preload() { // Loads images and other necessary items

	// images

	title = loadImage('TitleScreen_FinalProject_CC.png');
	hugIllustration = loadImage('Instructions_Illustration.png');
	taskOneDishes = loadImage('TaskOne_Screen_FinalProject.png');
	taskTwoTV = loadImage ('TaskTwo_Screen_Final_Project_CC.png');
	
	familyPhoto1 = loadImage ('FamilyPhoto1.JPG');
	familyPhoto2 = loadImage ('FamilyPhoto3.JPG');
	familyPhoto3 = loadImage('FamilyPhoto4.JPG');

	star = loadAnimation('TransitionScreenStar008.png', // Multiple images at different parts in order to create animation
		'TransitionScreenStar007.png',
		'TransitionScreenStar006.png',
		'TransitionScreenStar005.png',
		'TransitionScreenStar004.png',
		'TransitionScreenStar003.png',
		'TransitionScreenStar002.png',
		'TransitionScreenStar001.png'
	)

	// fonts

	corefont = loadFont('Core Gungseo W01 Regular.ttf');
	titlefont = loadFont('Sabrina-vZe7.ttf')

	// sound

	backgroundmusic = loadSound('PerdonMadrecita.mp4');

	taskDone = loadSound('TransitionScreenAudioEffect.m4a');

}

function mouseDragged(){
	if ((mouseX > family1X - 300) && (mouseX < family1X + 300)) {
		if ((mouseY > family1Y - 300) && (mouseY < family1Y + 300)) {
			family1X = mouseX;
			family1Y = mouseY;
			}
	 }
	
	if ((mouseX > family2X - 500) && (mouseX < family2X + 500)) {
		if ((mouseY > family2Y - 500) && (mouseY < family2Y + 500)) {
			family2X = mouseX;
			family2Y = mouseY;
			}
	 }
}

function setup() {
	createCanvas(1325, 800);

	background(253, 253, 150);
	
	// plays background music at a constant loop throughout gameplay
	
	backgroundmusic.play();
	backgroundmusic.setVolume(0.1);

	// allows input from mic

	mic = new p5.AudioIn();
	mic.start();

	// creates germ particles

	for (var i = 0; i < 100; i++) {
		yuck[i] = new Yuck();
	}
}

function draw() {

	// conditionals that allows for each screen to switch between

	if (scene === 0) {
		startPage();
	} else if (scene === 1) {
		instructions();
	} else if (scene === 2) {
		taskOne();
	} else if (scene === 3) {
		transitionScreen();
	} else if (scene === 4) {
		taskTwo();
	}
}

function startPage() { // scene = 0
	background(title);

	textFont(corefont);
	textSize(50);
	fill(136, 155, 174);
	text("press enter to begin tasks.", 100, 700);
	text("press shift for instructions.", 100, 750);

}

function instructions() { // scene = 1
	background(253, 253, 150);

	// illustration of mother and daughter hugging

	image(hugIllustration, 450, 150, width / 3, height / 2);

	// title/start - bolder font

	textFont(titlefont)
	textSize(50);
	fill(0);
	text('instructions', 500, 50);
	text('press shift to start!', 300, 725);

	// gameplay instructions

	textFont(corefont);
	textSize(30);
	fill(136, 155, 174);
	text('task one, use your microphone as a way to clean the dishes.', 200, 125);
	text('the higher you scream, the dirty germs will go away.', 200, 175);
	text('keep talking to help your mamá get the dishes clean.', 200, 225);
	text('task two, use your mouse to put away everything into place.', 200, 600);
	text('help your mamá finish cleaning your home.', 200, 650);

}

function taskOne() { // scene = 2

	background(taskOneDishes);

	// displays germs array

	for (var i = 0; i < yuck.length; i++) {
		yuck[i].move();
		yuck[i].display();

	}

	var volume = mic.getLevel(); // code inspiration drawn heavily from class example - https://openprocessing.org/sketch/795988

	var screamThreshold = 0.1;

	// if player screams - the germ particles will go away. the only way to clean the dishes is scream your heart out!

	if (volume > screamThreshold) {
		yuck.splice(0, 1);

	}

	// when there are no more germ particles, player will have completed task - transitioning to a completed screen

	if (yuck.length <= 0) {
		transitionScreen();
	}
}

function taskTwo() { // scene = 3

	background(taskTwoTV);

	// pauses the animation task done sound
	
	taskDone.stop();
	
	image(familyPhoto1, family1X, family1Y, width/8, height/8);
	image(familyPhoto2, family2X, family2Y, width/8, height/8);
	

}

function transitionScreen() { // scene = 4

	background(253, 253, 150);

	// note: could not figure out a way to pause the background music and resume it back in time for task two
	// everytime - i tried to pause and resume it, it would cause a weird echoing loop

	taskDone.setVolume(0.1);
	taskDone.play();

	star.frameDelay = 7; // was unsure how to slow down the animation - https://stackoverflow.com/questions/59823610/animated-png-frame-rate-in-p5js

	if (millis() > endOfAnimation) {
		scene ++;

	}

	// plays animation

	animation(star, width / 2, height / 2);


}

// learned how to create a bubbles/yuck array from dan shiffman's 7.4: adding and removing objects

function Yuck(x, y) {

	this.x = random(0, width);
	this.y = random(0, height);

	this.display = function() {
		stroke(0);
		fill(115, 162, 19);
		ellipse(this.x, this.y, 30, 30);

	}

	this.move = function() {
		this.x = this.x + random(-1, 1);
		this.y = this.y + random(-1, 1);

	}

}

// allows for users to switch between screens

function keyPressed() {
	
	if (scene == 0 || scene == 1) {
		if (keyCode === ENTER) {
			scene += 2;
		} else if (keyCode === SHIFT) {
			scene +=1
		}
	}

	if (scene === 2 || scene === 3) { // this is not apart of game mechanics - just an easy way for me to switch screens without having to complete tasks
		if (keyCode === RIGHT_ARROW) {
			scene += 1;
		}
	}
}

/* - allows me to figure out the crosshairs of the plate in task one in order to reduce the array to certain coordinates

function mousePressed(){
	
  console.log(mouseX);
	console.log(mouseY);
	
}

*/