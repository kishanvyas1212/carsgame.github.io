const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
const cargame = document.querySelector('.carGame');
// console.log(score);
// console.log(typeof(score));
 keys = {
    ArrowUp: false,
    ArrowRight: false,
    ArrowDown: false,
    ArrowLeft: false
};
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
function keyDown(e) {
    e.preventDefault();
    // console.log(e.key);

    keys[e.key] = true;
    // console.log(keys);
}
function keyUp(e) {
    // console.log(e.key);
    keys[e.key] = false;
    // console.log(keys);
}



startScreen.addEventListener('click', startgame);
 player = { speed: 5, score:0 };
function isCollide(a,b){
    aRec = a.getBoundingClientRect();
    bRec = b.getBoundingClientRect();

//console.log("the parameters of a " + aRec + "The parameters of b" + bRec);
return !((aRec.top > bRec.bottom) || (aRec.bottom < bRec.top) || (aRec.left > bRec.right) ||(aRec.right < bRec.left) )
}
function movelines(){
    lines = document.querySelectorAll('.lines');
    lines.forEach(function(item){
       if(item.y > 700){
        item.y-=710;
        
       }
        item.y +=player.speed;
        item.style.top =  item.y + "px"
        item.style.overflow = 'hidden';
    });
} 

    function endGame(){
        player.start = false;
        
    }
function moveEnemy(car){
    enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(item){
         if(isCollide(car,item)){
// console.log("The car is collide with another car");
  endGame();
         }

       if(item.y > 700){
        item.y =-450;
        item.style.overflow = 'hidden';
        item.style.left = Math.floor(Math.random()*350) + "px";
       }
        item.y +=(player.speed + 1 );
        item.style.top =  item.y + "px";
      
    });
}
i = 1;


function flysuperman(){
    fly = document.createElement('div');
    
    gameArea.appendChild(fly);
   
    fly.classList.add('fly');
     fly.classList.add('flyanimation');
  setInterval(()=>{
    fly.classList.remove('fly');
    fly.classList.remove('flyanimation');
  },5*1000/2)
    console.log("yes this function called");
}
function superman(){
  
        Superman = document.createElement('div');
        Superman.setAttribute('class','Superman');
        gameArea.appendChild(Superman);   
       
}
// function movebg(){
//     moveback = document.querySelector('.Superman');
//     moveback.style.top += player.speed;
// }
 
function gameplay() {
    // console.log("This is clicked");
    // movebg();

    
    if(( (Math.floor((player.score)/50))==10*i) && man){
        console.log("flysuperman function is called");
        flysuperman();
        i++;
        man = false;
    }
  
    if(i>i-1){
        man = true;
    }
    car = document.querySelector('.car');
     road = gameArea.getBoundingClientRect();
    //  console.log(player.score);
     if((Math.floor((player.score)/50))==10){
        // console.log("the speed is incresed from 5 to 10" + player.score)
        player.speed =6;
  }
  if((Math.floor((player.score)/50))==50){
    // console.log("the speed is incresed from 5 to 10" + player.score)
    player.speed =8;
}
if((Math.floor((player.score)/50))==100){
    // console.log("the speed is incresed from 5 to 10" + player.score)
    player.speed = 10;

   
}

    //  console.log(road);
    if (player.start) {
        movelines();
        moveEnemy(car);
  
         
        if (keys.ArrowUp && player.y > (road.top + 100)) {
            player.y -= player.speed;
            // console.log(player.y, player.x);
  }
        if (keys.ArrowDown && player.y < (road.bottom - 80)) { player.y += player.speed }
        if (keys.ArrowRight && (player.x)<350) { player.x += player.speed }
        if (keys.ArrowLeft && (player.x)>0) { player.x -= player.speed }
        car.style.top = player.y + "px"
        car.style.left = player.x + "px"


        window.requestAnimationFrame(gameplay);
        // console.log(player.score++);
        player.score++
        score.innerText = "Score is :" + Math.floor((player.score)/50);
   
  
    }
}
function startgame() {
    gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    
    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gameplay);
   
    for(x=0;x<5;x++){
    roadline = document.createElement('div');
     roadline.setAttribute('class','lines');
     roadline.y = (x*140);
     roadline.style.top =  roadline.y + "px";
     gameArea.appendChild(roadline);
    }

    // This code is for enemy car
    for(x=0;x<4;x++){
        enemycar = document.createElement('div');
         enemycar.setAttribute('class','enemy');
         enemycar.y = ((x + 1)*350)* -1;
         enemycar.style.top = enemycar.y + "px";
       //  enemycar.style.background = 'pink';
        enemycar.style.left = Math.floor(Math.random()*350) + "px";
         gameArea.appendChild(enemycar);
        }
 

        // superman();
        // flysuperman();
        // console.log("superman function is called");

     car = document.createElement('div');
    car.setAttribute('class', 'car');
    // car.innerText = "this is car";
    gameArea.appendChild(car);
   
    superman();
    player.x = car.offsetLeft; // this code for move car
    player.y = car.offsetTop;
    // console.log(car.offsetTop, car.offsetLeft); // this code is for find the positon of car 
   
}
