const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

// خزمەتکردنی فایلە گرافیکییەکان
app.use(express.static(path.join(__dirname, '.')));

let multiplier = 1.00;
let gameState = "WAITING"; // WAITING, FLYING, CRASHED
let history = [];

function startRound() {
    multiplier = 1.00;
    gameState = "FLYING";
    
    // ئەلگۆریتمی دیاریکردنی کاتی تەقینەوە (ڕاستەقینە)
    const crashPoint = (Math.random() * 3 + 1.1).toFixed(2);
    console.log(`Round started. Will crash at: ${crashPoint}`);

    const timer = setInterval(() => {
        if (multiplier >= parseFloat(crashPoint)) {
            clearInterval(timer);
            gameState = "CRASHED";
            history.push(multiplier.toFixed(2));
            if (history.length > 10) history.shift();
            
            io.emit('crash', { multiplier: multiplier.toFixed(2), history });
            
            // ٥ چرکە وەستان بۆ خولی داهاتوو
            setTimeout(startRound, 5000);
        } else {
            multiplier += 0.01;
            io.emit('tick', { multiplier: multiplier.toFixed(2) });
        }
    }, 100);
}

// کاتێک یاریزانێک پەیوەندی دەکات
io.on('connection', (socket) => {
    socket.emit('init', { multiplier: multiplier.toFixed(2), history, gameState });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    startRound();
});
