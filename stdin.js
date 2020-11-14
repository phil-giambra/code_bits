// capture keystrokes
// source: https://stackoverflow.com/questions/17470554/how-to-capture-the-arrow-keys-in-node-js
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

stdin.on('data', function(key){
    if (key == '\u001B\u005B\u0041') {
        process.stdout.write('up');
    }
    if (key == '\u001B\u005B\u0043') {
        process.stdout.write('right');
    }
    if (key == '\u001B\u005B\u0042') {
        process.stdout.write('down');
    }
    if (key == '\u001B\u005B\u0044') {
        process.stdout.write('left');
    }
    
    if (key == '\u0003') { process.exit(); }    // ctrl-c
});

// Gives you the unicode of the pressed key
stdin.on('data', function(key){
    console.log(toUnicode(key));
    if (key == '\u0003') { process.exit(); }    // ctrl-c
});

function toUnicode(theString) {
  var unicodeString = '';
  for (var i=0; i < theString.length; i++) {
    var theUnicode = theString.charCodeAt(i).toString(16).toUpperCase();
    while (theUnicode.length < 4) {
      theUnicode = '0' + theUnicode;
    }
    theUnicode = '\\u' + theUnicode;
    unicodeString += theUnicode;
  }
  return unicodeString;
}

