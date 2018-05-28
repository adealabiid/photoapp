  var c = document.querySelector("#c");
  c.width = 400;
  c.height = 400;

  function redraw(image, top, bottom){
    var c = document.querySelector("#c");
    var ctx = c.getContext("2d");
    var maxWidth = 200 ;
    var lineHeight = 25;
    var x = (c.width - maxWidth) / 2;
    var y = (c.height - maxWidth);
    // ctx.strokeStyle="black";
    ctx.fillStyle="#d6c99d";
    ctx.textAlign ="left";
    ctx.font = "13pt Gotham";
    // ctx.shadowColor="#000";
    // ctx.shadowBlur=7;
    // ctx.lineWidth = 3;  //stroke thickness!!
    ctx.drawImage(image,0,0,400,400);
    if (top != null) {
      ctx.fillText(top, 50, 50);
      //ctx.strokeText(top, 50, 50);
    }

    if (bottom != null) {
        ctx.rect(2, 248, 250, 150);
        ctx.fillStyle = '#19241b';
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = '#d6c99d';
        ctx.stroke();
    }

    if (bottom != null) {
      ctx.fillText(bottom, 10, 280);
      ctx.strokeText(bottom, 10, 280);
      ctx.fillStyle = 'black';
      ctx.strokeStyle = '#19241b';
    }
  }

    function wrapText(ctx, bottom, x, y, maxWidth, lineHeight) {
      var words = bottom.split(' ');
      var line = '';

      for(var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = ctx.measureText(testLine);
        var testWidth = metrics.width;
        console.log(testWidth)
        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, x, y);
          line = words[n] + ' ';
          y += lineHeight;
        }
        else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, y);
    }
        


  function textChanged(E){
    var id = E.target.id;
    var text = E.target.value;

    if(id=="top-line") {
      window.topText = text
    }
    else {
      window.bottomText = text
    }
    redraw(window.imageSrc, window.topText, window.bottomText)
  }

  function fileSelectHandler(E){
    var file = E.target.files[0];

    var reader = new FileReader();
    reader.onload = function(fileObject){
      var data = fileObject.target.result;
      var image = new Image();
      image.onload=function() {
        window.imageSrc = this;
          // c.height = this.height;
          // c.width = this.width;
          document.getElementById('saveBtn').disabled = false;
          redraw(window.imageSrc, null, null);
      };

      image.src = data;

    };
    reader.readAsDataURL(file);
  }

  function saveFile() {
    var link = document.createElement('a');
    link.href = document.querySelector('canvas').toDataURL();
    link.download = 'Download.jpg';
    document.body.appendChild(link);
    link.click();
    // window.open(document.querySelector('canvas').toDataURL());
  }
  document.querySelector('button').addEventListener('click', saveFile, false);


  var top = document.getElementById('top-line');
  var bottom = document.getElementById('bottom-line').value;
  top.oninput = textChanged;
  bottom.oninput = textChanged;
  document.getElementById('file').addEventListener('change', fileSelectHandler, false);

  var c = document.getElementById('c');
  var ctx = c.getContext('2d');
  var maxWidth = 200;
  var lineHeight = 25;
  var x = (c.width - maxWidth) / 2;
  var y = 60;

  wrapText(ctx, bottom, x, y, maxWidth, lineHeight);