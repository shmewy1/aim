var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = 800;
var height = 600;
mousePos = {x: 0, y: 0};

function update() {
    draw();
}

function draw() {
    ctx.fillStyle = "#212121"
    ctx.fillRect(0, 0, width, height);

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

setInterval(function() {
    update()
}, 1000/60);
