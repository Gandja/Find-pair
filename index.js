let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");
let totalSeconds = 0;
let arrColor = ['red', 'darkturquoise', 'dimgray', 'Yellow', 'chartreuse', 'Brown', 'indigo', 'hotpink'];
let countColor = [2, 2, 2, 2, 2, 2, 2, 2];
let backColor = [];
let openedPair = [];
let timeFlag = true;
let startTime;

for (let i = 0; i < 16; i++) {
    document.getElementById(i).disabled = true;
}

function start() {
    countColor = [2, 2, 2, 2, 2, 2, 2, 2];
    randomColor();
    startTime = setInterval(setTime, 1000);
    document.getElementById("start").disabled = true;
    document.getElementById("reset").disabled = true;
    for (let i = 0; i < 16; i++) {
        document.getElementById(i).disabled = false;
    }

}

function stop() {
    timeFlag = false;
    clearInterval(startTime);
    document.getElementById("reset").disabled = false;
    for (let i = 0; i < 16; i++) {
        document.getElementById(i).disabled = true;
    }
}

function reset() {
    seconds.innerHTML = '00';
    minutes.innerHTML = '00';
    totalSeconds = 0;
    document.getElementById("start").disabled = false;
    for (let i = 0; i < 16; i++) {
        document.getElementById(i).style.backgroundColor = '#e5e5e5';
        document.getElementById(i).disabled = true;
    }
    timeFlag = true;
}

function setTime() {
    if (timeFlag) {
        ++totalSeconds;
        seconds.innerHTML = pad(totalSeconds % 60);
        minutes.innerHTML = pad(parseInt(totalSeconds / 60));
    }

}

function pad(val) {

    let valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }

}

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

function randomColor() {
    for (let i = 0; i < 16; i++) {
        while (true) {
            let color = randomInteger(0, 7);
            if (countColor[color] > 0) {
                countColor[color]--;
                backColor[i] = color;
                break;
            }
        }
    }
}
//onclick open color and compare
function turn(index) {
    if (openedPair.length === 0 || openedPair.length === 1) {
        document.getElementById(index).style.backgroundColor = arrColor[backColor[index]];
        openedPair.push(index);
    } else if (openedPair.length >= 2) {

        if (backColor[openedPair[0]] === backColor[openedPair[1]]) {
            openedPair.pop();
            openedPair.pop();
        } else {
            document.getElementById(openedPair[1]).style.backgroundColor = '#e5e5e5';
            document.getElementById(openedPair[0]).style.backgroundColor = '#e5e5e5';
            openedPair.pop();
            openedPair.pop();
        }
    }
}

