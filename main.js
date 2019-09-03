var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');
var lineWidth = 5;

autoSetCanvasSize(yyy);

listenToUser(yyy);

var eraserEnabled = false;
black.classList.add('active');
thin.classList.add('active');

pen.onclick = function () {
    eraserEnabled = false;
    pen.classList.add('active');
    eraser.classList.remove('active')
}
eraser.onclick = function () {
    eraserEnabled = true;
    eraser.classList.add('active');
    pen.classList.remove('active');
}
red.onclick = function () {
    context.strokeStyle = 'red';
    green.classList.remove('active');
    blue.classList.remove('active');
    black.classList.remove('active');
    red.classList.add('active');

}
green.onclick = function () {
    context.strokeStyle = 'green';
    red.classList.remove('active');
    blue.classList.remove('active');
    black.classList.remove('active');
    green.classList.add('active');

}
blue.onclick = function () {
    context.strokeStyle = 'blue';
    red.classList.remove('active');
    green.classList.remove('active');
    black.classList.remove('active');
    blue.classList.add('active');
}
black.onclick = function(){
    context.strokeStyle = 'black';
    red.classList.remove('active');
    green.classList.remove('active');
    blue.classList.remove('active');
    black.classList.add('active');
}

thin.onclick = function () {
    lineWidth = 5;
    thick.classList.remove('active');
    thin.classList.add('active');

}
thick.onclick = function () {
    lineWidth = 10;
    thin.classList.remove('active');
    thick.classList.add('active');
}
clear.onclick = function () {
    context.clearRect(0, 0, yyy.width, yyy.height);
    clear.classList.add('ant-click-animating-node');
}
save.onclick = function () {
    var url = yyy.toDataURL("image/png");
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = '画儿';
    a.target = '_blank';
    a.click();
}


/******/

function autoSetCanvasSize(canvas) {
    setCanvasSize();

    window.onresize = function () {
        setCanvasSize();
    }

    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;
        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }
}

// function drawCircle(x, y, radius) {
//   context.beginPath()
//   context.fillStyle = 'black'
//   context.arc(x, y, radius, 0, Math.PI * 2);
//   context.fill()
// }

function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1); // 起点
    context.lineWidth = lineWidth;
    context.lineTo(x2, y2); // 终点
    context.stroke();
    context.closePath();
}

function listenToUser(canvas) {
    var using = false;
    var lastPoint = {
        x: undefined,
        y: undefined
    }
    // 特性检测
    if (document.body.ontouchstart !== undefined) {
        //触屏设备
        canvas.ontouchstart = function (aaa) {
            var x = aaa.touches[0].clientX;
            var y = aaa.touches[0].clientY;
            using = true;
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10);
            } else {
                lastPoint = {
                    x: x,
                    y: y
                }
            }
        }
        canvas.ontouchmove = function (aaa) {
            var x = aaa.touches[0].clientX;
            var y = aaa.touches[0].clientY;
            if (!using) {
                return;
            }

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10);
            } else {
                var newPoint = {
                    x: x,
                    y: y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                lastPoint = newPoint;
            }
        }
        canvas.ontouchend = function () {
            using = false;
        }
    } else {
        //非触屏设备
        canvas.onmousedown = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10);
            } else {
                lastPoint = {
                    x: x,
                    y: y
                }
            }
        }
        canvas.onmousemove = function (aaa) {
            var x = aaa.clientX;
            var y = aaa.clientY;

            if (!using) {
                return;
            }

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10);
            } else {
                var newPoint = {
                    x: x,
                    y: y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                lastPoint = newPoint;
            }

        }
        canvas.onmouseup = function () {
            using = false;
        }
    }
}