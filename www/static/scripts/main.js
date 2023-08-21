let startPath = '/home/anton/go/src';
let currertPath = '/home/anton/go/src';

const request = new XMLHttpRequest();

const url = "http://localhost:8080/?ROOT=" + currertPath






//------------------------
const log = document.querySelector(".event-log-contents");
const reload = document.querySelector("#reload");

reload.addEventListener("click", () => {
  log.textContent = "";
  window.setTimeout(() => {
    window.location.reload(true);
  }, 200);
});

window.addEventListener("load", (event) => {
  log.textContent = log.textContent + "load\n";
});

document.addEventListener("readystatechange", (event) => {
  log.textContent = log.textContent + `readystate: ${document.readyState}\n`;
});

document.addEventListener("DOMContentLoaded", (event) => {
    request.open('GET', url);
    
    request.setRequestHeader('Content-Type', 'application/json');
    request.responseType = "json";
    request.addEventListener("readystatechange", () => {
	
    /*   request.readyState - возвращает текущее состояние объекта XHR(XMLHttpRequest) объекта, 
    бывает 4 состояния 4-е состояние запроса - операция полностью завершена, пришел ответ от сервера, 
    вот то что нам нужно request.status это статус ответа, 
    нам нужен код 200 это нормальный ответ сервера, 401 файл не найден, 500 сервер дал ошибку и прочее...   */
       if (request.readyState === 4 && request.status === 200) {
       
         // выводим в консоль то что ответил сервер
         var Data = request.response;
        console.log(Data["DataDir"][1]["FileDescription"]);
         
         //log.textContent = log.textContent + parsedData;
       }
   });
    
   // Выполняем запрос 
   request.send();

  log.textContent = log.textContent + `DOMContentLoaded\n`;
});
