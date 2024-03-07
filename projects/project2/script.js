var countdownIntervals = [];
var originalFirstContainerHTML;
var originalSecondContainerHTML;


function transferValues() {
    var timerName = document.getElementById('inputWithChoices').value;
    var time = parseInt(document.getElementById('inputTime').value);
    var world = document.getElementById('inputWorld').value;

    if (isNaN(time) || time <= 0) {
        alert("Please enter a valid positive number for time.");
        return;
    }

    var table = document.getElementById('table');
    var row = table.insertRow(-1);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerText = timerName;
    cell2.innerText = formatTime(time * 60);
    cell3.innerText = world;
    cell4.innerText = 'Running';

    document.getElementById('inputWithChoices').value = '';
    document.getElementById('inputTime').value = '';
    document.getElementById('inputWorld').value = '';

    startCountdown(time * 60, cell2, cell4, timerName, world);
}

function formatTime(seconds) {
    var hours = Math.floor(seconds / 3600);
    var remainingSeconds = seconds % 3600;
    var minutes = Math.floor(remainingSeconds / 60);
    remainingSeconds = remainingSeconds % 60;
    return hours.toString().padStart(2, '0') + ':' +
           minutes.toString().padStart(2, '0') + ':' +
           remainingSeconds.toString().padStart(2, '0');
}

function startCountdown(seconds, timeCell, statusCell, timerName, world) {
    var originalSeconds = seconds;
    var countdownInterval = setInterval(function() {
        if (seconds <= 1) {
            clearInterval(countdownInterval);
            notifyUser(timerName, world);
            statusCell.innerText = '';
            var restartButton = document.createElement('button');
            restartButton.innerText = 'Restart';
            restartButton.addEventListener('click', function() {
                restartTimer(originalSeconds, timeCell, statusCell, timerName, world);
            });
            var deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.addEventListener('click', function() {
                deleteRow(statusCell.parentElement);
            });
            statusCell.appendChild(restartButton);
            statusCell.appendChild(deleteButton);
            return;
        }

        timeCell.innerText = formatTime(seconds);
        seconds--;
    }, 1000);
    countdownIntervals.push(countdownInterval);
}

function restartTimer(seconds, timeCell, statusCell, timerName, world) {
    statusCell.innerText = 'Running';
    startCountdown(seconds, timeCell, statusCell, timerName, world);
}

function deleteRow(row) {
    row.remove();
}

function timeStringToSeconds(timeString) {
    var timeArray = timeString.split(':');
    var minutes = parseInt(timeArray[0]);
    var seconds = parseInt(timeArray[1]);
    return minutes * 60 + seconds;
}

document.addEventListener("DOMContentLoaded", function() {
    clearContainers();
});

function clearContainers() {
    console.log('clearContainers function called');
    var firstContainerContent = document.querySelector('.first-container .first-container-content');
    var secondContainerContent = document.querySelector('.second-container .second-container-content');
    console.log('First container content:', firstContainerContent);
    console.log('Second container content:', secondContainerContent);
    firstContainerContent.style.display = 'none';
    secondContainerContent.style.display = 'none';
}

function restoreContainers() {
    console.log('restoreContainers function called');
    var firstContainerContent = document.querySelector('.first-container .first-container-content');
    var secondContainerContent = document.querySelector('.second-container .second-container-content');
    console.log('First container content:', firstContainerContent);
    console.log('Second container content:', secondContainerContent);
    firstContainerContent.style.display = 'block';
    secondContainerContent.style.display = 'block';
}

function notifyUser(timerName, world) {
    if (!("Notification" in window)) {
        console.log("This browser does not support desktop notification");
    }

    else if (Notification.permission === "granted") {
        var notification = new Notification(`The ${timerName} in ${world} is claimable`);
    }

    else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                var notification = new Notification(`The ${timerName} in ${world} is claimable`);
            }
        });
    }
}
