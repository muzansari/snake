class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.scoreElement = document.getElementById('score');
        this.startButton = document.getElementById('startButton');
        
        this.gridSize = 20;
        this.tileCount = 20;
        this.snake = [{x: 10, y: 10}];
        this.food = {x: 15, y: 15};
        this.dx = 0;
        this.dy = 0;
        this.score = 0;
        this.gameLoop = null;

        this.startButton.addEventListener('click', () => this.startGame());
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    startGame() {
        if (this.gameLoop) return;
        
        this.snake = [{x: 10, y: 10}];
        this.food = {x: 15, y: 15};
        this.dx = 1;
        this.dy = 0;
        this.score = 0;
        this.scoreElement.textContent = this.score;
        
        this.gameLoop = setInterval(() => this.update(), 150);
    }

    update() {
        // Move snake
        const head = {x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy};
        
        // Check walls
        if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
            this.gameOver();
            return;
        }

        this.snake.unshift(head);

        // Check food collision
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.scoreElement.textContent = this.score;
            this.generateFood();
        } else {
            this.snake.pop();
        }

        // Check self collision
        for (let i = 1; i < this.snake.length; i++) {
            if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
                this.gameOver();
                return;
            }
        }

        this.draw();
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw snake
        this.ctx.fillStyle = 'green';
        this.snake.forEach(segment => {
            this.ctx.fillRect(
                segment.x * this.gridSize,
                segment.y * this.gridSize,
                this.gridSize - 2,
                this.gridSize - 2
            );
        });

        // Draw food
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(
            this.food.x * this.gridSize,
            this.food.y * this.gridSize,
            this.gridSize - 2,
            this.gridSize - 2
        );
    }

    handleKeyPress(e) {
        switch(e.key) {
            case 'ArrowUp':
                if (this.dy !== 1) { this.dx = 0; this.dy = -1; }
                break;
            case 'ArrowDown':
                if (this.dy !== -1) { this.dx = 0; this.dy = 1; }
                break;
            case 'ArrowLeft':
                if (this.dx !== 1) { this.dx = -1; this.dy = 0; }
                break;
            case 'ArrowRight':
                if (this.dx !== -1) { this.dx = 1; this.dy = 0; }
                break;
        }
    }

    generateFood() {
        this.food = {
            x: Math.floor(Math.random() * this.tileCount),
            y: Math.floor(Math.random() * this.tileCount)
        };
    }

    gameOver() {
        clearInterval(this.gameLoop);
        this.gameLoop = null;
        alert(`Game Over! Score: ${this.score}`);
    }
}

// Initialize game when window loads
window.onload = () => {
    new SnakeGame();
};
