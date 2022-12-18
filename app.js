window.addEventListener('DOMContentLoaded', event => {
    const minutesField = document.querySelector('.time--container__minutes');
    const secondsField = document.querySelector('.time--container__seconds');
    const startBtn = document.querySelector('.btn--start');
    const stopBtn = document.querySelector('.btn--stop');
    const resetBtn = document.querySelector('.btn--reset');
    let activeItem = document.querySelector('.active--item');
    const sound = new Audio('/sound.wav');
    const periods = document.querySelectorAll('li');
    // console.log(periods);

    periods.forEach(period => {
        period.addEventListener('click', event => {
            activeItem.classList.remove('active--item');
            period.classList.add('active--item');
            activeItem = period;
            setTimeLeft();
            displayTime(timeLeft);
        });
    });

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
    let timeLeft;
    function setTimeLeft () {
        if (activeItem.dataset.property === "engage") {
            timeLeft = 2700;
        } else if (activeItem.dataset.property === "short-break") {
            timeLeft = 600;
        } else {
            timeLeft = 1800;
        }
    }
    setTimeLeft();
    // console.log(activeItem.dataset.property);
    displayTime(timeLeft);

    function initialState() {
        setTimeLeft();
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
