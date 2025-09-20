// 厦门市15分钟生态圈可视化平台 JavaScript

class EcologicalVisualizationPlatform {
    constructor() {
        this.currentSection = 'home';
        this.map = null;
        this.charts = {};
        this.data = {
            accessibility: {
                walking: [85, 78, 92, 76, 89, 83, 87],
                cycling: [78, 82, 85, 73, 86, 80, 84],
                transit: [72, 75, 88, 71, 83, 78, 81]
            },
            ecology: {
                green: [72, 68, 75, 70, 77, 73, 76],
                blue: [65, 62, 68, 64, 70, 66, 69],
                connectivity: [88, 85, 90, 82, 91, 87, 89]
            },
            comprehensive: {
                siming: [82, 85, 78, 88, 80, 83, 86],
                huli: [76, 79, 73, 82, 77, 80, 84]
            }
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.initializeCharts();
        this.initializeMap();
        this.startAnimations();
    }
    
    setupEventListeners() {
        // 导航菜单点击事件
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.target.dataset.section;
                this.showSection(section);
                this.updateActiveNavLink(e.target);
            });
        });
        
        // 汉堡菜单点击事件
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (hamburger) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }
        
        // 数据分类卡片点击事件
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', () => {
                this.showDataCategory(card.dataset.category);
                this.updateActiveCategoryCard(card);
            });
        });
        
        // 地图控制按钮点击事件
        document.querySelectorAll('.map-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchMapLayer(btn.dataset.layer);
                this.updateActiveMapBtn(btn);
            });
        });
        
        // 平滑滚动
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    showSection(sectionName) {
        // 隐藏所有区域
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // 显示目标区域
        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionName;
            
            // 根据区域执行特定初始化
            this.handleSectionSwitch(sectionName);
        }
    }
    
    updateActiveNavLink(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }
    
    handleSectionSwitch(sectionName) {
        switch(sectionName) {
            case 'analysis':
                this.updateCharts();
                break;
            case 'map':
                this.resizeMap();
                break;
            case 'indicators':
                this.animateIndicators();
                break;
        }
    }
    
    showDataCategory(category) {
        // 隐藏所有详情内容
        document.querySelectorAll('.detail-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // 显示目标内容
        const targetContent = document.getElementById(`${category}-detail`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    }
    
    updateActiveCategoryCard(activeCard) {
        document.querySelectorAll('.category-card').forEach(card => {
            card.classList.remove('active');
        });
        activeCard.classList.add('active');
    }
    
    switchMapLayer(layer) {
        if (this.map) {
            this.clearMapLayers();
            this.addMapLayer(layer);
        }
    }
    
    updateActiveMapBtn(activeBtn) {
        document.querySelectorAll('.map-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }
    
    initializeCharts() {
        this.createAccessibilityChart();
        this.createEcologyChart();
        this.createComprehensiveChart();
    }
    
    createAccessibilityChart() {
        const ctx = document.getElementById('accessibilityChart');
        if (!ctx) return;
        
        this.charts.accessibility = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['步行可达性', '骑行可达性', '公交可达性', '道路密度', '交通便利度', '连通性', '安全性'],
                datasets: [{
                    label: '思明区',
                    data: this.data.accessibility.walking,
                    backgroundColor: 'rgba(46, 204, 113, 0.2)',
                    borderColor: 'rgba(46, 204, 113, 1)',
                    pointBackgroundColor: 'rgba(46, 204, 113, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(46, 204, 113, 1)'
                }, {
                    label: '湖里区',
                    data: this.data.accessibility.cycling,
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    pointBackgroundColor: 'rgba(52, 152, 219, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(52, 152, 219, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }
    
    createEcologyChart() {
        const ctx = document.getElementById('ecologyChart');
        if (!ctx) return;
        
        this.charts.ecology = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['绿地覆盖', '水体面积', '生态连通', '环境质量'],
                datasets: [{
                    data: [72, 65, 88, 75],
                    backgroundColor: [
                        '#2ecc71',
                        '#3498db',
                        '#27ae60',
                        '#16a085'
                    ],
                    borderWidth: 3,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                },
                animation: {
                    animateScale: true,
                    duration: 2000
                }
            }
        });
    }
    
    createComprehensiveChart() {
        const ctx = document.getElementById('comprehensiveChart');
        if (!ctx) return;
        
        this.charts.comprehensive = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['交通可达性', '生态服务', '社区服务', '基础设施', '环境质量', '生活便利', '安全指数'],
                datasets: [{
                    label: '思明区',
                    data: this.data.comprehensive.siming,
                    backgroundColor: 'rgba(46, 204, 113, 0.8)',
                    borderColor: 'rgba(46, 204, 113, 1)',
                    borderWidth: 1
                }, {
                    label: '湖里区',
                    data: this.data.comprehensive.huli,
                    backgroundColor: 'rgba(52, 152, 219, 0.8)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutBounce'
                }
            }
        });
    }
    
    updateCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart) {
                chart.update();
            }
        });
    }
    
    initializeMap() {
        const mapContainer = document.getElementById('mainMap');
        if (!mapContainer) return;
        
        // 初始化Leaflet地图
        this.map = L.map('mainMap').setView([24.4797, 118.0819], 11);
        
        // 添加底图图层
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);
        
        // 添加厦门市区域边界
        this.addDistrictBoundaries();
        
        // 默认显示可达性分析图层
        this.addMapLayer('accessibility');
    }
    
    addDistrictBoundaries() {
        // 思明区大致边界 (简化)
        const simingBounds = [
            [24.4400, 118.0500],
            [24.4800, 118.0500],
            [24.4800, 118.1100],
            [24.4400, 118.1100],
            [24.4400, 118.0500]
        ];
        
        // 湖里区大致边界 (简化)
        const huliBounds = [
            [24.4800, 118.0500],
            [24.5200, 118.0500],
            [24.5200, 118.1300],
            [24.4800, 118.1300],
            [24.4800, 118.0500]
        ];
        
        // 添加区域多边形
        L.polygon(simingBounds, {
            color: '#2ecc71',
            weight: 2,
            fillOpacity: 0.1
        }).addTo(this.map).bindPopup('思明区');
        
        L.polygon(huliBounds, {
            color: '#3498db',
            weight: 2,
            fillOpacity: 0.1
        }).addTo(this.map).bindPopup('湖里区');
    }
    
    clearMapLayers() {
        this.map.eachLayer(layer => {
            if (layer instanceof L.CircleMarker || layer instanceof L.Marker) {
                this.map.removeLayer(layer);
            }
        });
    }
    
    addMapLayer(layerType) {
        const layerData = this.generateLayerData(layerType);
        
        layerData.forEach(point => {
            const marker = L.circleMarker([point.lat, point.lng], {
                color: point.color,
                fillColor: point.color,
                fillOpacity: 0.7,
                radius: point.radius || 8
            }).addTo(this.map);
            
            marker.bindPopup(point.popup);
        });
    }
    
    generateLayerData(layerType) {
        const basePoints = [
            { lat: 24.4600, lng: 118.0800, name: '中山公园区域' },
            { lat: 24.4500, lng: 118.0900, name: '白鹭洲公园区域' },
            { lat: 24.4700, lng: 118.0700, name: '南湖公园区域' },
            { lat: 24.4800, lng: 118.0600, name: '仙岳公园区域' },
            { lat: 24.5000, lng: 118.0900, name: '五缘湾区域' },
            { lat: 24.4900, lng: 118.1100, name: '湖里公园区域' }
        ];
        
        return basePoints.map((point, index) => {
            let color, popup, value;
            
            switch(layerType) {
                case 'accessibility':
                    value = Math.floor(Math.random() * 30) + 70;
                    color = value > 85 ? '#2ecc71' : value > 75 ? '#f39c12' : '#e74c3c';
                    popup = `<b>${point.name}</b><br>可达性指数: ${value}%`;
                    break;
                case 'ecology':
                    value = Math.floor(Math.random() * 25) + 65;
                    color = value > 80 ? '#27ae60' : value > 70 ? '#2ecc71' : '#f39c12';
                    popup = `<b>${point.name}</b><br>生态指数: ${value}%`;
                    break;
                case 'transport':
                    value = Math.floor(Math.random() * 20) + 75;
                    color = '#3498db';
                    popup = `<b>${point.name}</b><br>交通便利度: ${value}%`;
                    break;
                case 'comprehensive':
                    value = Math.floor(Math.random() * 15) + 80;
                    color = value > 85 ? '#9b59b6' : value > 80 ? '#8e44ad' : '#7d3c98';
                    popup = `<b>${point.name}</b><br>综合评价: ${value}分`;
                    break;
                default:
                    color = '#95a5a6';
                    popup = `<b>${point.name}</b>`;
            }
            
            return {
                ...point,
                color,
                popup,
                radius: Math.max(6, value / 10)
            };
        });
    }
    
    resizeMap() {
        if (this.map) {
            setTimeout(() => {
                this.map.invalidateSize();
            }, 300);
        }
    }
    
    animateIndicators() {
        const indicators = document.querySelectorAll('.indicator-fill');
        indicators.forEach((indicator, index) => {
            setTimeout(() => {
                indicator.style.width = indicator.style.width || '0%';
            }, index * 200);
        });
    }
    
    startAnimations() {
        // 首页统计数字动画
        this.animateCounters();
        
        // 生态圈动画
        this.animateEcologicalCircle();
    }
    
    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace('+', ''));
            let current = 0;
            const increment = target / 50;
            const suffix = counter.textContent.includes('+') ? '+' : '';
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + suffix;
                }
            }, 50);
        });
    }
    
    animateEcologicalCircle() {
        const circle = document.querySelector('.ecological-circle');
        if (circle) {
            // 添加动态效果
            setInterval(() => {
                const randomScale = 0.95 + Math.random() * 0.1;
                circle.style.transform = `scale(${randomScale})`;
            }, 3000);
        }
    }
    
    // 工具方法
    formatNumber(num) {
        return new Intl.NumberFormat('zh-CN').format(num);
    }
    
    showToast(message, type = 'info') {
        // 创建提示框
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        // 样式
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 1rem 2rem;
            border-radius: 5px;
            box-shadow: var(--card-shadow);
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        // 显示动画
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        // 自动隐藏
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new EcologicalVisualizationPlatform();
});

// 添加页面滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(46, 204, 113, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
        navbar.style.backdropFilter = 'none';
    }
});

// 添加键盘快捷键支持
document.addEventListener('keydown', (e) => {
    if (e.altKey) {
        switch(e.key) {
            case '1':
                document.querySelector('[data-section="home"]').click();
                break;
            case '2':
                document.querySelector('[data-section="project"]').click();
                break;
            case '3':
                document.querySelector('[data-section="data"]').click();
                break;
            case '4':
                document.querySelector('[data-section="analysis"]').click();
                break;
            case '5':
                document.querySelector('[data-section="map"]').click();
                break;
            case '6':
                document.querySelector('[data-section="indicators"]').click();
                break;
        }
    }
});

// 添加性能监控
if (typeof performance !== 'undefined') {
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`页面加载时间: ${loadTime}ms`);
        
        if (loadTime > 3000) {
            console.warn('页面加载时间较长，建议优化资源加载');
        }
    });
}
