var ball;
var db;
var newposition;

function setup(){
    db = firebase.database();
    //console.log(db);
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    var positionreference = db.ref('ball/position');
    positionreference.on("value", readPosition);
}

function readPosition(data){
    newposition = data.val();
    ball.x = newposition.x;
    ball.y = newposition.y;
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    var positionreference = db.ref('ball/position');
    positionreference.update({
        'x': newposition.x + x,
        'y': newposition.y + y
    });
}
