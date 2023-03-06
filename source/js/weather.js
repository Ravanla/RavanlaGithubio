// document.addEventListener('pjax:complete', tonav);
// document.addEventListener('DOMContentLoaded', tonav);
WIDGET = { // 深圳南山
  "CONFIG": {
    "modules": "01234",
    "background": "5",
    "tmpColor": "FFFFFF",
    "tmpSize": "16",
    "cityColor": "FFFFFF",
    "citySize": "16",
    "aqiColor": "FFFFFF",
    "aqiSize": "16",
    "weatherIconSize": "18",
    "alertIconSize": "16",
    "padding": "10px 10px 10px 10px",
    "shadow": "1",
    "language": "auto",
    "borderRadius": "15",
    "fixed": "false",
    "vertical": "center",
    "horizontal": "center",
    "city": "CN101280604",
    "key": "ec636ae2d195490ca3fd894bde343c60"
  }
}
// //响应pjax
// function tonav() {
//     document.getElementById("he-plugin-simple").setAttribute("style", "display:none");
//     var position = $(window).scrollTop();
//     $(window).scroll(function () {
//         var scroll = $(window).scrollTop();
//         if (scroll < position) { // < 向上滚动显示
//             document.getElementById("he-plugin-simple").setAttribute("style", "");
//             // document.getElementsByClassName("s-sticker")[1].setAttribute("style", "display:none!important");
//         } else {
//             // document.getElementsByClassName("s-sticker")[1].setAttribute("style", "");
//             document.getElementById("he-plugin-simple").setAttribute("style", "display:none");
//         }
//         position = scroll;
//     });
//     //修复没有弄右键菜单的童鞋无法回顶部的问题
//     // document.getElementById("page-name").innerText = document.title.split(" | Ravanla🐈‍⬛")[0];
// }
// 在themes\butterfly\layout\includes\header\menu_item.pug 要设置缓存才能在每个页面实现上述功能
// 在source\js\fomal.js抄的滚动js