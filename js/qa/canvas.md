# canvas
- **清晰度问题**
  
`ctx.scale(devpix,devpix)`放大图片，绘制倍图
- **文字排列**
[textAlign](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/textAlign)

|对齐方式| 实际效果                  |
|---|-----------------------|
|left| canvas的x轴宽度1/2开始第一个文字 |
|center|canvas宽度中间与文字中间相同|
|right| 最后一个文字与canvas宽度中间线对齐|
