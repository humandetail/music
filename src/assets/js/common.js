import FastClick from 'js/fastclick.js';

// 设置HTML字体大小
document.documentElement.style.fontSize = document.documentElement.clientWidth / 3.75 + 'px';
// 解决300MS延迟
window.addEventListener('load', function () {
  FastClick.attach(document.body);
});

// 多点触摸的冲突
window.addEventListener('touchmove', function (e) {
  if (e.touches.length > 1) {
    e.preventDefault();
  }
}, false);
