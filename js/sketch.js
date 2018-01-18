/*
  @author: lprescott 
  https://github.com/lprescott/

  In this javascript program, I followed the tutorial by emilyxxie:
  https://www.youtube.com/watch?v=S1TQCi9axzg
*/

//Global variables here:
var symbolSize = 20;
var streams = [];

/*
  The setup() function is called once when the program starts.
*/
function setup() {
  createCanvas(
    window.innerWidth, 
    window.innerHeight
  );
  background(0);
  var x = 0;
  for (var i = 0; i <= width / symbolSize; i++) {
    var stream = new Stream();
    stream.generateSymbols(
      x, 
      random(-1000, 0)
    );
    streams.push(stream);
    x += symbolSize;
  }
  textSize(symbolSize);
}

/*
  Called directly after setup(), the draw() function continuously executes 
  the lines of code contained inside its block until the program is stopped 
  or noLoop() is called.
*/
function draw() {
  background(0, 150); //background(color, opacity)
  streams.forEach(function(stream) {
    stream.render();
  });
}

/*
  The Symbol class
*/
function Symbol(x, y, speed, first) {
  this.x = x;
  this.y = y;
  this.value;
  this.speed = speed;
  this.switchInterval = round(random(2, 20));
  this.first = first;

  /*
    The setToRandomSymbol function
  */
  this.setToRandomSymbol = function() {
    if (frameCount % this.switchInterval == 0) {
      this.value = String.fromCharCode(
        0x30A0 + round(random(0, 96))
      );
    }
  }

  /*
    The rain function
  */
  this.rain = function() {
    if (this.y >= height) {
      this.y = 0;
    } else {
      this.y += this.speed;
    }
  }
}

/*
  The Stream class
*/
function Stream(){
  this.symbols = [];
  this.totalSymbols = round(random(5, 30));
  this.speed = random(5, 20);

  /*
    The generateSymbols function
  */
  this.generateSymbols = function(x, y) {
    var first = round(random(0, 4)) == 1; //Randomly true or false
    for (var i = 0; i <= this.totalSymbols; i++) {
      symbol = new Symbol(x, y, this.speed, first);
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      y -= symbolSize;
      
      //Second and onward call of this function is not first, so set to false
      first = false; 
    }
  }

  /*
    The render function
  */
  this.render = function() {
    this.symbols.forEach(function(symbol) {
      //If it is the first symbol, brighten the fill color
      if (symbol.first) {
        fill(180, 255, 180);
      } else { //keep color normally green
        fill(30, 197, 3);
      }
      
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setToRandomSymbol();
    });
  }
}