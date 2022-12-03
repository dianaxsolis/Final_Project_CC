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
1. 17.1: Loading and Playing - p5.js Sound Tutorial - The Coding Train


Title screen is drawn by me. Font is Core Gungseo (https://www.fontspring.com/fonts/s-core/core-gungseo)


*/

let title, soundbutton; // images
let backgroundmusic;
let

function preload(){ // Loads images and other necessary items
	
	title = loadImage('data/TitleScreen_FinalProject_CC.png');
	soundbutton = loadImage('data/soundbutton.jpg');
	

	backgroundmusic = loadSound ('data/PerdonMadrecita.mp4')
	backgroundmusic.setVolume(0.1);

}

function setup(){
	createCanvas(1325,800);

	backgroundmusic.loop();
	backgroundmusic.setVolume(0.5);
	
}

function draw(){
	background(title);

}

function titleScreen(){

}