class ClickSound {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        document.addEventListener('click', () => this.playSound());
    }

    playSound() {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);

        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }
}

// 初始化点击音效
window.addEventListener('DOMContentLoaded', () => {
    new ClickSound();
}); 