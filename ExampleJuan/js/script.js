const restartBtn = document.getElementById("restartBtn");
const injectGame = document.getElementById("injectGame");

let gameScore;
let endRound = 0;
let p1PointCount = 0;
let p2PointCount = 0;
let cpu;
let player1Turn;

restartBtn.addEventListener("click", function () {
    location.reload();
});

function loadData(url) {
    fetch(url).then((pvp) => {
        pvp.text().then(function (game) {
            if (url == "./pages/main.html") {
                injectGame.innerHTML = game;
                let cpuBtn = document.getElementById("cpuBtn");
                let pvpBtn = document.getElementById("pvpBtn");
                restartBtn.classList.add("d-none");

                cpuBtn.addEventListener("click", function () {
                    cpu = true;
                    loadData("./pages/difficulty.html");
                });
                pvpBtn.addEventListener("click", function () {
                    cpu = false;
                    loadData("./pages/difficulty.html");
                });


            }
            else if (url == "./pages/difficulty.html") {
                injectGame.innerHTML = game;

                restartBtn.classList.remove("d-none");

                let oneRound = document.getElementById("oneRound");
                let fiveRounds = document.getElementById("fiveRounds");
                let sevenRounds = document.getElementById("sevenRounds");

                function loadGameMode() {
                    if (cpu) {
                        loadData("./pages/game.html");
                    } else {
                        loadData("./pages/pvp.html");
                    }
                }

                oneRound.addEventListener("click", function () {
                    gameScore = 1;
                    loadGameMode();
                });
                fiveRounds.addEventListener("click", function () {
                    gameScore = 3;
                    loadGameMode();
                });
                sevenRounds.addEventListener("click", function () {
                    gameScore = 4;
                    loadGameMode();
                });

                
            }

            // Player vs CPU GAME MODE
            else if (url == "./pages/game.html") {
                injectGame.innerHTML = game;

                // Any game logic will go here
                const selectionButtons = document.querySelectorAll('[data-selection]');
                let p1Points = document.getElementById("p1Points");
                let p2Points = document.getElementById("p2Points");
                let makeGoAway = document.getElementById("makeGoAway");
                let p1Chose = document.getElementById("p1Chose");
                let p2Chose = document.getElementById("p2Chose");
                let nextRound = document.getElementById("nextRound");
                p1Points.innerText = p1PointCount;
                p2Points.innerText = p2PointCount;

                nextRound.addEventListener("click", function(){
                    loadData("./pages/game.html");
                });

                async function getCpuHand(selection) {
                    // GETTING RANDOM CPU HAND FROM CLASS API
                    let promiseResult = await fetch(
                        "https://csa2020studentapi.azurewebsites.net/rpsls"
                    );
                    let cpuHand = await promiseResult.text();

                    const selectionName = selection;

                    let wonRound = document.getElementById("wonRound");
                    let p1 = selectionName;
                    let p2 = cpuHand;

                    if (p1 === p2) {
                        // PLAYER 1 AND 2 TIE
                        // Change innerText of player score 
                        p1Chose.innerText = "Player: " + p1;
                        p2Chose.innerText = "CPU: " + p2;
                        wonRound.innerText = "Tie!";
                        p1Points.innerText = p1PointCount;
                        p2Points.innerText = p2PointCount;
                        p1Chose.classList.remove("d-none");
                        p2Chose.classList.remove("d-none");
                        wonRound.classList.remove("d-none");
                        nextRound.classList.remove("d-none");

                        makeGoAway.classList.add("d-none");
                    }
                    else if (
                        (p1 === "Rock" && (p2 === "Scissors" || p2 === "Lizard")) ||
                        (p1 === "Paper" && (p2 === "Rock" || p2 === "Spock")) ||
                        (p1 === "Scissors" && (p2 === "Paper" || p2 === "Lizard")) ||
                        (p1 === "Lizard" && (p2 === "Paper" || p2 === "Spock")) ||
                        (p1 === "Spock" && (p2 === "Rock" || p2 === "Scissors"))
                    ) {
                        // PLAYER 1 WINS ROUND
                        // endRound is the threshold counter
                        endRound++;
                        p1PointCount++;
                        p1Points.innerText = p1PointCount;
                        p2Points.innerText = p2PointCount;
                        p1Chose.innerText = "Player: " + p1;
                        p2Chose.innerText = "CPU: " + p2;
                        wonRound.innerText = "Player won the round!";
                        
                        p1Chose.classList.remove("d-none");
                        p2Chose.classList.remove("d-none");

                        wonRound.classList.remove("d-none");
                        nextRound.classList.remove("d-none");

                        makeGoAway.classList.add("d-none");
                    } else {
                        // PLAYER 2 WINS ROUND
                        endRound++;
                        p2PointCount++;
                        p1Points.innerText = p1PointCount;
                        p2Points.innerText = p2PointCount;
                        p1Chose.innerText = "Player: " + p1;
                        p2Chose.innerText = "CPU: " + p2;
                        wonRound.innerText = "CPU won the round!";
                        
                        p1Chose.classList.remove("d-none");
                        p2Chose.classList.remove("d-none");

                        wonRound.classList.remove("d-none");
                        nextRound.classList.remove("d-none");

                        makeGoAway.classList.add("d-none");
                    }

                    // GETS FINAL SCORE AND WINNER
                    if (p1PointCount === gameScore) {
                        showWinner();
                    }
                    if (p2PointCount === gameScore){
                        showWinner2();
                    }

                }

                function showWinner() {
                    restartBtn.classList.remove("d-none");
                    makeGoAway.classList.add("d-none");
                    nextRound.classList.add("d-none");
                    wonRound.innerText = "Player won the game!";
                }

                function showWinner2() {
                    restartBtn.classList.remove("d-none");
                    makeGoAway.classList.add("d-none");
                    nextRound.classList.add("d-none");
                    wonRound.innerText = "CPU won the game!";
                }



                selectionButtons.forEach(selectionButton => {
                    selectionButton.addEventListener("click", e => {
                        getCpuHand(selectionButton.dataset.selection);
                    })
                })

            }

            // PVP GAME MODE
            else if (url == "./pages/pvp.html") {
                injectGame.innerHTML = game;
                // Any game logic will go here
                const selectionButtons = document.querySelectorAll('[data-selection]');
                let p1Points = document.getElementById("p1Points");
                let p2Points = document.getElementById("p2Points");
                p1Points.innerText = p1PointCount;
                p2Points.innerText = p2PointCount;
                let makeGoAway = document.getElementById("makeGoAway");
                let p1Chose = document.getElementById("p1Chose");
                let p2Chose = document.getElementById("p2Chose");
                let wonRound = document.getElementById("wonRound");

                let nextRound = document.getElementById("nextRound");

                let p1, p2;

                nextRound.addEventListener("click", function(){
                    loadData("./pages/pvp.html");
                });

                selectionButtons.forEach(selectionButton => {
                    selectionButton.addEventListener("click", e => {
                        if (player1Turn) {
                            player1Turn = false;
                        } else {
                            player1Turn = true;
                        }
                        getCpuHand(selectionButton.dataset.selection);
                    })
                })

                function showWinner() {
                    restartBtn.classList.remove("d-none");
                    makeGoAway.classList.add("d-none");
                    nextRound.classList.add("d-none");
                    wonRound.innerText = "Player 1 won the game!";
                }

                function showWinner2() {
                    restartBtn.classList.remove("d-none");
                    makeGoAway.classList.add("d-none");
                    nextRound.classList.add("d-none");
                    wonRound.innerText = "Player 2 won the game!";
                }

                async function getCpuHand(selection) {
                    if (player1Turn) {
                        p1 = selection;
                        p1Chose.classList.remove("d-none");
                    } else {
                        p2 = selection;
                        p2Chose.classList.remove("d-none");
                        roundWinner();
                    }

                    function roundWinner() {
                        if (p1 === p2) {
                            // PLAYER 1 AND PLAYER 2 TIE
                            wonRound.innerText = "Tie!";
                            p1Points.innerText = p1PointCount;
                            p2Points.innerText = p2PointCount;
                            p1Chose.classList.remove("d-none");
                            p2Chose.classList.remove("d-none");
                            wonRound.classList.remove("d-none");
                            nextRound.classList.remove("d-none");

                            makeGoAway.classList.add("d-none");
                        }
                        else if (
                            (p1 === "Rock" && (p2 === "Scissors" || p2 === "Lizard")) ||
                            (p1 === "Paper" && (p2 === "Rock" || p2 === "Spock")) ||
                            (p1 === "Scissors" && (p2 === "Paper" || p2 === "Lizard")) ||
                            (p1 === "Lizard" && (p2 === "Paper" || p2 === "Spock")) ||
                            (p1 === "Spock" && (p2 === "Rock" || p2 === "Scissors"))
                        ) {
                            // PLAYER 1 WINS ROUND
                            p1PointCount++;
                            endRound++;
                            p1Chose.innerText = "P1: " + p1;
                            p2Chose.innerText = "P2: " + p2;
                            wonRound.innerText = "Player 1 won the round!";
                            p1Points.innerText = p1PointCount;
                            p2Points.innerText = p2PointCount;
                            p1Chose.classList.remove("d-none");
                            p2Chose.classList.remove("d-none");
                            wonRound.classList.remove("d-none");
                            nextRound.classList.remove("d-none");

                            makeGoAway.classList.add("d-none");
                        } else {
                            // PLAYER 2 WINS ROUND
                            p2PointCount++;
                            endRound++;
                            p1Chose.innerText = "P1: " + p1;
                            p2Chose.innerText = "P2: " + p2;
                            wonRound.innerText = "Player 2 won the round!";
                            p1Points.innerText = p1PointCount;
                            p2Points.innerText = p2PointCount;
                            p1Chose.classList.remove("d-none");
                            p2Chose.classList.remove("d-none");
                            wonRound.classList.remove("d-none");
                            nextRound.classList.remove("d-none");

                            makeGoAway.classList.add("d-none");
                        }

                        // GETS FINAL SCORE AND WINNER
                        if (p1PointCount === gameScore) {
                            showWinner();
                        }
                        if (p2PointCount === gameScore) {
                            showWinner2();
                        }

                    }

                }
            }
        });
    });
}

loadData("./pages/main.html");