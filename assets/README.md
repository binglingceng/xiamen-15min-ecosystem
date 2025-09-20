# 静态资源目录

## 📦 建议添加的资源文件

### 字体文件
- `fonts/` 文件夹
  - `custom-font.woff2` - 自定义字体
  - `icons.ttf` - 图标字体

### 图标文件
- `icons/` 文件夹  
  - `favicon.ico` - 网站图标
  - `logo.svg` - 矢量logo
  - `map-markers/` - 地图标记图标

### 文档文件
- `docs/` 文件夹
  - `research-paper.pdf` - 研究论文
  - `project-report.pdf` - 项目报告
  - `presentation.pptx` - 演示文稿

### 配置文件
- `config/` 文件夹
  - `map-config.json` - 地图配置
  - `chart-themes.json` - 图表主题配置

### 使用方式

#### 在HTML中引用：
```html
<link rel="icon" href="assets/icons/favicon.ico">
<link rel="stylesheet" href="assets/fonts/custom-font.css">
```

#### 在JavaScript中加载：
```javascript
// 加载配置文件
fetch('assets/config/map-config.json')
    .then(response => response.json())
    .then(config => {
        // 使用配置
    });
```

#### 在CSS中使用：
```css
@font-face {
    font-family: 'CustomFont';
    src: url('../assets/fonts/custom-font.woff2');
}
```
