(function () {
  var touches = [];
  var canvas, ctx;
  var interval;

  function init() {
    canvas = document.getElementById("vis-canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext("2d");

    canvas.addEventListener("click", click);
    window.addEventListener("resize", resizeCanvas, false);

    function resizeCanvas() {
      if (interval) clearInterval(interval);
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      interval = setInterval(play, 20);
    }
    resizeCanvas();
  }

  function click(event) {
    touches.push({
      x: event.offsetX,
      y: event.offsetY,
      r: 1,
      a: Math.random(),
    });
  }

  function eachTouch(fn) {
    for (var i = 0; i < touches.length; i++) {
      fn(touches[i], i);
    }
  }

  function update() {
    eachTouch(function (touch, i) {
      if (touch.r < 100) {
        touch.r++;
      } else {
        touches.splice(i, 1);
      }
    });
  }

  function render() {
    ctx.fillStyle = "#eee";
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    eachTouch(function (touch) {
      ctx.save();
      ctx.translate(touch.x, touch.y);
      ctx.fillStyle = `rgba(234, 22, 70, ${touch.a})`;
      ctx.beginPath();
      ctx.arc(0, 0, touch.r, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    });
  }

  function play() {
    update();
    render();
  }

  window.addEventListener("DOMContentLoaded", init);
})();
