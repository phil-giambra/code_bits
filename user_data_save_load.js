
const fs = require('fs');

// clone data only objects
function cloneObj(obj) { return JSON.parse( JSON.stringify(obj) ) }

// set up the app's  user, data and config settings
let CONFIG = { }
let SAVE = {}

const user = process.env.USER
const os_platform = process.platform
let app_data_path
if (os_platform === "win32"){
    // for windows we will convert to forward slashes like linux
    app_data_path = process.env.APPDATA.replace(/\\/g, "/")}
else {
    app_data_path = process.env.HOME
}
app_data_path += "/.project_name/"


if ( !fs.existsSync( app_data_path ) ) {
    console.log("CREATE: user data folder", app_data_path);
    fs.mkdirSync( app_data_path, { } )
    //fs.mkdirSync( app_data_path + "other_folder/subfolder", { recursive: true } )
    SAVE.config()

} else {
    if (fs.existsSync(app_data_path + "config.json")) {
        console.log('LOAD: config.json.');
        CONFIG = JSON.parse( fs.readFileSync(app_data_path + "config.json",'utf8') )
    } else {
        SAVE.config()
    }

}



SAVE.config = function(){
    fs.writeFileSync(app_data_path + "config.json", JSON.stringify(CONFIG,null,4) ) //
}


// get a folder listing and iterate over it to bring in some json data

let data = {}

if ( fs.existsSync( app_data_path + "path/to/folder" ) ) {
    let filelist =  fs.readdirSync(app_data_path + "path/to/folder")
    for (var i = 0; i < filelist.length; i++) {
        let id = filelist[i].replace(".json", "")
        if ( fs.existsSync( "path/to/folder"+filelist[i] ) ) {
            data[id] = JSON.parse( fs.readFileSync(app_data_path + "path/to/folder"+filelist[i],'utf8') )
        }

    }

} else {
    // create the data folder if it dosen't exist
    fs.mkdirSync( app_data_path + "path/to/folder" , { recursive:true } )
}
