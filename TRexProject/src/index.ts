import * as s from './components/Box.css'

var element = document.getElementById('box');
var left = 0;

var animateCallback = function () {
    element.style.marginLeft = (++left) + 'px';

    // clear interval after 60 frame is moved
    if (left == 60) {
        clearInterval(interval);
    }
}

var interval = setInterval(animateCallback, (1000 / 60));