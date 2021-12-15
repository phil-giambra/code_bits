
const { spawn , spawnSync } = require('child_process');

//https://nodejs.org/api/child_process.html#child_processspawncommand-args-options
let top = spawn("top",["-b", "-d", 3, "-n", 4, "-p", 0], {detached: true})


       top.on('error', (err) => {
           console.log(`TOP Spawn Error`, err);
       })
       top.stdout.on('data', (data) => {
           let lines = data.toString().split("\n")
            //console.log(lines.length);
            //console.log("-----------------------------------------------------------");
            if (lines.length >= 10){
                console.log(lines)
                lines.forEach((item, i) => {
                    // parseOutput
                });
            } else {
                //console.log(`incomplete TOP data` )
            }
        });
       top.stderr.on('data', (data) => {
           console.log(`TOP ERROR: ${data.toString()}`)
       });
       top.on('exit', (code) => {
           console.log(`TOP exited with code ${code}`);
       });


//*** Add spawnSync example
//https://nodejs.org/api/child_process.html#child_processspawnsynccommand-args-options
