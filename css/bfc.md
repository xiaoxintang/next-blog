# BFC

**区块格式化上下文**（Block Formatting Context，BFC）是 Web 页面的可视 CSS 渲染的一部分，是块级盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。

- **以下方式会创建BFC**

1. 文档的根元素（html）。
2. 浮动元素（即 float 值不为 none 的元素）。
3. 绝对定位元素（position 值为 absolute 或 fixed 的元素）。
4. 行内块元素（display值为 inline-block 的元素）。
5. overflow 值不为 visible 或 clip 的块级元素
6. [MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)查看更多

- **BFC作用**

1. 包含内部浮动
2. 排除外部浮动
3. 阻止[外边距重叠](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_box_model/Mastering_margin_collapsing)