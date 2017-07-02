var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = 800;
var height = 600;
mousePos = {x: 0, y: 0};
mouse1 = false;


target = {
    radius: 20,
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

        console.log(x + ' ' + y);

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
    }
}

function update() {
    target.update();
    draw();

    mouse1 = false;
}

function draw() {
    ctx.fillStyle = "#212121"
    ctx.fillRect(0, 0, width, height);

    target.draw();

    ctx.fillStyle = "white";
    ctx.font = "30px Arial";

    ctx.fillText("x: " + mousePos.x, 10, 50);
    ctx.fillText("y: " + mousePos.y, 10, 90)
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
    update()
}, 1000/60);
