// ==UserScript==
// @name         简历无损导出PDF
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  绕过网站拦截，直接导出页面内容为PDF
// @author       Gemini
// @match        https://www.qmjianli.com/*
// @grant        GM_xmlhttpRequest
// @require      https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js
// ==/UserScript==

(function() {
    'use strict';

    // 1. 创建一个悬浮按钮，避免在控制台手动输入代码
    const btn = document.createElement('button');
    btn.innerHTML = '🚀 导出超清PDF';
    btn.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 999999;
        padding: 12px 20px;
        background: #ff4757;
        color: #fff;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: bold;
        box-shadow: 0 4px 12px rgba(255, 71, 87, 0.4);
        transition: all 0.3s;
    `;

    // 鼠标悬停效果
    btn.onmouseover = () => btn.style.background = '#ff6b81';
    btn.onmouseleave = () => btn.style.background = '#ff4757';

    document.body.appendChild(btn);

    btn.onclick = function() {
    document.querySelector('#__nuxt').innerHTML = document.querySelector('.tpl_main').outerHTML;
    // 1. 隐藏掉所有不需要打印的杂项（侧边栏、按钮、广告）
    const style = document.createElement('style');
    style.innerHTML = `
        @media print {
            .tpl_main, .tpl_main * { visibility: visible; } /* 只显示简历主体 */
            button, .no-print { display: none !important; } /* 隐藏你的导出按钮 */
            .page_line { display: none !important; } /* 隐藏 */
        }
    `;
    document.head.appendChild(style);

    // 2. 强制开启背景颜色打印（针对 Webkit 浏览器）
    document.body.style.webkitPrintColorAdjust = 'exact';

    // 3. 调用原生打印
    window.print();
};
})();