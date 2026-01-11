        document.addEventListener('DOMContentLoaded', function() {
            const navIcons = document.querySelectorAll('.nav-icon');
            const socialIcons = document.querySelectorAll('.social-icon');
            const backToTopBtn = document.getElementById('backToTop');
            const navContainer = document.getElementById('navContainer');
            const categoryNav = document.getElementById('categoryNav');
            
            // 监听滚动事件，为导航栏添加固定效果
            window.addEventListener('scroll', function() {
                // 获取菜单的原始位置
                const navOffsetTop = categoryNav.offsetTop;
                
                // 当滚动超过菜单位置时，固定菜单
                if (window.scrollY > navOffsetTop) {
                    categoryNav.classList.add('fixed');
                    document.body.classList.add('menu-fixed');
                } else {
                    categoryNav.classList.remove('fixed');
                    document.body.classList.remove('menu-fixed');
                }
                
                // 回到顶部按钮显示/隐藏
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('show');
                } else {
                    backToTopBtn.classList.remove('show');
                }
            });
            
            // 导航图标悬停效果
            navIcons.forEach(icon => {
                icon.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.1) rotate(5deg)';
                    this.style.backgroundColor = '#e0f7f2';
                });
                
                icon.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1) rotate(0deg)';
                    this.style.backgroundColor = '#f0f0f0';
                });
            });
            
            // 社交图标悬停效果
            socialIcons.forEach(icon => {
                icon.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.1)';
                });
                
                icon.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1)';
                });
            });
            
            // 回到顶部按钮功能
            backToTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            // 平滑滚动到分类
            const categoryLinks = document.querySelectorAll('.category-link');
            categoryLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // 移除所有链接的active类
                    categoryLinks.forEach(l => {
                        l.classList.remove('active');
                    });
                    
                    // 为当前点击的链接添加active类
                    this.classList.add('active');
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        // 计算偏移量，考虑固定菜单的高度
                        const offset = categoryNav.classList.contains('fixed') ? 80 : 120;
                        
                        window.scrollTo({
                            top: targetElement.offsetTop - offset,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // 导航菜单水平滚动功能
            let isDown = false;
            let startX;
            let scrollLeft;
            
            navContainer.addEventListener('mousedown', (e) => {
                isDown = true;
                navContainer.classList.add('active');
                startX = e.pageX - navContainer.offsetLeft;
                scrollLeft = navContainer.scrollLeft;
            });
            
            navContainer.addEventListener('mouseleave', () => {
                isDown = false;
                navContainer.classList.remove('active');
            });
            
            navContainer.addEventListener('mouseup', () => {
                isDown = false;
                navContainer.classList.remove('active');
            });
            
            navContainer.addEventListener('mousemove', (e) => {
                if(!isDown) return;
                e.preventDefault();
                const x = e.pageX - navContainer.offsetLeft;
                const walk = (x - startX) * 2; // 滚动速度
                navContainer.scrollLeft = scrollLeft - walk;
            });
            
            // 触摸设备支持
            navContainer.addEventListener('touchstart', (e) => {
                isDown = true;
                startX = e.touches[0].pageX - navContainer.offsetLeft;
                scrollLeft = navContainer.scrollLeft;
            });
            
            navContainer.addEventListener('touchend', () => {
                isDown = false;
            });
            
            navContainer.addEventListener('touchmove', (e) => {
                if(!isDown) return;
                e.preventDefault();
                const x = e.touches[0].pageX - navContainer.offsetLeft;
                const walk = (x - startX) * 2;
                navContainer.scrollLeft = scrollLeft - walk;
            });
        });