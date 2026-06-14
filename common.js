// 轮播与表单验证
class Carousel {
    constructor(element, interval = 5000) {
        this.inner = element.querySelector('.carousel-inner');
        this.items = element.querySelectorAll('.carousel-item');
        this.index = 0;
        this.total = this.items.length;
        this.timer = null;
        this.lock = false;
        this.interval = interval;
        this.init();
    }
    init() {
        if (this.total === 0) return;
        this.update();
        this.startAuto();
        const prevBtn = document.querySelector('.carousel-btn.prev');
        const nextBtn = document.querySelector('.carousel-btn.next');
        if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
        if (nextBtn) nextBtn.addEventListener('click', () => this.next());
        const carousel = document.querySelector('.carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => this.stopAuto());
            carousel.addEventListener('mouseleave', () => this.startAuto());
        }
    }
    update() {
        if (this.lock) return;
        this.inner.style.transform = `translateX(-${this.index * 100}%)`;
    }
    next() {
        if (this.lock) return;
        this.lock = true;
        this.index = (this.index + 1) % this.total;
        this.update();
        setTimeout(() => { this.lock = false; }, 500);
    }
    prev() {
        if (this.lock) return;
        this.lock = true;
        this.index = (this.index - 1 + this.total) % this.total;
        this.update();
        setTimeout(() => { this.lock = false; }, 500);
    }
    startAuto() {
        if (this.timer) clearInterval(this.timer);
        this.timer = setInterval(() => this.next(), this.interval);
    }
    stopAuto() {
        if (this.timer) clearInterval(this.timer);
        this.timer = null;
    }
}

// 表单验证函数
function validateUsername(username) {
    const regex = /^[a-zA-Z0-9_]{3,16}$/;
    if (!username) return '用户名不能为空';
    if (!regex.test(username)) return '用户名需为3~16位字母数字下划线';
    return '';
}
function validatePassword(password) {
    if (!password) return '密码不能为空';
    if (password.length < 6) return '密码至少6位';
    return '';
}
function validateEmail(email) {
    const regex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (!email) return '邮箱不能为空';
    if (!regex.test(email)) return '请输入有效的邮箱地址';
    return '';
}

window.addEventListener('DOMContentLoaded', () => {
    const carouselElement = document.querySelector('.carousel');
    if (carouselElement) {
        new Carousel(carouselElement);
    }
});