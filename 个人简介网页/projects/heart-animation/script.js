class HeartAnimation {
    constructor() {
        this.container = document.querySelector('.container');
        this.createBackgroundHearts();
        this.bindEvents();
    }

    createBackgroundHearts() {
        const background = document.createElement('div');
        background.className = 'background-hearts';
        this.container.appendChild(background);

        // 创建背景爱心
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart bg-heart';
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.animationDelay = `${Math.random() * 20}s`;
            heart.style.opacity = `${Math.random() * 0.3}`;
            heart.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
            background.appendChild(heart);
        }
    }

    bindEvents() {
        this.container.addEventListener('click', (e) => {
            this.createHeart(e.clientX, e.clientY);
            this.createParticles(e.clientX, e.clientY);
        });
    }

    createHeart(x, y) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = `${x - 25}px`;
        heart.style.top = `${y - 25}px`;
        this.container.appendChild(heart);

        heart.style.animation = 'pulse 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) forwards';

        setTimeout(() => {
            heart.remove();
        }, 1500);
    }

    createParticles(x, y) {
        const colors = ['#ff6b6b', '#ff8787', '#ffa8a8', '#fff'];
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            const size = Math.random() * 12 + 6;
            const angle = (Math.random() * 360) * Math.PI / 180;
            const velocity = Math.random() * 150 + 80;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];

            const animation = particle.animate([
                {
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                fill: 'forwards'
            });

            this.container.appendChild(particle);

            animation.onfinish = () => particle.remove();
        }
    }
}

// 初始化
window.addEventListener('DOMContentLoaded', () => {
    new HeartAnimation();
}); 