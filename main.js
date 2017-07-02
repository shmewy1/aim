var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var width = 800;
var height = 600;

var mousePos = {x: 0, y: 0};
var mouse1 = false;
var score = 0;
var startTime = Math.round((new Date()).getTime() / 1000);
var timeleft = 30;


target = {
    radius: 30,
    x: width/2,
    y: height/2,
    color: 'red',
    draw: function() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        ctx.fill();
    },
    update: function() {
        x = mousePos.x - this.x;
        y = mousePos.y - this.y;

        if (x**2 + y**2 <= this.radius**2) {
            this.color = 'green';

            if (mouse1) {
                this.hit();
            }
        } else {
            this.color = 'red';
        }
    },
    hit: function() {
        this.x = Math.floor((Math.random() * 700) + this.radius)
        this.y = Math.floor((Math.random() * 500) + this.radius)

        score += 1; 
    }
}

function update() {
    target.update();
    draw();

    mouse1 = false;

    timeleft = startTime - (Math.round((new Date()).getTime() / 1000)) + 30;
    
}

function draw() {
    ctx.fillStyle = "#212121"
    ctx.fillRect(0, 0, width, height);

    target.draw();

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";

    ctx.fillText("score: " + score, 10, 30);
    ctx.fillText("time: " + timeleft, 600, 30);

    ctx.fillText("x: " + mousePos.x, 10, 50);
    ctx.fillText("y: " + mousePos.y, 10, 70);

}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

window.addEventListener('mousemove', function(evt) {
    mousePos = getMousePos(canvas, evt);
}, false);

window.addEventListener('mousedown', function(evt) {
    mouse1 = true;
})

setInterval(function() {
    if (timeleft >= 0) update();
}, 1000/60);
