let count = 0;
let cardsRemaining = 416;
let cardsDealt = 0;
let cards26 = 160;
let cards79 = 96;
let cards10A = 160;

function calculatePercentages() {
    let totalCards = cards26 + cards79 + cards10A;

    let percent26 = (cards26 / totalCards) * 100;
    let percent79 = (cards79 / totalCards) * 100;
    let percent10A = (cards10A / totalCards) * 100;

    document.getElementById('display26').value = percent26.toFixed(2) + '%';
    document.getElementById('display79').value = percent79.toFixed(2) + '%';
    document.getElementById('display10A').value = percent10A.toFixed(2) + '%';
}

function appendtodisplay(value) {
    let betUnit;
    let trueCount;
    if (value === 'Reset') {
        count = 0;
        cardsRemaining = 416;
        cardsDealt = 0;
        betUnit = '';
        trueCount = '';
        cards26 = 160;
        cards79 = 96;
        cards10A = 160;
    } else {
        count += parseInt(value);
        if (value !== 'Reset') {
            cardsRemaining -= 1;
            cardsDealt += 1;
        }
        trueCount = Math.round(count / (cardsRemaining / 52));
        if (trueCount < 0) {
            betUnit = 'GO AWAY!';
        } else if (trueCount <= 1) {
            betUnit = 1;
        } else if (trueCount === 2) {
            betUnit = 2;
        } else if (trueCount === 3) {
            betUnit = 4;
        } else if (trueCount >= 4) {
            betUnit = 8;
        }

        if (value === '+1') {
            cards26 -= 1;
        } else if (value === '0') {
            cards79 -= 1;
        } else if (value === '-1') {
            cards10A -= 1;
        }
    }
    document.getElementById('countDisplay').value = count;
    document.getElementById('remainingDisplay').value = cardsRemaining;
    document.getElementById('dealtDisplay').value = cardsDealt;
    document.getElementById('trueCountDisplay').value = trueCount;
    document.getElementById('betUnitDisplay').value = betUnit;

    calculatePercentages();
}

window.addEventListener('keydown', function(event) {
    if (event.key === '1') {
        document.querySelector('button[onclick="appendtodisplay(\'+1\')"]').click();
    }
    if (event.key === '2') {
        document.querySelector('button[onclick="appendtodisplay(\'-1\')"]').click();
    }
    if (event.key === '3') {
        document.querySelector('button[onclick="appendtodisplay(\'0\')"]').click();
    }
    if (event.key === '4') {
        document.querySelector('button[onclick="appendtodisplay(\'Reset\')"]').click();
    }
});