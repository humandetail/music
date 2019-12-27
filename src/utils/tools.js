var utils = (function (utils) {
  return Object.assign(utils, {
    /**
     * 获取滚动条距离
     * getScrollOffset
     * 
     * @returns { Object } 返回一个包含垂直和水平方向滚动条的距离的对象
     * 
     * 常规：
     *   window.pageXOffset/pageYOffset
     * IE9/IE8及以下：
     *   document.documentElement.scrollLeft/scrollTop
     *   document.body.scrollLeft/scrollTop
     * 不常见：(不用这个)
     *   window.scrollX/scrollY
     */
    getScrollOffset: function () {
      if (window.pageXOffset) { // 如果window.pageXOffset存在，则使用
        return {
          left: window.pageXOffset,
          top: window.pageYOffset
        };
      } else {
        // 由于document.documentElement.scrollLeft与document.body.scrollLeft有下面这种现象
        // 一个有值，另一个为0
        // 所以可以将两者相加来取值
        return {
          left: document.documentElement.scrollLeft + document.body.scrollLeft,
          top: document.documentElement.scrollTop + document.body.scrollTop
        }
      }
    },

    /**
     * 获取浏览器可视区域（窗口）的尺寸
     * getViewportSize
     * 
     * @returns { Object } 返回一个包含了浏览器可视区域（窗口）的尺寸的对象
     *
     * 常规：
     *   window.innerWidth/innerHeight
     * IE9/IE8及以下:
     *   标准模式：document.documentElement.clientWidth/clientHeight
     *   怪异模式：document.body.clientWidth/clientHeight
     */
    getViewportSize: function () {
      if (window.innerWidth) {
        return {
          width: window.innerWidth,
          height: window.innerHeight
        }
      } else {
        if (document.compatMode === 'BackCompat') {
          // 怪异模式
          return {
            width: document.body.clientWidth,
            height: document.body.clientHeight
          }
        } else {
          // 标准模式
          return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
          }
        }
      }
    },

    /**
     * 获取页面（HTML文档）尺寸
     * getScrollSize
     * 
     * @returns { Object } 返回一个包含页面尺寸的对象
     * 
     * document.body.scrollWidth/scrollHeight
     * document.documentElement.scrollWidth/scrollHeight
     */
    getScrollSize: function () {
      if (document.body.scrollWidth) {
        return {
          width: document.body.scrollWidth,
          height: document.body.scrollHeight
        }
      } else {
        return {
          width: document.documentElement.scrollWidth,
          height: document.documentElement.scrollHeight
        }
      }
    },

    /**
     * 元素到浏览器左上角的距离
     * getElementDocPosition
     * 
     * @param { Object } el 需要查询的元素节点
     * @returns { Object } 返回一个包含了Left和Top距离的对象
     * 
     * scrollLeft/scrollTop
     */
    getElementDocPosition: function (el) {
      var parentNode = el.offsetParent, // 最近的，有定位属性的祖先元素
          left = el.offsetLeft,
          top = el.offsetTop;

      while (parentNode) { // 如果存在父级定位元素，则加上父级定位元素的offset值
        left += parentNode.offsetLeft + parentNode.clientLeft;
        top += parentNode.offsetTop + parentNode.clientTop;
        parentNode = parentNode.offsetParent;
      }

      return {
        left: left,
        top: top
      }
    },

    /**
     * 获取元素计算样式
     * getStyles
     * 
     * @param { Object } elem 需要获取样式的节点
     * @param { String } [prop] 可选，样式属性
     * @returns { Object | Number } 返回一个样式集合或是某个属性的样式
     * 
     * window.getComputedStyle(元素, 伪类)
     * IE8及以下：
     *   elem.currentStyle
     */
    getStyles: function (elem, prop) {
      var styles;
      if (window.getComputedStyle) {
        styles = window.getComputedStyle(elem, null);
      } else { // IE8及以下
        styles = elem.currentStyle;
      }

      if (prop) {
        return parseInt(styles[prop]);
      } else {
        return styles;
      }
    },

    /**
     * 绑定事件处理函数
     * addEvent
     *
     * @param { Object } elem 需要绑定事件处理函数的DOM元素
     * @param { String } type 需要绑定的事件类型
     * @param { Function } fn 事件处理函数
     * 
     */
    addEvent: function (elem, type, fn) {
      if (elem.addEventListener) {
        elem.addEventListener(type, fn, false); // 默认为冒泡
      } else if (elem.attachEvent) { // IE浏览器支持attachEvent
        elem.attachEvent('on' + type, function () {
          // attachEvent中this默认指向window
          elem.call(elem);
        });
      } else {
        elem['on' + type] = fn;
      }
    },

    /**
     * 解除绑定事件处理函数
     * removeEvent
     * 
     * @param { Object } elem 需要解除绑定的DOM元素
     * @param { String } type 需要解除绑定的事件类型
     * @param { Function } type 绑定的事件处理函数的引用，如果引用不同，无法解除
     * 
     */
    removeEvent: function (elem, type, fn) {
      if (elem.removeEventListener) {
        elem.removeEventListener(type, fn, false);
      } else if (elem.detachEvent) { // IE下解绑是detachEvent
        elem.detachEvent('on' + type, fn);
      } else {
        elem['on' + type] = null;
      }
    },

    /**
     * 阻止事件默认行为
     * preventDefaultEvent
     * 
     * @param { Object } ev 事件对象
     * 
     */
    preventDefaultEvent: function (ev) {
      var e = ev || window.event;
      if (e.preventDefault) {
        e.preventDefault();
      } else { // IE下阻止默认行为需要将returnValue属性设置为false
        e.returnValue = false;
      }
    },

    /**
     * 阻止事件冒泡
     * cancelBubble
     * 
     * @param { Object } ev 事件对象
     * 
     */
    cancelBubble: function (ev) {
      var e = ev || window.event;
      if (e.stopPropagation) {
        e.stopPropagation();
      } else { // IE下阻止事件冒泡需要将cancelBubble属性设置为true
        e.cancelBubble = true;
      }
    },

    /**
     * 获取鼠标位置相对于文档的坐标
     * getPagePos
     * 
     * @requires utils.getScrollOffset 需要依赖getScrollOffset这个函数来获取滚动条距离
     * 
     * @param { Object } ev 事件对象
     * @returns { Object } 返回一个坐标对象
     * 
     * 鼠标相对于可视窗口的坐标 + 滚动条距离 - 文档偏移量 = 鼠标位置相对于文档的坐标
     * 之所以要减去文档偏移量是因为某些浏览器会有文档偏移量，哪怕是设置了margin: 0
     * 
     */
    getPagePos: function (ev) {
      var e = ev || window.event;
      // 获取鼠标相对于可视窗口的坐标
      var clientX = e.clientX,
          clientY = e.clientY;
      // 获取滚动条距离
      var scrollOffset = utils.getScrollOffset(),
          scrollLeft = scrollOffset.left,
          scrollTop = scrollOffset.top;
      // 获取文档偏移量，如果不存在，就给0，不影响计算
      var offsetX = document.documentElement.offsetLeft || 0,
          offsetY = document.documentElement.offsetTop || 0;

      return {
        x: clientX + scrollLeft - offsetX,
        y: clientY + scrollTop - offsetY
      };
    },
    
    /**
     * 函数防抖
     * debounce
     * 对于在事件被触发n秒后再执行的回调 -> 延迟执行
     * 如果在这n秒内再触发事件，重新开始计时
     * 
     * @param { function } fn 需要防抖的函数
     * @param { number } delay 延迟时间
     * @param { boolean } triggerNow 是否立即执行该函数
     * @returns { function } 返回一个经过防抖处理的函数
     */
    debounce: function (fn, delay, triggerNow) {
      var t = null;

      var debounced = function () {

        var _self = this,
            args = arguments;

        if (t) { // 如果计时器存在，则清除计时器
          clearTimeout(t);
        }

        if (triggerNow) { // 立即是立即执行
          var exec = !t;

          t = setTimeout(function () { // 设置计时器
            t = null;
          }, delay);

          if (exec) { // 首次执行时，t为null, exec则为true
            fn.apply(_self, args);
          }
        } else { // 非立即执行，则设置计时器，延时执行
          t = setTimeout(function () {
            fn.apply(_self, args);
          }, delay);
        }
      }

      debounced.remove = function () {
        clearTimeout(t);
        t = null;
      }

      return debounced;
    },

    /**
     * 函数节流
     * throttle
     * 减少连续触发的函数的触发次数，delay时间内只执行一次
     * 如：函数原本每隔1毫秒执行一次，经过处理后就变成每隔delay时间才执行
     * 
     * @param { function } fn 需要节流的函数
     * @param { number } delay 函数触发的间隔时间
     * @return { function } 返回一个经过节流处理的函数
     */
    throttle: function (fn, delay) {
      var t = null,
          beginTime = new Date().getTime();

      return function () {
        var _self = this,
            args = arguments,
            currentTime = new Date().getTime();

        clearTimeout(t); // 先清除计时器

        if (currentTime - beginTime >= delay) { // 当前时间 - 上一次触发时间 >= 设置的间隔时间，则允许触发
          fn.apply(_self, args);
          beginTime = currentTime; // 重置开始时间
        } else { // 未满足条件，则不触发
          t = setTimeout(function () {
            fn.apply(_self, args);
          }, delay);
        }
      }
    },

    /**
     * 格式化时间
     * @param { String } str 需要格式的时间戳
     * 10086 -> 2:48:06
     */
    formatTime: function (str) {
      let time = Number(str);

      let h = Math.floor(time / 3600),
          m = (Math.floor((time / 60) % 60) + '').padStart(2, '0'),
          s = (time % 60 + '').padStart(2, '0');

      if (h < 1) {
        return m + ':' + s;
      } else {
        return h + ':' + m + ':' + s;
      }
    },

    /**
     * 标签匹配正则
     */
    tagReg: function () {
      return /\<(.*?)\>/g;
    },

    /**
     * 格式化歌词文件
     */

    // "[by:風花字幕社]
    // [ti:]
    // [ar:]
    // [al:]
    // [by:云卷KumoMaki]
    // [00:00.000] 作词 : かませ虎
    // [00:01.39]编曲:lceon
    // [00:01.89]
    // [00:02.21]言葉では零せないこの想い
    // [00:05.90]胸の中で広がっていた
    // [00:09.05]くだらない記憶（かいわ）でさえも
    // [00:12.20]鮮明に映った
    parseLyric (lyric) {
      if (!lyric) {
        return []
      }
      let arr = lyric.trim().split(/[\r\n|\n]/gm).filter((item) => {
        return !(/^\[(.*?)\]$/g.test(item)); // 去除无意义空行
      });

      let reg = /\[(.*?)\]/,
          len = arr.length;

      return arr.map((item, index, arr) => {
        let start = item.match(reg)[1],
            text = item.replace(reg, '');
        
        return {
          start: utils.toMilliSeconds(start),
          end: (index === len - 1) ? -1 : utils.toMilliSeconds(arr[index + 1].match(reg)[1]),
          text
        }
      });
      
    },

    // 转换成毫秒
    toMilliSeconds (str) { // 歌词只会支持到分钟
      let arr = str.split(/[\:|\.]/g);
      return Number(Number(arr[0] * 60) + Number(arr[1]) + arr[2].padEnd(3, '0'));
    }
  });
})(utils || {});

export default utils;
