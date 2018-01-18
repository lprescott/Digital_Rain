/*
  @author: lprescott 
  https://github.com/lprescott/

  In this javascript program, I followed the tutorial by emilyxxie:
  https://www.youtube.com/watch?v=S1TQCi9axzg
*/

//Global variables here:
var symbolSize = 14;
var streams = [];
var fadeInterval = 1.6;
var input;

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
  //Populate the entirety of the screen with new streams
  for (var i = 0; i <= width / symbolSize; i++) {
    var stream = new Stream();
    stream.generateSymbols(x, random(-1000, 0));
    streams.push(stream);
    x += symbolSize;
  }

  textFont('Consolas');
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
  The Symbol class defines each 'symbol' as a character with a x, y coordinate.
  Also a speed, interval to switch and first boolean value.

  Also a newly added opactiy.
*/
function Symbol(x, y, speed, first, opacity) {
  this.x = x;
  this.y = y;
  this.value;

  this.speed = speed;
  this.first = first;
  this.opacity = opacity;

  this.switchInterval = round(random(2, 20));

  /*
    The setToRandomSymbol function changes a symbol class to one of the character codes
    being used, randomly.
  */
  this.setToRandomSymbol = function() {
    var charType = round(random(0, 5));
    if (frameCount % this.switchInterval == 0) {
      if (charType > 1) {
        // set it to Katakana
        this.value = String.fromCharCode(
          0x30A0 + round(random(0, 96))
        );
      } else {
        // set it to numeric
        this.value = round(random(0,9));
      }
    }
  }

  /*
    The rain function checks if the symbol has reached the bottom, and resets if needed.
    Else, it continually pushes the symbol down the page.
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
  The Stream class is an array of sumbols with a total number and a speed attribute.
*/
function Stream(){
  this.symbols = [];
  this.totalSymbols = round(random(5, 35));
  this.speed = random(1, 5);

  /*
    The generateSymbols function sets all symbols contained in the stream to a randomly
    generated char code, using setToRandomSymbol.
  */
  this.generateSymbols = function(x, y) {
    var opacity = 255;
    var first = round(random(0, 4)) == 1; //Randomly true or false
    for (var i = 0; i <= this.totalSymbols; i++) {
      symbol = new Symbol(
        x, 
        y, 
        this.speed, 
        first,
        opacity
      );
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      
      //Set the opacity to decrease as the ratio of total symbols to fade interval changes
      opacity -= (255 / this.totalSymbols) / fadeInterval;
      y -= symbolSize;
      
      //Second and onward call of this function is not first, so set to false
      first = false; 
    }
  }

  /*
    The render function calls the necessary functions and thereby renders a stream.
  */
  this.render = function() {
    this.symbols.forEach(function(symbol) {
      //If it is the first symbol, brighten the fill color
      if (symbol.first) {
        fill(140, 255, 170, symbol.opacity);
      } else { //keep color normally green
        fill(0, 255, 70, symbol.opacity);
      }
      
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setToRandomSymbol();
    });
  }
}