class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.successMessage = document.querySelector('.success-message');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // 添加输入动画
        document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
            input.addEventListener('focus', () => this.handleFocus(input));
            input.addEventListener('blur', () => this.handleBlur(input));
        });
    }

    handleFocus(input) {
        input.parentElement.classList.add('focused');
    }

    handleBlur(input) {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());

        try {
            // 这里添加发送邮件的逻辑
            await this.sendEmail(data);

            // 显示成功消息
            this.showSuccess();

            // 重置表单
            setTimeout(() => {
                this.form.reset();
                this.hideSuccess();
            }, 3000);
        } catch (error) {
            console.error('Error:', error);
            alert('发送失败，请稍后重试');
        }
    }

    async sendEmail(data) {
        // 这里可以添加实际的邮件发送逻辑
        // 例如使用 EmailJS 或其他邮件服务
        return new Promise(resolve => setTimeout(resolve, 1000));
    }

    showSuccess() {
        this.successMessage.style.display = 'flex';
        setTimeout(() => {
            this.successMessage.classList.add('show');
        }, 10);
    }

    hideSuccess() {
        this.successMessage.classList.remove('show');
        setTimeout(() => {
            this.successMessage.style.display = 'none';
        }, 300);
    }
}

// 初始化
window.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
}); 