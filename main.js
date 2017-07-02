var canvas, ctx, width, height;

function setupCanvas() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    width = 800;
    height = 600;
}

function setupGame() {
    ctx.textAlign = 'start';

    mousePos = {x: 0, y: 0};
    mouse1 = false;
    score = 0;
    startTime = Math.round((new Date()).getTime() / 1000);
    timeleft = 30;
    gameover = false;

    target.setupTarget();
}

target = {
    setupTarget: function() {
        this.radius = 30;
        this.x = width/2;
        this.y = height/2;
        this.color = 'red'; 
    },
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

function gameoverscreen() {
    ctx.fillStyle = "#212121"
    ctx.fillRect(0, 0, width, height);

    ctx.textAlign = 'center';
    ctx.fillStyle = "white";

    ctx.font = "60px Arial";
    ctx.fillText("TIME'S UP", (width/2), (height/2)-60);

    ctx.font = "40px Arial";
    ctx.fillText("score: " + score, (width/2), (height/2)+10);

    if (mousePos.x > (width/2) - 100 && mousePos.x < (width/2) + 100 && mousePos.y > (height/2) + 50 && mousePos.y < (height/2) + 100) {
        ctx.fillStyle = '#CDDC39';
        if (mouse1)
            setupGame();
    } else {
        ctx.fillStyle = '#8BC34A';
    }
    ctx.fillRect((width/2)-100, (height/2)+50, 200, 50);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillStyle = 'white';
    ctx.fillText("RETRY", width/2, (height/2)+75);
    ctx.textBaseline = 'alphabetic';

    showMouseCords();
}

function update() {
    if (timeleft >= 0) {
        // gameplay
        target.update();
        render();

        mouse1 = false;

        timeleft = startTime - (Math.round((new Date()).getTime() / 1000)) + 30;
    } else {
        gameoverscreen(); 
    } 
}

function render() {
    ctx.fillStyle = "#212121"
    ctx.fillRect(0, 0, width, height);

    target.draw();

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";

    ctx.fillText("score: " + score, 10, 30);
    ctx.fillText("time: " + timeleft, 600, 30);

    showMouseCords();
}

function showMouseCords() {
    ctx.textAlign = "start";
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";

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

setupCanvas();
setupGame();

setInterval(function() {
    update();
}, 1000/60);
