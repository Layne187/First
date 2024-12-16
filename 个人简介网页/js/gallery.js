class GalleryFilter {
    constructor() {
        this.filters = document.querySelectorAll('.filter-btn');
        this.items = document.querySelectorAll('.gallery-item');
        this.init();
    }

    init() {
        this.filters.forEach(filter => {
            filter.addEventListener('click', () => {
                // 移除所有active类
                this.filters.forEach(f => f.classList.remove('active'));
                // 添加active类到当前按钮
                filter.classList.add('active');

                const category = filter.dataset.filter;
                this.filterItems(category);
            });
        });
    }

    filterItems(category) {
        this.items.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                item.style.display = 'none';
            }
        });
    }
}

// 初始化
window.addEventListener('DOMContentLoaded', () => {
    new GalleryFilter();
});

// 添加视频处理
document.addEventListener('DOMContentLoaded', function () {
    const videos = document.querySelectorAll('.gallery-video');

    videos.forEach(video => {
        // 强制设置视频静音以确保自动播放
        video.muted = true;

        // 确保视频加载完成后播放
        video.addEventListener('loadeddata', function () {
            // 尝试多种方式播放视频
            const playPromise = video.play();

            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('视频开始播放');
                }).catch(error => {
                    console.log('自动播放失败，尝试静音播放:', error);
                    // 确保静音
                    video.muted = true;
                    // 重试播放
                    video.play().catch(err => {
                        console.error('静音播放也失败:', err);
                    });
                });
            }
        });

        // 如果视频暂停了，重新播放
        video.addEventListener('pause', function () {
            // 只在用户没有主动暂停时重新播放
            if (!video.hasAttribute('data-user-paused')) {
                video.play().catch(function (error) {
                    console.log("视频重新播放失败:", error);
                });
            }
        });

        // 监听用户交互
        video.addEventListener('click', function () {
            if (video.paused) {
                video.removeAttribute('data-user-paused');
                video.play();
            } else {
                video.setAttribute('data-user-paused', 'true');
                video.pause();
            }
        });
    });

    // 页面可见性改变时处理
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'visible') {
            videos.forEach(video => {
                if (!video.hasAttribute('data-user-paused')) {
                    video.play();
                }
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按钮的active类
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 给当前点击的按钮添加active类
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    item.classList.add('show');
                } else {
                    item.style.display = 'none';
                    item.classList.remove('show');
                }
            });
        });
    });
}); 