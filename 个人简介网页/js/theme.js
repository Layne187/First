// 检查用户之前的主题偏好
const getStoredTheme = () => localStorage.getItem('theme') || 'light';
const setStoredTheme = (theme) => localStorage.setItem('theme', theme);

// 切换主题函数
const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    setStoredTheme(newTheme);

    // 更新按钮图标
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.textContent = newTheme === 'light' ? '🌓' : '☀️';
};

// 初始化主题
const initTheme = () => {
    const storedTheme = getStoredTheme();
    document.documentElement.setAttribute('data-theme', storedTheme);

    const themeToggle = document.getElementById('themeToggle');
    themeToggle.textContent = storedTheme === 'light' ? '🌓' : '☀️';

    // 添加点击事件监听器
    themeToggle.addEventListener('click', toggleTheme);
};

// 当 DOM 加载完成时初始化主题
document.addEventListener('DOMContentLoaded', initTheme); 