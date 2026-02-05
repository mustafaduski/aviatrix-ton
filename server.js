const io = require('socket.io')(process.env.PORT || 3000, {
    cors: { origin: "*" }
});

let gameData = {
    multiplier: 1.00,
    status: "WAITING", // WAITING, FLYING, CRASHED
    history: []
};

function startGame() {
    gameData.multiplier = 1.00;
    gameData.status = "FLYING";
    
    // دیاریکردنی کاتی تەقینەوە (وەک کۆمپانیاکان بە ئەلگۆریتم)
    const crashAt = (Math.random() * 5 + 1).toFixed(2); 

    const interval = setInterval(() => {
        if (gameData.multiplier >= crashAt) {
            clearInterval(interval);
            gameData.status = "CRASHED";
            gameData.history.push(gameData.multiplier.toFixed(2));
            io.emit('crash', gameData.multiplier.toFixed(2));
            
            setTimeout(startGame, 5000); // ٥ چرکە چاوەڕێ دەکات بۆ خولی نوێ
        } else {
            gameData.multiplier += 0.01;
            io.emit('tick', gameData.multiplier.toFixed(2));
        }
    }, 100);
}

startGame();
