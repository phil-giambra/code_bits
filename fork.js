
// https://nodejs.org/api/child_process.html#child_processforkmodulepath-args-options
const { fork } = require("child_process");

console.log("Running fork.js");
console.log("Forking forkfoo....");

let foo = fork("forkfoo.js");


foo.on("message", function (message) {
  console.log(`Message from foo.js: `, message);
});

foo.on('error', (err) => {
    console.log(`foo.js error `,err);
});

foo.on('exit', (code) => {
    console.log(`foo.js exited with code ${code}`);
});
foo.send("hello from fork");
foo.send( { data:"Hello from foo" } );
