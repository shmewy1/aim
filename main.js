var canvas, ctx, width, height, mainmenu, backgroundImg, targetImg, menutextImg, startbutton_darkImg, startbutton_lightImg;

function setup() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    width = 800;
    height = 600;

    mainmenu = true;

    backgroundImg = new Image();
    backgroundImg.src = 'res/background.png';
    
    targetImg = new Image();
    targetImg.src = 'res/target.png';

    menutextImg = new Image();
    menutextImg.src = 'res/menutext.png';

    startbutton_darkImg = new Image();
    startbutton_darkImg.src = 'res/startbutton_dark.png';

    startbutton_lightImg = new Image();
    startbutton_lightImg.src = 'res/startbutton_light.png';

    gameovertextImg = new Image();
    gameovertextImg.src = 'res/gameovertext.png'

    retrybutton_darkImg = new Image();
    retrybutton_darkImg.src = 'res/retrybutton_dark.png';

    retrybutton_lightImg = new Image();
    retrybutton_lightImg.src = 'res/retrybutton_light.png';
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
    },
    draw: function() {
        ctx.drawImage(targetImg, this.x-this.radius, this.y-this.radius);
    },
    update: function() {
        x = mousePos.x - this.x;
        y = mousePos.y - this.y;

        if (x**2 + y**2 <= this.radius**2) {
            //hit
            if (mouse1) {
                this.hit();
            }
        } else {
            //miss
        }
    },
    hit: function() {
        this.x = Math.floor((Math.random() * 700) + this.radius);
        this.y = Math.floor((Math.random() * 400) + 100);

        score += 1; 
    }
}

function gameoverscreen() {
    ctx.drawImage(backgroundImg, 0, 0);

    ctx.drawImage(gameovertextImg, 300-114, 150);

    ctx.textAlign = 'center';
    ctx.fillStyle = "white";

    ctx.font = "40px Arial";
    ctx.fillText("score: " + score, (width/2), (height/2)+10);

    if (mousePos.x > (width/2) - 100 && mousePos.x < (width/2) + 100 && mousePos.y > (height/2) + 50 && mousePos.y < (height/2) + 100) {
        ctx.drawImage(retrybutton_lightImg, (width/2)-100, (height/2)+50);
        if (mouse1)
            setupGame();
    } else {
        ctx.drawImage(retrybutton_darkImg, (width/2)-100, (height/2)+50);
    }
}

function mainmenuscreen() {
    ctx.drawImage(backgroundImg, 0, 0);
    ctx.drawImage(menutextImg, 300-107, 150);
    
    if (mousePos.x > (width/2) - 100 && mousePos.x < (width/2) + 100 && mousePos.y > (height/2) + 50 && mousePos.y < (height/2) + 100) { 
        ctx.drawImage(startbutton_lightImg, (width/2)-100, (height/2)+50);
        console.log
        if (mouse1) {
            mainmenu = false;
            setupGame();
        }
    } else {
        ctx.drawImage(startbutton_darkImg, (width/2)-100, (height/2)+50);
    }
}

function update() {

    if (mainmenu) {
        mainmenuscreen();
    } else {
        if (timeleft >= 0) {
            // gameplay
            target.update();
            timeleft = startTime - (Math.round((new Date()).getTime() / 1000)) + 30;
            render();
        } else {
            gameoverscreen(); 
        }
    }
    mouse1 = false;
}

function render() {
    ctx.drawImage(backgroundImg, 0, 0);

    target.draw();

    ctx.fillStyle = "black";
    ctx.font = "20px Arial";

    ctx.fillText("score: " + score, 10, 30);
    ctx.fillText("time: " + timeleft, 600, 30);
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

setup();
setupGame();

setInterval(function() {
    update();
}, 1000/60);
