const canvas = 
document.getElementById('game'); 
const ctx = canvas.getContext('2d'); 
const grid = 15; 
let color = 'lime'; 
let dx = grid; 
let dy = 0; 
let score = 0; 
let highscore = localStorage.getItem('highscore') || 0; 
let count = 0; 
let snake = [{ x: 150, y: 150 }]; 
let apple = { x: 180, y: 180 }; 
let dieOnWall = true; 

document.getElementById('highscore').innerText = highscore; 

function randomPosition() { 
    return Math.floor(Math.random() * 20) * grid; 
} 

function prepareGame(selectedColor) { color = selectedColor; 
    document.getElementById('colorSelect').style.display = 'none'; 
    document.getElementById('wallOption').style.display = 'block'; 
} 

function setWallOption(shouldDie) { dieOnWall = shouldDie; 
    document.getElementById('wallOption').style.display = 'none'; 
    document.getElementById('startScreen').style.display = 'block'; 
} 

function startGame() { 
    document.getElementById('startScreen').style.display = 'none'; 
    document.getElementById('gameArea').style.display = 'flex'; 
    requestAnimationFrame(gameLoop); 
} 

document.addEventListener('keydown', function(e) { 
    
    if (e.key === 'ArrowLeft' && dx === 0) { dx = -grid; dy = 0; } 
    else if (e.key === 'ArrowUp' && dy === 0) { dx = 0; dy = -grid; }
    else if (e.key === 'ArrowRight' && dx === 0) { dx = grid; dy = 0; } 
    else if (e.key === 'ArrowDown' && dy === 0) { dx = 0; dy = grid; } 
}); 

function move(direction) { 
    if (direction === 'left' && dx === 0) { dx = -grid; dy = 0; }
else if (direction === 'up' && dy === 0) { dx = 0; dy = -grid; } 
else if (direction === 'right' && dx === 0) { dx = grid; dy = 0; } 
else if (direction === 'down' && dy === 0) { dx = 0; dy = grid; } 
} 


function gameLoop() { 
    requestAnimationFrame(gameLoop); 
    if (++count < 5) return; 
    count = 0; 

    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    let head = { x: snake[0].x + dx, y: snake[0].y + dy }; 
    
    if (!dieOnWall) { 
        head.x = (head.x + canvas.width) % canvas.width; 
        head.y = (head.y + canvas.height) % canvas.height; 
    } else { 
        if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) { 
            return endGame(); 
        } 
    } snake.unshift(head); 
    
    if (snake.slice(1).some(seg => seg.x === head.x && seg.y === head.y)) { 
        return endGame(); 
    } 
    if (head.x === apple.x && head.y === apple.y) {
         score++; 
         
         document.getElementById('score').innerText = score; 
         apple = { x: randomPosition(), y: randomPosition() }; 
        } else { 
            snake.pop(); 
        } 
        
        ctx.fillStyle = 'red'; 
        ctx.fillRect(apple.x, apple.y, grid - 1, grid - 1); 
        
        ctx.fillStyle = color; 
        for (let segment of snake) { ctx.fillRect(segment.x, segment.y, grid - 1, grid - 1); 

        } 
    } 
    function endGame() {
        if (score > highscore) { 
            localStorage.setItem('highscore', score); 
            document.getElementById('highscore').innerText = score; 
        } 
        alert("Game Over!"); 
        score = 0; 
        document.getElementById('score').innerText = 0; 
        snake = [{ x: 150, y: 150 }]; 
        dx = grid; 
        dy = 0; 
        apple = { x: randomPosition(), y: randomPosition() }; 
    }



