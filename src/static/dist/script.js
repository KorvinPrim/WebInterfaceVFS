(()=>{"use strict";var e={546:function(e,t,n){var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(i,a){function r(e){try{c(o.next(e))}catch(e){a(e)}}function s(e){try{c(o.throw(e))}catch(e){a(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,s)}c((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.main=void 0;const i=n(705);let a,r="/home/anton/go/src/WebInterfaceVFS/src",s=!1,c=!1,d=document.querySelector("div.gifLoad"),l=document.createElement("img");function u(e){let t=document.querySelector("div.scanDir");t.innerHTML="";const n=document.createElement("p");n.setAttribute("class","text-left"),n.setAttribute("id","with-margins-label");const c=document.createTextNode("Текущая директория: "+e.CurrentPathFolder);n.appendChild(c),t.appendChild(n);const d=document.createElement("p");d.setAttribute("class","text-left"),d.setAttribute("id","with-margins-label");const l=document.createTextNode("Время открытия: "+e.TimeWork);d.appendChild(l),t.appendChild(d),function(e,t){for(let n=1;n<e.DataDir.length;n++){const c=document.createElement("p");c.setAttribute("class","text-left"),c.setAttribute("id","with-margins");const d=document.createTextNode(e.DataDir[n].FileDescription);c.appendChild(d),t.appendChild(c),function(t){t.addEventListener("click",(function(){return o(this,void 0,void 0,(function*(){s||(s=!0,console.log("Элемент "+e.DataDir[n].FilePath+" был нажат"),r=e.DataDir[n].FilePath,a=yield(0,i.getDataDir)(e.DataDir[n].FilePath,v),console.log(a),s=!1,u(a))}))})),t.addEventListener("mouseover",(function(){t.classList.add("text-hover")})),t.addEventListener("mouseout",(function(){t.classList.remove("text-hover")}))}(c),console.log(e.DataDir[n].FileDescription)}}(e,t),function(e){const t=document.createElement("a");t.setAttribute("class","btn btn-danger");const n=document.createTextNode("Назад");var c;t.appendChild(n),e.appendChild(t),(c=t).addEventListener("click",(function(){return o(this,void 0,void 0,(function*(){if(window.moveTo(0,0),!s){s=!0;const e=r.split("/");if(console.log(e),2==e.length)r="/";else{e.slice(-1);const t=e.slice(0,-1).join("/");r=t}console.log("Элемент "+r+" был нажат"),a=yield(0,i.getDataDir)(r,v),s=!1,u(a)}}))})),c.addEventListener("mouseover",(function(){c.classList.add("text-hover")})),c.addEventListener("mouseout",(function(){c.classList.remove("text-hover")}))}(t)}function v(e){var t;s=!e,t=0==e,console.log(d),t?(c=!0,d.appendChild(l)):c&&(d.removeChild(l),c=!1)}l.src="/static/dist/img/loading.gif",t.main=function(){window.addEventListener("load",(e=>{})),document.addEventListener("readystatechange",(e=>{})),document.addEventListener("DOMContentLoaded",(e=>o(this,void 0,void 0,(function*(){a=yield(0,i.getDataDir)(r,v),console.log(a),s||u(a)}))))}},705:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getDataDir=void 0,t.getDataDir=function(e,t){return new Promise((function(n,o){const i=new XMLHttpRequest,a="/?ROOT="+e;i.open("GET",a),i.setRequestHeader("Content-Type","application/json"),i.responseType="json",i.addEventListener("readystatechange",(()=>{if(4===i.readyState&&200===i.status){const e=i.response;t(!0),n(e)}})),t(!1),i.send()}))}}},t={};(0,function n(o){var i=t[o];if(void 0!==i)return i.exports;var a=t[o]={exports:{}};return e[o].call(a.exports,a,a.exports,n),a.exports}(546).main)()})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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WyJ3ZWJwYWNrOi8vc3RhdGljLy4vc2NyaXB0cy9tYWluLnRzIiwid2VicGFjazovL3N0YXRpYy8uL3NjcmlwdHMvbW9kZWwudHMiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3N0YXRpYy8uL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm1haW4gPSB2b2lkIDA7XG5jb25zdCBtb2RlbF8xID0gcmVxdWlyZShcIi4vbW9kZWxcIik7XG5sZXQgc3RhcnRQYXRoID0gXCIvaG9tZS9hbnRvbi9nby9zcmMvV2ViSW50ZXJmYWNlVkZTL3NyY1wiOyAvL9Ch0YLQsNGA0YLQvtCy0LDRjyDQtNC40YDQtdC60YLQvtGA0LjRj1xubGV0IGN1cnJlcnRQYXRoID0gc3RhcnRQYXRoOyAvL9Ci0LXQutGD0YnQsNGPINC+0YLQutGA0YvRgtCw0Y8g0LTQuNGA0LXQutGC0L7RgNC40Y9cbmxldCBkaXJKcztcbmxldCByZW5kZXJDb250ZW50ID0gZmFsc2U7IC8v0J/RgNC+0LjQt9C+0YjRkdC7INC70Lgg0L/QtdGA0LLQuNGH0L3Ri9C5INGA0LXQvdC00LXRgFxubGV0IHdhaXRBbnN3ZXIgPSBmYWxzZTtcbmxldCBkZWxHaWYgPSBmYWxzZTtcbmxldCBHaWZEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZGl2LmdpZkxvYWRcIik7XG5sZXQgbG9hZGluZ0ltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG5sb2FkaW5nSW1nLnNyYyA9IGAvc3RhdGljL2Rpc3QvaW1nL2xvYWRpbmcuZ2lmYDtcbi8vcmVuZGVyTGlzdERpcigpINC+0YLRgNC10L3QtNC10YDQuNCy0LDQtdGCINGB0L/QuNGB0L7QuiDRhNCw0LnQu9C+0LIg0LIg0YLQtdC60YPRidC10Lkg0LTQuNGA0LXQutGC0L7RgNC40LhcbmZ1bmN0aW9uIHJlbmRlckxpc3REaXIoRGF0YSwgc2NhbkRpckRpdikge1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgRGF0YVtcIkRhdGFEaXJcIl0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy/RgdC+0LfQtNCw0ZHQvCDRjdC70LXQvNC10L3RglxuICAgICAgICBjb25zdCBlbGVtRm9yQ3JlYXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgZWxlbUZvckNyZWF0LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwidGV4dC1sZWZ0XCIpO1xuICAgICAgICBlbGVtRm9yQ3JlYXQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJ3aXRoLW1hcmdpbnNcIik7XG4gICAgICAgIC8v0JTQvtCx0LDQstC70Y/QtdC8INGC0LXQutGB0YIg0YTQsNC50LvQsCDQuNC70Lgg0LTQuNGA0LXQutGC0L7RgNC40Lgg0LIg0Y3Qu9C10LzQtdC90YJcbiAgICAgICAgY29uc3QgZWxlbVRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShEYXRhW1wiRGF0YURpclwiXVtpXVtcIkZpbGVEZXNjcmlwdGlvblwiXSk7XG4gICAgICAgIC8v0JTQvtCx0LDQstC70Y/QtdC8INC/0L7Qu9GD0YfQtdC90L3Ri9C5INGN0LvQtdC80LXQvdGCINC90LAg0YHRgtGA0LDQvdC40YbRg1xuICAgICAgICBlbGVtRm9yQ3JlYXQuYXBwZW5kQ2hpbGQoZWxlbVRleHQpO1xuICAgICAgICBzY2FuRGlyRGl2LmFwcGVuZENoaWxkKGVsZW1Gb3JDcmVhdCk7XG4gICAgICAgIC8v0J7QsdGA0LDQsdCw0YLRi9Cy0LDQtdC8INGB0L7QsdGL0YLQuNGPINGB0LLRj9C30LDQvdC90YvQtSDRgSDRgtC+0LvRjNC60L4g0YfRgtC+INGB0L7Qt9C00LDQvdC90YvQvCDRjdC70LXQvNC10L3RgtC+0LxcbiAgICAgICAgKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAvL9CV0YHQu9C4INC90LDQttCw0YLQsCDQtNC40YDQtdC60YLQvtGA0LjRjyDRhNC+0YDQvNC40YDRg9C10Lwg0L3QvtCy0YvQuSDQt9Cw0L/RgNC+0YEg0L3QsCDRgdC10YDQstC10YAg0YEg0L/Rg9GC0ZHQvCDRjdGC0L7QuSDQtNC40YDQtdC60YLQvtGA0LjQuFxuICAgICAgICAgICAgZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXdhaXRBbnN3ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdhaXRBbnN3ZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ9Ct0LvQtdC80LXQvdGCICcgKyBEYXRhW1wiRGF0YURpclwiXVtpXVtcIkZpbGVQYXRoXCJdICsgJyDQsdGL0Lsg0L3QsNC20LDRgicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVydFBhdGggPSBEYXRhW1wiRGF0YURpclwiXVtpXVtcIkZpbGVQYXRoXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy/Qn9C+0LvRg9GH0LDQtdC8INC00LDQvdC90YvQtSDQuNC3INGN0YLQvtC5INC00LjRgNC10LrRgtC+0YDQuNC4XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXJKcyA9IHlpZWxkICgwLCBtb2RlbF8xLmdldERhdGFEaXIpKERhdGFbXCJEYXRhRGlyXCJdW2ldW1wiRmlsZVBhdGhcIl0sIGxpc3RBbnN2ZXJGb3JTZXJ2ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGlySnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy/QntGC0YDQtdC90LTQtdGA0LjQstCw0LXQvCDRjdGC0Lgg0LTQsNC90L3Ri9C1XG4gICAgICAgICAgICAgICAgICAgICAgICB3YWl0QW5zd2VyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXIoZGlySnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGUuY2xhc3NMaXN0LmFkZCgndGV4dC1ob3ZlcicpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGUuY2xhc3NMaXN0LnJlbW92ZSgndGV4dC1ob3ZlcicpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pKGVsZW1Gb3JDcmVhdCk7XG4gICAgICAgIGNvbnNvbGUubG9nKERhdGFbXCJEYXRhRGlyXCJdW2ldW1wiRmlsZURlc2NyaXB0aW9uXCJdKTtcbiAgICB9XG59XG4vL3JlbmRlckJhY2tCdXR0b24oKSDQvtGC0LLQtdGH0LDQtdGCINC30LAg0L7RgtC+0LHRgNCw0LbQtdC90LjQtSDQuCDRgNCw0LHQvtGC0YMg0LrQvdC+0L/QutC4INC90LDQt9Cw0LRcbmZ1bmN0aW9uIHJlbmRlckJhY2tCdXR0b24oc2NhbkRpckRpdikge1xuICAgIGNvbnN0IGVsZW1Gb3JDcmVhdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgIGVsZW1Gb3JDcmVhdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImJ0biBidG4tZGFuZ2VyXCIpO1xuICAgIGNvbnN0IGVsZW1UZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCLQndCw0LfQsNC0XCIpO1xuICAgIGVsZW1Gb3JDcmVhdC5hcHBlbmRDaGlsZChlbGVtVGV4dCk7XG4gICAgc2NhbkRpckRpdi5hcHBlbmRDaGlsZChlbGVtRm9yQ3JlYXQpO1xuICAgIC8v0J/RgNC4INC90LDQttCw0YLQuNC4INC90LAg0LrQvdC+0L/QutGDINC+0LHRgNCw0LHQsNGC0YvQstCw0LXQvCDQt9Cw0L/RgNC+0YEg0L3QsCDQvNCw0YLQtdGA0LjQvdGB0LrRg9GOINC/0LDQv9C60YMg0L7RgiDRgtC10LrRg9GJ0LXQuVxuICAgIChmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cubW92ZVRvKDAsIDApO1xuICAgICAgICAgICAgICAgIGlmICghd2FpdEFuc3dlcikge1xuICAgICAgICAgICAgICAgICAgICB3YWl0QW5zd2VyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyQ3VyUGF0aCA9IGN1cnJlcnRQYXRoLnNwbGl0KFwiL1wiKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYXJyQ3VyUGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIC8v0J7QsdGA0LDQsdC+0YLRh9C40Log0LXRgdC70Lgg0LzQsNGC0LXRgNC40L3RgdC60LDRjyDQv9Cw0L/QutCwINGA0LDQstC90LAgXCIvXCJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFyckN1clBhdGgubGVuZ3RoID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlcnRQYXRoID0gXCIvXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdWIgPSBhcnJDdXJQYXRoLnNsaWNlKC0xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0N1clBhdGggPSBhcnJDdXJQYXRoLnNsaWNlKDAsIC0xKS5qb2luKFwiL1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlcnRQYXRoID0gbmV3Q3VyUGF0aDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn0K3Qu9C10LzQtdC90YIgJyArIGN1cnJlcnRQYXRoICsgJyDQsdGL0Lsg0L3QsNC20LDRgicpO1xuICAgICAgICAgICAgICAgICAgICBkaXJKcyA9IHlpZWxkICgwLCBtb2RlbF8xLmdldERhdGFEaXIpKGN1cnJlcnRQYXRoLCBsaXN0QW5zdmVyRm9yU2VydmVyKTtcbiAgICAgICAgICAgICAgICAgICAgd2FpdEFuc3dlciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByZW5kZXIoZGlySnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBlLmNsYXNzTGlzdC5hZGQoJ3RleHQtaG92ZXInKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBlLmNsYXNzTGlzdC5yZW1vdmUoJ3RleHQtaG92ZXInKTtcbiAgICAgICAgfSk7XG4gICAgfSkoZWxlbUZvckNyZWF0KTtcbiAgICAvL2NvbnNvbGUubG9nKERhdGFbXCJEYXRhRGlyXCJdW2ldW1wiRmlsZURlc2NyaXB0aW9uXCJdKTtcbn1cbi8vcmVuZGVyKCkg0L7RgtCy0LXRh9Cw0LXRgiDQt9CwINGA0LXQvdC00LXRgCDQvdCw0LTQv9C40YHQuCDRgtC10LrRg9GJ0LXQuSDQv9Cw0L/QutC4INC4INCy0YDQtdC80LXQvdC4INGA0LDQsdC+0YLRiywg0LAg0YLQsNC6INC20LUg0LfQsNC/0YPRgdC60LBcbi8v0YDQtdC90LTQtdGA0LAg0YHQv9C40YHQutCwINGE0LDQudC70L7QsiDQuCDQutC90L7Qv9C60Lgg0L3QsNC30LDQtFxuZnVuY3Rpb24gcmVuZGVyKGRhdGFGb3JSZW5kZXIpIHtcbiAgICBsZXQgc2NhbkRpckRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJkaXYuc2NhbkRpclwiKTtcbiAgICBzY2FuRGlyRGl2LmlubmVySFRNTCA9ICcnO1xuICAgIGNvbnN0IGVsZW1Sb290ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgZWxlbVJvb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJ0ZXh0LWxlZnRcIik7XG4gICAgZWxlbVJvb3Quc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJ3aXRoLW1hcmdpbnMtbGFiZWxcIik7XG4gICAgY29uc3QgZWxlbVRleHRSb290ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCLQotC10LrRg9GJ0LDRjyDQtNC40YDQtdC60YLQvtGA0LjRjzogXCIgKyBkYXRhRm9yUmVuZGVyW1wiQ3VycmVudFBhdGhGb2xkZXJcIl0pO1xuICAgIGVsZW1Sb290LmFwcGVuZENoaWxkKGVsZW1UZXh0Um9vdCk7XG4gICAgc2NhbkRpckRpdi5hcHBlbmRDaGlsZChlbGVtUm9vdCk7XG4gICAgY29uc3QgZWxlbVRpbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBlbGVtVGltZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInRleHQtbGVmdFwiKTtcbiAgICBlbGVtVGltZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIndpdGgtbWFyZ2lucy1sYWJlbFwiKTtcbiAgICBjb25zdCBlbGVtVGV4dFRpbWUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcItCS0YDQtdC80Y8g0L7RgtC60YDRi9GC0LjRjzogXCIgKyBkYXRhRm9yUmVuZGVyW1wiVGltZVdvcmtcIl0pO1xuICAgIGVsZW1UaW1lLmFwcGVuZENoaWxkKGVsZW1UZXh0VGltZSk7XG4gICAgc2NhbkRpckRpdi5hcHBlbmRDaGlsZChlbGVtVGltZSk7XG4gICAgcmVuZGVyTGlzdERpcihkYXRhRm9yUmVuZGVyLCBzY2FuRGlyRGl2KTtcbiAgICByZW5kZXJCYWNrQnV0dG9uKHNjYW5EaXJEaXYpO1xufVxuO1xuZnVuY3Rpb24gbGlzdEFuc3ZlckZvclNlcnZlcihzdGF0dXMpIHtcbiAgICB3YWl0QW5zd2VyID0gIXN0YXR1cztcbiAgICBpZiAoc3RhdHVzID09IGZhbHNlKSB7XG4gICAgICAgIHJlbmRlckxvYWRHaWYodHJ1ZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZW5kZXJMb2FkR2lmKGZhbHNlKTtcbiAgICB9XG59XG4vL2dldERhdGFEaXIoKSDQt9Cw0L/Rg9GB0LrQsNC10YIg0LfQsNC/0YDQvtGBINC4INCy0L7Qt9Cy0YDQsNGJ0LDQtdGCINC00LDQvdC90YvQtSDQviDRhNCw0LnQu9Cw0YUg0L/QvlxuLy/QtNCw0L3QvdC+0LzRgyDQv9GD0YLQuCDQvtGCINGB0LXRgNCy0LXRgNCwXG4vL9Cw0YDQs9GD0LzQtdC90YIgcmVuZGVyR2lmINC/0L4g0YHRg9GC0Lgg0Y3RgtC+INGE0YPQvdC60YbQuNGPINC/0YDQtdC00L7RgdGC0LDQstC70LXQvdC40Y8g0LDQutGC0YPQsNC70YzQvdC+0LPQvlxuLy/RgdC+0YHRgtC+0Y/QvdC40Y8g0YLQtdC60YPRidC10Lkg0LfQsNCz0YDRg9C30LrQuCDQvtGC0LLQtdGC0LAg0L7RgiDRgdC10YDQstC10YDQsC5cbi8v0KfQtdGA0LXQtyDQvdC10ZEg0LzRiyDQv9C10YDQtdC00LDRkdC8INGB0L7RgdGC0L7Rj9C90LjQtSBmYWxzZS3QvtGC0LLQtdGC0LAg0LXRidGRINC90LXRglxuLy9yZW5kZXJCYWNrQnV0dG9uKCkg0L7RgtCy0LXRh9Cw0LXRgiDQt9CwINC+0YLQvtCx0YDQsNC20LXQvdC40LUg0Lgg0YDQsNCx0L7RgtGDINC60L3QvtC/0LrQuCDQvdCw0LfQsNC0XG5mdW5jdGlvbiByZW5kZXJMb2FkR2lmKHdhaXQpIHtcbiAgICBjb25zb2xlLmxvZyhHaWZEaXYpO1xuICAgIGlmICh3YWl0KSB7XG4gICAgICAgIC8v0JXRgdC70Lgg0LjQtNGR0YIg0L7QttC40LTQsNC90LjQtSDQvtGC0LLQtdGC0LAg0L7RgiDRgdC10YDQstC10YDQsCwg0L/QvtC00LPRgNGD0LbQsNC10YIg0LrQsNGA0YLQuNC90LrRgyDQt9Cw0LPRgNGD0LfQutC4XG4gICAgICAgIGRlbEdpZiA9IHRydWU7XG4gICAgICAgIEdpZkRpdi5hcHBlbmRDaGlsZChsb2FkaW5nSW1nKTtcbiAgICAgICAgLy/QotCw0YHQuiDQv9C10YDQtdC00LLQuNC90YPRgtGMINCz0LjRhNC60YMg0LLQstC10YDRhSDQuCDRg9C80LXQvdGM0YjQuNGC0Ywg0LXRkVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKGRlbEdpZikge1xuICAgICAgICAgICAgR2lmRGl2LnJlbW92ZUNoaWxkKGxvYWRpbmdJbWcpO1xuICAgICAgICAgICAgZGVsR2lmID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBtYWluKCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoZXZlbnQpID0+IHtcbiAgICB9KTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwicmVhZHlzdGF0ZWNoYW5nZVwiLCAoZXZlbnQpID0+IHtcbiAgICB9KTtcbiAgICAvL9Cf0LXRgNCy0LjRh9C90LDRjyDQv9GA0L7Qs9GA0YPQt9C60LAg0LTQsNC90L3Ri9GFINC4INC/0LXRgNCy0YvQuSDRgdGC0YDQsNGC0L7QstGL0Lkg0LfQsNC/0YDQviDQvdCwINGB0LXRgNCy0LXRgFxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIChldmVudCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBkaXJKcyA9IHlpZWxkICgwLCBtb2RlbF8xLmdldERhdGFEaXIpKGN1cnJlcnRQYXRoLCBsaXN0QW5zdmVyRm9yU2VydmVyKTtcbiAgICAgICAgY29uc29sZS5sb2coZGlySnMpO1xuICAgICAgICBpZiAoIXdhaXRBbnN3ZXIpIHtcbiAgICAgICAgICAgIHJlbmRlcihkaXJKcyk7XG4gICAgICAgIH1cbiAgICB9KSk7XG59XG5leHBvcnRzLm1haW4gPSBtYWluO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdldERhdGFEaXIgPSB2b2lkIDA7XG4vL2dldERhdGFEaXIoKSDQt9Cw0L/Rg9GB0LrQsNC10YIg0LfQsNC/0YDQvtGBINC4INCy0L7Qt9Cy0YDQsNGJ0LDQtdGCINC00LDQvdC90YvQtSDQviDRhNCw0LnQu9Cw0YUg0L/QvlxuLy/QtNCw0L3QvdC+0LzRgyDQv9GD0YLQuCDQvtGCINGB0LXRgNCy0LXRgNCwXG5mdW5jdGlvbiBnZXREYXRhRGlyKGNQYXRoLCBzdGF0dXNBbnN2ZXIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIGNvbnN0IHVybCA9IFwiLz9ST09UPVwiICsgY1BhdGg7XG4gICAgICAgIHJlcXVlc3Qub3BlbignR0VUJywgdXJsKTtcbiAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IFwianNvblwiO1xuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJyZWFkeXN0YXRlY2hhbmdlXCIsICgpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgPT09IDQgJiYgcmVxdWVzdC5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IFJlc0RhdGEgPSByZXF1ZXN0LnJlc3BvbnNlO1xuICAgICAgICAgICAgICAgIHN0YXR1c0Fuc3Zlcih0cnVlKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKFJlc0RhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc3RhdHVzQW5zdmVyKGZhbHNlKTtcbiAgICAgICAgcmVxdWVzdC5zZW5kKCk7XG4gICAgfSk7XG59XG5leHBvcnRzLmdldERhdGFEaXIgPSBnZXREYXRhRGlyO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgbWFpbl8xID0gcmVxdWlyZShcIi4vc2NyaXB0cy9tYWluXCIpO1xuKDAsIG1haW5fMS5tYWluKSgpO1xuIl0sIm5hbWVzIjpbIl9fYXdhaXRlciIsInRoaXMiLCJ0aGlzQXJnIiwiX2FyZ3VtZW50cyIsIlAiLCJnZW5lcmF0b3IiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImZ1bGZpbGxlZCIsInZhbHVlIiwic3RlcCIsIm5leHQiLCJlIiwicmVqZWN0ZWQiLCJyZXN1bHQiLCJkb25lIiwidGhlbiIsImFwcGx5IiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwibWFpbiIsIm1vZGVsXzEiLCJkaXJKcyIsImN1cnJlcnRQYXRoIiwid2FpdEFuc3dlciIsImRlbEdpZiIsIkdpZkRpdiIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImxvYWRpbmdJbWciLCJjcmVhdGVFbGVtZW50IiwicmVuZGVyIiwiZGF0YUZvclJlbmRlciIsInNjYW5EaXJEaXYiLCJpbm5lckhUTUwiLCJlbGVtUm9vdCIsInNldEF0dHJpYnV0ZSIsImVsZW1UZXh0Um9vdCIsImNyZWF0ZVRleHROb2RlIiwiYXBwZW5kQ2hpbGQiLCJlbGVtVGltZSIsImVsZW1UZXh0VGltZSIsIkRhdGEiLCJpIiwibGVuZ3RoIiwiZWxlbUZvckNyZWF0IiwiZWxlbVRleHQiLCJhZGRFdmVudExpc3RlbmVyIiwiY29uc29sZSIsImxvZyIsImdldERhdGFEaXIiLCJsaXN0QW5zdmVyRm9yU2VydmVyIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwicmVuZGVyTGlzdERpciIsIndpbmRvdyIsIm1vdmVUbyIsImFyckN1clBhdGgiLCJzcGxpdCIsInNsaWNlIiwibmV3Q3VyUGF0aCIsImpvaW4iLCJyZW5kZXJCYWNrQnV0dG9uIiwic3RhdHVzIiwid2FpdCIsInJlbW92ZUNoaWxkIiwic3JjIiwiZXZlbnQiLCJjUGF0aCIsInN0YXR1c0Fuc3ZlciIsInJlcXVlc3QiLCJYTUxIdHRwUmVxdWVzdCIsInVybCIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwicmVzcG9uc2VUeXBlIiwicmVhZHlTdGF0ZSIsIlJlc0RhdGEiLCJyZXNwb25zZSIsInNlbmQiLCJfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18iLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJjYWNoZWRNb2R1bGUiLCJ1bmRlZmluZWQiLCJtb2R1bGUiLCJfX3dlYnBhY2tfbW9kdWxlc19fIiwiY2FsbCJdLCJzb3VyY2VSb290IjoiIn0=