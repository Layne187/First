class EmojiEffect {
    constructor() {
        this.emojis = ['😀', '😊', '🎉', '✨', '💫', '💖', '🌟', '⭐', '🎨', '🎭', '🎪', '🎯', '🎲', '🎮'];
        this.container = document.createElement('div');
        this.container.style.position = 'fixed';
        this.container.style.pointerEvents = 'none';
        this.container.style.zIndex = '9999';
        document.body.appendChild(this.container);

        this.lastX = 0;
        this.lastY = 0;
        this.lastEmoji = 0;
        this.minInterval = 100; // 两个emoji之间的最小时间间隔（毫秒）

        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            // 检查鼠标移动距离和时间间隔
            const now = Date.now();
            const distance = Math.sqrt(
                Math.pow(e.clientX - this.lastX, 2) +
                Math.pow(e.clientY - this.lastY, 2)
            );

            if (distance > 30 && now - this.lastEmoji >= this.minInterval) {
                this.createEmoji(e.clientX, e.clientY);
                this.lastX = e.clientX;
                this.lastY = e.clientY;
                this.lastEmoji = now;
            }
        });
    }

    createEmoji(x, y) {
        const emoji = document.createElement('div');
        emoji.textContent = this.emojis[Math.floor(Math.random() * this.emojis.length)];
        emoji.style.position = 'fixed';
        emoji.style.left = `${x}px`;
        emoji.style.top = `${y}px`;
        emoji.style.fontSize = '16px';
        emoji.style.userSelect = 'none';
        emoji.style.transform = 'translate(-50%, -50%)';
        emoji.style.animation = 'emojiFloat 1s ease-out forwards';

        this.container.appendChild(emoji);

        // 1秒后移除emoji元素
        setTimeout(() => {
            emoji.remove();
        }, 1000);
    }
}

// 添加动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes emojiFloat {
        0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -150%) scale(1.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 初始化效果
window.addEventListener('DOMContentLoaded', () => {
    new EmojiEffect();
}); 