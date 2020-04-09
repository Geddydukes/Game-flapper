var myGamePiece;
var myObstacles;
var myObstacle2;
var myObstacle3;
var newObstacle;
let myBackground;
const obstacleArray = [];
let distanceAccumulator = 0;

function startGame() {
    myGamePiece = new component(100,100,"./assets/mewtwo.png",400,150,"image");
    myBackground = new component(1000000,700,"https://cameronscookware.com/pokemon-pixel-background/pokemon-pixel-background-unique-pokemon-clouds-pixel-art-desktop-background-combination",0,0,"image");
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
    obstacleArray.x -=2;
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if (myGameArea.keys && myGameArea.keys[32]) {
        myGamePiece.speedY = -4;   
    }
    myGamePiece.newPos();
    myGamePiece.update();
    obstacleArray.gravitySpeed = 0;
    obstacleArray.gravity = 0;

    
}
function createObstacles() {
    for(let i=0;i<1;i++){
        const positionX = 500;
        const newerObstacle1 = new component(80, Math.ceil(Math.random()*150) + 200, "./assets/Warp_pipe1.png", positionX + distanceAccumulator, 450, "image");
        obstacleArray.push(newerObstacle1);
        const newerObstacle2 = new component(80, Math.ceil(Math.random()*300) + 100,"./assets/Warp_pipe.png", positionX + distanceAccumulator, 0, "image");
        obstacleArray.push(newerObstacle2);
        distanceAccumulator += positionX;
    }
}

// document.body.addEventListener('click', function(){
//     startGame();
// })




console.log('scripts works');

