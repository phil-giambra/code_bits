let _Dom_ids = {
    "somediv_1":document.getElementById("somediv_1"),
    "somediv_2":document.getElementById("somediv_2")

}

let BYID = function(id) {
    if ( _Dom_ids[id] ) { return _Dom_ids[id] }
    else { return document.getElementById(id) }
}

let cloneObj = function(obj) { return JSON.parse(JSON.stringify(obj))}


function togglePic(id) {
    BYID("pic_" + id).classList.toggle("not_visible");
}
