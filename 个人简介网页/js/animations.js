// 监听滚动事件，触发动画
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.scroll-fade, .scroll-trigger');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // 如果是技能条，设置进度
                if (entry.target.classList.contains('skill-bar')) {
                    const progress = entry.target.querySelector('.progress');
                    const width = progress.style.width;
                    progress.style.setProperty('--progress-width', width);
                }
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => observer.observe(element));
}

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 打字机效果
const typeWriter = (text, element, speed = 100) => {
    element.textContent = ''; // 清空原有内容
    let i = 0;
    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    type();
};

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    handleScrollAnimations();

    // 标签动画延迟
    document.querySelectorAll('.tag').forEach((tag, index) => {
        tag.style.animationDelay = `${0.2 * (index + 1)}s`;
    });

    // 添加粒子效果
    const particlesContainer = document.querySelector('.particles');

    // 实现打字机效果
    const greetingElement = document.querySelector('.greeting');
    if (greetingElement) {
        setTimeout(() => {
            typeWriter('Hello', greetingElement, 150);
        }, 500); // 延迟500ms开始打字效果
    }

    // 名字打字效果
    const nameElement = document.querySelector('.glitch');
    if (nameElement) {
        setTimeout(() => {
            typeWriter("I'm LinfengXie", nameElement, 100);
        }, 1500); // 等Hello打完后再开始
    }
});

// 为了让打字效果更生动，添加闪烁的光标
const addCursor = () => {
    const style = document.createElement('style');
    style.innerHTML = `
        .greeting::after,
        .glitch::after {
            content: '|';
            animation: cursor 1s infinite;
            margin-left: 2px;
        }

        @keyframes cursor {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
};

// 添加光标效果
addCursor();

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav-container');
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// 设置导航项动画延迟
document.querySelectorAll('.nav-links a').forEach((link, index) => {
    link.style.setProperty('--i', index);
});

// 设置当前页面的活动状态
const currentPath = window.location.pathname;
document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
    }
});

// 滚动进度条效果
const updateProgress = () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    document.documentElement.style.setProperty('--scroll', `${scrollPercent}%`);

    // 添加滚动类
    const topNav = document.querySelector('.top-nav');
    if (window.scrollY > 50) {
        topNav.classList.add('scrolled');
    } else {
        topNav.classList.remove('scrolled');
    }
};

window.addEventListener('scroll', updateProgress);

// 主题切换效果
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');

    // 添加切换动画
    const icon = themeToggle.querySelector('.toggle-icon');
    icon.style.transform = 'rotate(180deg)';
    setTimeout(() => {
        icon.style.transform = '';
    }, 300);
});
