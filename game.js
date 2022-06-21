var buttonColours=["red", "blue", "green", "yellow"];
var userClickedPattern=[];
var checkstart=false,glevel=0;
var gamepattern=[];
$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer((userClickedPattern.length)-1);
})
$(document).keypress(function(e){
  if(e.key==="a" && !checkstart){
    $("#level-title").text("level "+glevel);
    newsequence();
    checkstart=true;
  }
})
function checkAnswer(level){
if(userClickedPattern[level]===gamepattern[level]){
  if(level===glevel-1){
    setTimeout(function(){newsequence()},1000);
  }
}
else{
  const m=new Audio("sounds/wrong.mp3");
  m.play();
  $("h1").text("Game Over, Press Key A to Restart");
  $("body").addClass("game-over");
  startOver();
  setTimeout(function(){  $("body").removeClass("game-over");},200);
}
}
function startOver(){
  checkstart=false;
  gamepattern=[];
  glevel=0;
}
function playSound(name){
  const n = new Audio("sounds/"+name+".mp3");
  n.play();
}
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){  $("#"+currentColour).removeClass("pressed");},100);
}
function newsequence(){
  userClickedPattern=[];
  var num=Math.floor(4*Math.random());
  var randomChosenColour=buttonColours[num];
  gamepattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  glevel++;
  $("#level-title").text("level "+glevel);
}
