let startPath = '/home/anton/go/src'; //Стартовая директория
let currertPath = startPath //Текущая открытая директория

let renderContent = false; //Произошёл ли первичный рендер
let waitAnswer = false;

//renderListDir() отрендеривает список файлов в текущей директории
function renderListDir(Data,scanDirDiv) {
  for (let i = 1; i < Data["DataDir"].length; i++) { 
    //создаём элемент
    var elemForCreat = document.createElement("p");
    elemForCreat.setAttribute("class", "text-left");
    elemForCreat.setAttribute("id", "with-margins");
    //Добавляем текст файла или директории в элемент
    var elemText = document.createTextNode(Data["DataDir"][i]["FileDescription"]);
    //Добавляем полученный элемент на страницу
    elemForCreat.appendChild(elemText);
    scanDirDiv.appendChild(elemForCreat);
    //Обрабатываем события связанные с только что созданным элементом
    (function(e) {
      //Если нажата директория формируем новый запрос на сервер с путём этой директории
      e.addEventListener('click', async function () {
        if (!waitAnswer){
          waitAnswer = true;
        console.log('Элемент ' + Data["DataDir"][i]["FilePath"] + ' был нажат');
        currertPath = Data["DataDir"][i]["FilePath"]
        //Получаем данные из этой директории
        var dirJs = await getDataDir(Data["DataDir"][i]["FilePath"]);
        console.log(dirJs);
        //Отрендериваем эти данные
        waitAnswer=false;
        render(dirJs);
          
      }
      });

      e.addEventListener('mouseover', function() {
        e.classList.add('text-hover');
      });
    
      e.addEventListener('mouseout', function() {
        e.classList.remove('text-hover');
      });
      
  })(elemForCreat);


  console.log(Data["DataDir"][i]["FileDescription"]);
  }
}
//renderBackButton() отвечает за отображение и работу кнопки назад
function renderBackButton(scanDirDiv) {

    var elemForCreat = document.createElement("a");
    elemForCreat.setAttribute("class", "btn btn-danger");

    var elemText = document.createTextNode("Назад");
    elemForCreat.appendChild(elemText);
    scanDirDiv.appendChild(elemForCreat);
    //При нажатии на кнопку обрабатываем запрос на материнскую папку от текущей
    (function(e) {
      e.addEventListener('click', async function () {
        
        if (!waitAnswer){
          waitAnswer = true;
        
        let arrCurPath = currertPath.split("/");
        console.log(arrCurPath);
        //Обработчик если материнская папка равна "/"
        if (arrCurPath.length==2){
          currertPath="/"
        }else{
          let sub = arrCurPath.slice(-1);
          let newCurPath = arrCurPath.slice(0, -1).join("/");
          currertPath = newCurPath;
  
        }


        console.log('Элемент ' + currertPath + ' был нажат');
        var dirJs = await getDataDir(currertPath);
        waitAnswer = false;
        render(dirJs);

        }
      });

      e.addEventListener('mouseover', function() {
        e.classList.add('text-hover');
      });
    
      e.addEventListener('mouseout', function() {
        e.classList.remove('text-hover');
      });
      
  })(elemForCreat);


  console.log(Data["DataDir"][i]["FileDescription"]);
  
}
//render() отвечает за рендер надписи текущей папки и времени работы, а так же запуска
//рендера списка файлов и кнопки назад
function render(d) {
  var scanDirDiv = document.querySelector("div.scanDir");

  scanDirDiv.innerHTML = '';

  var elem = document.createElement("p");
  elem.setAttribute("class", "text-left");
  elem.setAttribute("id", "with-margins-label");
  var elemTextRoot = document.createTextNode("Текущая директория: "+d["CurrentPathFolder"]);
  elem.appendChild(elemTextRoot);
  scanDirDiv.appendChild(elem);

  var elem = document.createElement("p");
  elem.setAttribute("class", "text-left");
  elem.setAttribute("id", "with-margins-label");
  var elemTextTime = document.createTextNode("Время открытия: "+d["TimeWork"]);
  elem.appendChild(elemTextTime);
  scanDirDiv.appendChild(elem);

  renderListDir(d,scanDirDiv);
  renderBackButton(scanDirDiv)
  

};


//getDataDir() запускает запрос и возвращает данные о файлах по
//данному пути от сервера
function getDataDir(cPath) {
  return new Promise(function(resolve, reject) {
    const request = new XMLHttpRequest();

    const url = "http://localhost:8080/?ROOT=" + cPath;
    request.open('GET', url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.responseType = "json";
    request.addEventListener("readystatechange", () => {
      if (request.readyState === 4 && request.status === 200) {
        //Если ответ получен убирает картинку загрузки и прекращает промис
        var ResData = request.response;
        scanDirDiv.removeChild(loadingImg);
        resolve(ResData);
        
      }
    });
    //Если идёт ожидание ответа от сервера, подгружает картинку загрузки
    var scanDirDiv = document.querySelector("div.gifLoad");
    var loadingImg = document.createElement("img");
    loadingImg.setAttribute("src", "../static/img/loading.gif");
    scanDirDiv.appendChild(loadingImg);
    //Таск передвинуть гифку вверх и уменьшить её

    request.send();
  });
}




window.addEventListener("load", (event) => {
  
});

document.addEventListener("readystatechange", (event) => {
});

//Первичная прогрузка данных и первый стратовый запро на сервер
document.addEventListener("DOMContentLoaded", async (event) => {
  var dirJs = await getDataDir(currertPath);
  console.log(dirJs);
  render(dirJs);
});
