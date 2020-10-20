
const fs = require('fs');

// clone data only objects
function cloneObj(obj) { return JSON.parse( JSON.stringify(obj) ) }

// set up the app's  user, data and config settings
let CONFIG = { }
let SAVE = {}

const user = process.env.USER
const os_platform = process.platform
let configbase
if (os_platform === "win32"){
    configbase = process.env.APPDATA.replace(/\\/g, "/")}
else {
    configbase = process.env.HOME
}
configbase += "/.project_name/"


if ( !fs.existsSync( configbase ) ) {
    console.log("CREATE: config folder", configbase);
    fs.mkdirSync( configbase, { } )
    //fs.mkdirSync( configbase + "other_folder/subfolder", { recursive: true } )

    SAVE.config()

} else {
    if (fs.existsSync(configbase + "config.json")) {
        console.log('LOAD: config.json.');
        CONFIG = JSON.parse( fs.readFileSync(configbase + "config.json",'utf8') )
    } else {
        SAVE.config()
    }

}



SAVE.config = function(){
    fs.writeFileSync(configbase + "config.json", JSON.stringify(CONFIG,null,4) ) //
}

// get a folder listing and iterate over it to bring in some json data
let data = {}
if ( fs.existsSync( "path/to/folder" ) ) {
    let filelist =  fs.readdirSync("path/to/folder")
    for (var i = 0; i < filelist.length; i++) {
        let uuid = filelist[i].replace(".json", "")
        if ( fs.existsSync( "path/to/folder"+filelist[i] ) ) {
            data[uuid] = JSON.parse( fs.readFileSync("path/to/folder"+filelist[i],'utf8') )
        }

    }
} else {
    // create the data folder if needed
    fs.mkdirSync( "path/to/folder" , { recursive:true } )
}
