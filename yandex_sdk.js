let ysdk;
const movesSpan = document.getElementById('move-span');
const timeSpan = document.getElementById('time-span');
const restartSpan = document.getElementById('restart-span');

function initSDK() {

    // console.log("Yandex SDK start initialization");
    YaGames.init()
        .then((_sdk) => {
            ysdk = _sdk;
            window.ysdk = ysdk;
            // console.log("Yandex SDK initialized");
            yandexLanguages();
            initializeGame();
            gameReady();
            showAd();

            // console.log("Game initialized");
            // console.log("Environment", ysdk.environment);

            // callback(ysdk.environment);
        })
        .catch((err) => {
            // console.log(err);
            // console.log("Game initialization error");
        });
}

function gameReady() {
    ysdk.features.LoadingAPI?.ready();
    // console.log("Game ready");
}

function gameplayStarted() {
    ysdk.features.GameplayAPI?.start();
    // console.log("Gameplay started (js)");
}

function gameplayStopped() {
    ysdk.features.GameplayAPI?.stop();
    // console.log("Gameplay stopped (js)");
}

function yandexLanguages() {

    if (ysdk.environment.i18n.lang === "ru") {
        restartSpan.innerHTML = 'Рестарт';
        movesSpan.innerHTML = 'Шаги: ';
        timeSpan.innerHTML = 'Время: ';
    } else {
        restartSpan.innerHTML = 'Restart';
        movesSpan.innerHTML = 'Moves: ';
        timeSpan.innerHTML = 'Time: ';
    }

    // else if(ysdk.environment.i18n.lang === "en") {
    //
    // }
}

// function showAd(callback) {
function showAd() {
    // console.log("Show ad");
    ysdk.adv.showFullscreenAdv({
        callbacks: {
            onClose: function (wasShown) {
                // callback("closed");
                // console.log("Ad shown");
            },
            onError: function (error) {
                // callback("error");
                // console.log("Ad error", error);
            },
            onOpen: function () {
                // callback("opened");
                // console.log("Ad open");
            },
            onOffline: function () {
                // callback("offline");
                // console.log("Ad offline");
            },
        },
    });
}

initSDK();