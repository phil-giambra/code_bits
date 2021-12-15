


process.on("message", function (message) {
  console.log(`Message from fork.js: `,message);
});

process.send("Hello from foo");
process.send( { data:"Hello from foo" } );


setTimeout(function(){ process.exit(); },2000)
