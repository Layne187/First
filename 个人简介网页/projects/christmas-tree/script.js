class ChristmasTree {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.snow = [];
        this.ornaments = [];
        this.showDecorations = true;
        this.showSnow = true;
        this.music = new Audio('https://music.163.com/song/media/outer/url?id=1387581250.mp3');
        this.music.loop = true;
        this.music.volume = 0.5;
        this.clickSound = new Audio('https://www.soundjay.com/button/sounds/button-09.mp3');
        this.clickSound.volume = 0.3;
        this.music.addEventListener('error', () => {
            console.error('音乐加载失败');
            document.getElementById('musicToggle').style.display = 'none';
        });
        this.musicPlaying = false;
        this.stars = [];

        this.resize();
        this.init();
        this.bindEvents();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        // 创建雪花
        for (let i = 0; i < 100; i++) {
            this.snow.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 3 + 1,
                speed: Math.random() * 3 + 1,
                wind: Math.random() * 2 - 1
            });
        }

        // 创建装饰品
        const colors = ['#ff6b6b', '#ffd93d', '#6c5ce7', '#a8e6cf', '#fdcb6e'];
        for (let i = 0; i < 30; i++) {
            this.ornaments.push({
                x: this.canvas.width / 2 + (Math.random() - 0.5) * 200,
                y: this.canvas.height / 2 + (Math.random() - 0.5) * 300,
                color: colors[Math.floor(Math.random() * colors.length)],
                radius: Math.random() * 5 + 3,
                angle: Math.random() * Math.PI * 2,
                swing: Math.random() * 0.1
            });
        }

        // 创建星星
        for (let i = 0; i < 50; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * (this.canvas.height / 2),
                size: Math.random() * 2 + 1,
                flicker: Math.random() * 0.2 + 0.8
            });
        }
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());

        this.canvas.addEventListener('click', () => {
            this.clickSound.currentTime = 0;
            this.clickSound.play().catch(err => console.log('点击音效播放失败'));
        });

        document.getElementById('musicToggle').addEventListener('click', () => {
            if (this.musicPlaying) {
                this.music.pause();
                document.getElementById('musicToggle').textContent = '🎵 播放音乐';
                document.getElementById('musicToggle').style.background = 'rgba(255, 255, 255, 0.1)';
            } else {
                this.music.play().catch(() => {
                    alert('请允许网页播放音乐！');
                });
                document.getElementById('musicToggle').textContent = '🎵 停止音乐';
                document.getElementById('musicToggle').style.background = 'rgba(255, 166, 0, 0.2)';
            }
            this.musicPlaying = !this.musicPlaying;
        });

        document.getElementById('snowToggle').addEventListener('click', () => {
            this.showSnow = !this.showSnow;
            document.getElementById('snowToggle').textContent =
                this.showSnow ? '❄️ 雪花关闭' : '❄️ 雪花开启';
        });

        document.getElementById('decorateToggle').addEventListener('click', () => {
            this.showDecorations = !this.showDecorations;
            document.getElementById('decorateToggle').textContent =
                this.showDecorations ? '🎄 装饰关闭' : '🎄 装饰开启';
        });
    }

    drawStars() {
        this.ctx.fillStyle = '#fff';
        for (let star of this.stars) {
            star.flicker = Math.sin(Date.now() * 0.01 + star.x) * 0.2 + 0.8;
            this.ctx.globalAlpha = star.flicker;
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            this.ctx.fill();
        }
        this.ctx.globalAlpha = 1;
    }

    drawSnow() {
        if (!this.showSnow) return;

        this.ctx.fillStyle = 'white';
        for (let flake of this.snow) {
            this.ctx.beginPath();
            this.ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
            this.ctx.fill();

            flake.y += flake.speed;
            flake.x += flake.wind;

            if (flake.y > this.canvas.height) {
                flake.y = 0;
                flake.x = Math.random() * this.canvas.width;
            }
            if (flake.x > this.canvas.width) flake.x = 0;
            if (flake.x < 0) flake.x = this.canvas.width;
        }
    }

    drawOrnaments() {
        if (!this.showDecorations) return;

        for (let ornament of this.ornaments) {
            ornament.angle += ornament.swing;
            const wobble = Math.sin(ornament.angle) * 5;

            this.ctx.fillStyle = ornament.color;
            this.ctx.shadowColor = ornament.color;
            this.ctx.shadowBlur = 15;
            this.ctx.beginPath();
            this.ctx.arc(ornament.x + wobble, ornament.y, ornament.radius, 0, Math.PI * 2);
            this.ctx.fill();
        }
        this.ctx.shadowBlur = 0;
    }

    drawTree() {
        const centerX = this.canvas.width / 2;
        const bottomY = this.canvas.height * 0.9;

        // 树干
        this.ctx.fillStyle = '#4a2f23';
        this.ctx.fillRect(centerX - 20, bottomY - 50, 40, 50);

        // 树叶
        this.ctx.fillStyle = '#2d5a27';
        for (let i = 0; i < 3; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, bottomY - 100 - i * 100);
            this.ctx.lineTo(centerX - 100 + i * 20, bottomY - 50 - i * 100);
            this.ctx.lineTo(centerX + 100 - i * 20, bottomY - 50 - i * 100);
            this.ctx.closePath();
            this.ctx.fill();
        }

        // 树顶星星
        this.ctx.fillStyle = '#ffd700';
        this.ctx.shadowColor = '#ffd700';
        this.ctx.shadowBlur = 20;
        const starY = bottomY - 350;
        this.drawStar(centerX, starY, 20, 5, 0.5);
        this.ctx.shadowBlur = 0;
    }

    drawStar(cx, cy, spikes, outerRadius, innerRadius) {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        let step = Math.PI / spikes;

        this.ctx.beginPath();
        this.ctx.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            this.ctx.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            this.ctx.lineTo(x, y);
            rot += step;
        }
        this.ctx.lineTo(cx, cy - outerRadius);
        this.ctx.closePath();
        this.ctx.fill();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 绘制背景
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#0f2027');
        gradient.addColorStop(1, '#2c5364');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawStars();
        this.drawSnow();
        this.drawTree();
        this.drawOrnaments();

        requestAnimationFrame(() => this.animate());
    }
}

// 初始化
window.addEventListener('DOMContentLoaded', () => {
    new ChristmasTree();
}); 