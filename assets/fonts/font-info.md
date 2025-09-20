# 字体资源说明

## 📝 当前状态
本文件夹暂时为空，使用系统默认字体以确保最佳兼容性。

## 🎨 建议添加的字体

### 中文字体
- **思源黑体** (Source Han Sans CN) - 现代感强，适合数据展示
- **阿里巴巴普惠体** - 易读性好，适合长文本
- **站酷文艺体** - 装饰性强，适合标题

### 英文字体  
- **Roboto** - Google Material Design标准字体
- **Open Sans** - 清晰易读，适合界面文字
- **Montserrat** - 现代几何字体，适合标题

## 💻 使用方式

### 1. 添加字体文件
将字体文件（.woff2, .woff, .ttf格式）放入此文件夹

### 2. 创建CSS文件
```css
/* custom-fonts.css */
@font-face {
    font-family: 'CustomFont';
    src: url('custom-font.woff2') format('woff2'),
         url('custom-font.woff') format('woff'),
         url('custom-font.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}
```

### 3. 在HTML中引用
```html
<link rel="stylesheet" href="assets/fonts/custom-fonts.css">
```

### 4. 在CSS中应用
```css
.custom-text {
    font-family: 'CustomFont', 'Microsoft YaHei', sans-serif;
}
```

## 📋 字体选择建议

### 数据可视化场景
- 数字显示：使用等宽字体，确保数字对齐
- 图表标签：选择简洁清晰的无衬线字体
- 标题：可使用较粗的字重增强视觉冲击

### 学术展示场景  
- 正文：选择易读性好的字体，避免过于装饰
- 标题：使用对比度高的字体突出重点
- 图表：确保在投影时字体清晰可见

## ⚠️ 注意事项

1. **版权问题**：确保使用的字体有合法授权
2. **文件大小**：中文字体文件通常较大，考虑加载性能
3. **兼容性**：提供多种格式以确保浏览器兼容
4. **回退字体**：始终提供系统字体作为备选
