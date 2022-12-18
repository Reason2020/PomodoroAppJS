window.addEventListener('DOMContentLoaded', event => {
    const minutesField = document.querySelector('.time--container__minutes');
    const secondsField = document.querySelector('.time--container__seconds');
    const startBtn = document.querySelector('.btn--start');
    const stopBtn = document.querySelector('.btn--stop');
    const resetBtn = document.querySelector('.btn--reset');
    const sound = new Audio('/sound.wav');


    function displayTime (timeLeft) {
        let minutesLeft = Math.floor(timeLeft / 60);
        let secondsLeft = timeLeft % 60;
        if (minutesLeft >= 10) {
            minutesField.textContent = `${minutesLeft}`;
        } else {
            minutesField.textContent = `0${minutesLeft}`;
        }

        if (secondsLeft >= 10) {
            secondsField.textContent = `${secondsLeft}`;
        } else {
            secondsField.textContent = `0${secondsLeft}`;
        }
    }

    //Initial State
    let timeLeft = 900;
    displayTime(timeLeft);

    function initialState() {
        timeLeft = 900;
        displayTime(timeLeft);
    }

    // initialState();

    function startTimer() {
        timeLeft--
        displayTime(timeLeft);
    }

    startBtn.addEventListener('click', event => {
        const timerId = setInterval(() => {
            startTimer();
            if (timeLeft === 0) {
                sound.play();
                console.log("Alarm Plays Here...");
                clearInterval(timerId);
            }
        }, 1000);

        stopBtn.addEventListener('click', event => {
            clearInterval(timerId);
        });

        resetBtn.addEventListener('click', event => {
            initialState();
        })
    })
})
