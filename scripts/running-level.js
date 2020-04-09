var myGamePiece;
var myObstacles;
var myObstacle2;
var myObstacle3;
var newObstacle;
let myBackground;
const obstacleArray = [];
let distanceAccumulator = 0;

function startGame() {
    myGamePiece = new component(100,100,"//img.pokemondb.net/sprites/black-white/back-normal/mewtwo.png",400,150,"image");
    // myObstacle = new component(80, 1000, "https://ya-webdesign.com/transparent250_/flappy-bird-background-png-9.png", 1300, 400, "image");
    // newObstacle = new component(80, 400,"https://ya-webdesign.com/transparent250_/flappy-bird-pipe-png-1.png",1350,0,"image")
    myBackground = new component(1000000,700,"https://cameronscookware.com/wp-content/uploads/2019/12/pokemon-pixel-background-unique-pokemon-clouds-pixel-art-desktop-background-combination-of-pokemon-pixel-background.png",0,0,"image");
    createObstacles();
    myGameArea.start();
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = -1;
    this.speedY = 0;
    this.gravity = 2;
    this.gravitySpeed = 0;
    this.update = function(){
    ctx = myGameArea.context;
    if(type == "image") {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
    this.newPos = function() {
        this.gravitySpeed = this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    this.crashWith = function(otherObj) {
        let myLeft = this.x;
        let myRight = this.x + (this.width);
        let myTop = this.y;
        let myBottom = this.y + (this.height);
        let otherLeft = otherObj.x;
        let otherRight = otherObj.x + (otherObj.width);
        let otherTop = otherObj.y;
        let otherBottom = otherObj.y + (otherObj.height);
        let crash = true;
        if((myBottom<otherTop)||
        (myTop>otherBottom)||
        (myRight<otherLeft)||
        (myLeft> otherRight)) {
            crash = false;
        }
        return crash;
    }
    this.hitBottom = function() {
        let rockBottom = myGameArea.canvas.height - this.height;
        if (this.y > rockBottom) {
            this.y = rockBottom;
        }
    }
}

const myGameArea = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = 1400;
        this.canvas.height = 700;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function(e){
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function(e) {
            myGameArea.keys[e.keyCode] = false;
        })
    },
    clear: function() {
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    },
    stop: function() {
        clearInterval(this.interval);
    }
}

function everyInterval(n) {
    if ((myGameArea.frameNo/n)%1 == 0) {return true;}
    return false;
}

function updateGameArea() {
for(let i=0;i<obstacleArray.length;i++){
        if (myGamePiece.crashWith(obstacleArray[i])) {
            myGameArea.stop();
            return;
        }
}
    myGameArea.clear();
    myBackground.speedX = -1;
    myBackground.newPos();
    myBackground.update();
    myGameArea.frameNo +=1;
    for(let i=0;i<obstacleArray.length; i++) {
        
            obstacleArray[i].update();
            obstacleArray[i].x -=2;



    }
    // myObstacle.update();
    // newObstacle.update();
    // myObstacle.x -= 2;
    // newObstacle.x -= 2;
    obstacleArray.x -=2;
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if (myGameArea.keys && myGameArea.keys[32]) {
        myGamePiece.speedY = -4;   
    }
    myGamePiece.newPos();
    myGamePiece.update();
    // newObstacle.gravitySpeed = 0;
    obstacleArray.gravitySpeed = 0;
    obstacleArray.gravity = 0;

    
}
function createObstacles() {
    for(let i=0;i<50;i++){
        const positionX = 700;
        const newerObstacle1 = new component(80, 400, "https://ya-webdesign.com/transparent250_/flappy-bird-background-png-9.png", positionX + distanceAccumulator, 400, "image");
        obstacleArray.push(newerObstacle1);
        const newerObstacle2 = new component(80, 400,"https://ya-webdesign.com/transparent250_/flappy-bird-pipe-png-1.png", positionX + distanceAccumulator, -200, "image");
        obstacleArray.push(newerObstacle2);
        distanceAccumulator += positionX;
    }
}

// document.body.addEventListener('click', function(){
//     startGame();
// })




console.log('scripts works');

