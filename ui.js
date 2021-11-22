
//adding content with fragments
var el;
var i = 0;
var fragment = document.createDocumentFragment();

while (i < 200) {
    el = document.createElement('li');
    el.innerText = 'This is my list item number ' + i;
    fragment.appendChild(el);
i++; }

div.appendChild(fragment);
