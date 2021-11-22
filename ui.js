
// adding content with fragments
// SOURCE: https://coderwall.com/p/o9ws2g/why-you-should-always-append-dom-elements-using-documentfragments

var el;
var i = 0;
var fragment = document.createDocumentFragment();

while (i < 200) {
    el = document.createElement('li');
    el.innerText = 'This is my list item number ' + i;
    fragment.appendChild(el);
i++; }

div.appendChild(fragment);


// using .append() to add content
// SOURCE: https://dev.to/prof3ssorst3v3/dom-methods-append-vs-appendchild-1lf3

let head = document.createElement('h2');
head.textContent = 'The Section Heading';
let p1 = '<p class="recent">This is <em>NEW</em> content.</p>';
let p2 = document.createElement('p');
let img = document.createElement('img');
img.src = 'http://www.example.com/image.jpg';
p2.append(img);

let div = document.getElementById('main');
div.append(head, p1, p2);

/*
A comparison of methods
SOURCE: https://stackoverflow.com/questions/2305654/innerhtml-vs-appendchildtxtnode

The latter (appendChild) does not cause a complete rebuild of the DOM 
or even all of the elements/nodes within the target.

The former (setting innerHTML) does cause a complete rebuild of the 
content of the target element, which if you're appending is unnecessary.

Appending via innerHTML += content makes the browser run through all of 
the nodes in the element building an HTML string to give to the JavaScript layer. 
Your code then appends text to it and sets innerHTML, causing the browser to drop 
all of the old nodes in the target, re-parse all of that HTML, and build new nodes. 
So in that sense, it may not be efficient. (However, parsing HTML is what browsers 
do and they're really, really fast at it.)

Setting innerHTML does indeed invalidate any references to elements within the target 
element you may be holding -- because those elements don't exist anymore, you removed 
them and then put in new ones (that look very similar) when you set innerHTML.

In short, if you're appending, I'd use appendChild (or insertAdjacentHTML, see below). 
If you're replacing, there are very valid situations where using innerHTML is a better 
option than creating the tree yourself via the DOM API (speed being chief amongst them).

Finally, it's worth mentioning insertAdjacentHTML, which is a function that you can use 
to insert nodes and elements into or next to an element using an HTML string. You can 
append to an element with it: theElement.insertAdjacentHTML("beforeend", "the HTML goes here"); 
The first argument is where to put the HTML; your choices are 

"beforebegin" (outside the element, just in front of it), 
"afterbegin" (inside the element, at the beginning), 
"beforeend" (inside the element, at the end), and 
"afterend" (outside the element, just in after it). 

Note that "afterbegin" and "beforeend" insert into the element itself, 
whereas "beforebegin" and "afterend" insert into the element's parent. 
Supported by all major desktop browsers, I have no idea how good mobile 
support is (although I'm sure iOS Safari and Android 2.x and up have it, 
at least), but the shim is tiny.
*/
