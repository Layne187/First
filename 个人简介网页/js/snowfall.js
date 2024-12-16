class Snowfall {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        // 鼠标位置
        this.mouse = {
            x: 0,
            y: 0,
            moveX: 0,
            moveY: 0,
            radius: 200  // 增加鼠标影响范围
        };

        // 设置画布样式
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1000';

        // 添加到页面
        document.body.appendChild(this.canvas);

        // 初始化雪花数组
        this.snowflakes = [];

        // 添加渐变效果
        this.gradient = null;

        // 设置画布大小
        this.resize();
        this.createGradient();
        this.createSnowflakes();
        this.animate();

        // 事件监听
        window.addEventListener('resize', () => {
            this.resize();
            this.createGradient();
        });
        this.addMouseTracking();
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    addMouseTracking() {
        let lastX = 0;
        let lastY = 0;

        document.addEventListener('mousemove', (e) => {
            // 计算鼠标移动速度
            this.mouse.moveX = e.clientX - lastX;
            this.mouse.moveY = e.clientY - lastY;

            // 更新鼠标位置
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;

            lastX = e.clientX;
            lastY = e.clientY;
        });

        // 添加鼠标离开事件
        document.addEventListener('mouseleave', () => {
            this.mouse.x = -1000;
            this.mouse.y = -1000;
        });
    }

    createGradient() {
        this.gradient = this.ctx.createRadialGradient(
            this.width / 2, this.height / 2, 0,
            this.width / 2, this.height / 2, this.width / 2
        );
        this.gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        this.gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
        this.gradient.addColorStop(1, 'rgba(255, 255, 255, 0.4)');
    }

    createSnowflakes() {
        const numberOfSnowflakes = Math.floor((this.width * this.height) / 10000);

        for (let i = 0; i < numberOfSnowflakes; i++) {
            this.snowflakes.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                radius: Math.random() * 5 + 2,  // 更大的雪花
                speed: Math.random() * 2 + 0.5,
                swing: Math.random() * 0.2 + 0.1,
                wobble: Math.random() * Math.PI * 2,
                wobbleSpeed: Math.random() * 0.02,
                opacity: Math.random() * 0.6 + 0.4,  // 更明显的雪花
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.03,  // 更快的旋转
                glowing: false,
                glowIntensity: 0
            });
        }
    }

    moveSnowflakes() {
        this.snowflakes.forEach(flake => {
            // 基础运动
            flake.wobble += flake.wobbleSpeed;
            flake.rotation += flake.rotationSpeed;
            flake.y += flake.speed * (1 + Math.sin(flake.wobble) * 0.3);
            flake.x += Math.sin(flake.wobble) * 1.5;

            // 鼠标交互
            const dx = flake.x - this.mouse.x;
            const dy = flake.y - this.mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.mouse.radius) {
                const force = (this.mouse.radius - distance) / this.mouse.radius;
                const angle = Math.atan2(dy, dx);

                // 推开效果
                flake.x += Math.cos(angle) * force * 8;
                flake.y += Math.sin(angle) * force * 8;

                // 发光效果
                flake.glowing = true;
                flake.glowIntensity = force * 1.5;  // 更强的发光
                flake.rotationSpeed += force * 0.1;
            } else {
                flake.glowing = false;
                flake.glowIntensity = Math.max(0, flake.glowIntensity - 0.02);
                flake.rotationSpeed *= 0.95;
            }

            // 边界检查
            if (flake.y > this.height) {
                flake.y = -10;
                flake.x = Math.random() * this.width;
                flake.speed = Math.random() * 2 + 0.5;
                flake.rotation = Math.random() * Math.PI * 2;
                flake.rotationSpeed = (Math.random() - 0.5) * 0.02;
            }
            if (flake.x > this.width) flake.x = 0;
            if (flake.x < 0) flake.x = this.width;
        });
    }

    drawSnowflakes() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.snowflakes.forEach(flake => {
            this.ctx.save();

            // 设置透明度和发光效果
            const glowEffect = flake.glowIntensity * 0.7;
            this.ctx.globalAlpha = flake.opacity + glowEffect;

            // 绘制雪花
            this.ctx.translate(flake.x, flake.y);
            this.ctx.rotate(flake.rotation);

            // 发光效果
            if (flake.glowIntensity > 0) {
                this.ctx.shadowColor = 'white';
                this.ctx.shadowBlur = 10 * flake.glowIntensity;
            }

            // 绘制六角雪花
            this.drawSnowflakeShape(0, 0, flake.radius);

            this.ctx.restore();
        });
    }

    drawSnowflakeShape(x, y, radius) {
        const spikes = 6;
        const inset = 0.4;  // 更明显的六角形

        this.ctx.beginPath();
        this.ctx.moveTo(x + radius, y);

        for (let i = 0; i < spikes * 2; i++) {
            const angle = (i * Math.PI) / spikes;
            const r = i % 2 === 0 ? radius : radius * inset;
            const currX = x + Math.cos(angle) * r;
            const currY = y + Math.sin(angle) * r;
            this.ctx.lineTo(currX, currY);
        }

        // 添加内部装饰
        for (let i = 0; i < spikes; i++) {
            const angle = (i * Math.PI * 2) / spikes;
            const innerRadius = radius * 0.3;
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(
                x + Math.cos(angle) * innerRadius,
                y + Math.sin(angle) * innerRadius
            );
        }

        this.ctx.fillStyle = this.gradient;
        this.ctx.fill();
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        this.ctx.stroke();
    }

    animate() {
        this.moveSnowflakes();
        this.drawSnowflakes();
        requestAnimationFrame(() => this.animate());
    }
}

// 初始化
window.addEventListener('DOMContentLoaded', () => {
    new Snowfall();
}); 