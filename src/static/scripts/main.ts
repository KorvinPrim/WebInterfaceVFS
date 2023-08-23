import {getDataDir} from "./model";



let startPath: string = "/home/anton/go/src/WebInterfaceVFS/src"; //Стартовая директория
let currertPath: string = startPath; //Текущая открытая директория



let dirJs : any //Функция в которую записывается ответ сервера

let renderContent: boolean = false; //Произошёл ли первичный рендер
let waitAnswer: boolean = false; //Ждём ли ответ сервера

let delGif:boolean = false; //Нужно ли удалить гифку загрузки после того как получили ответ сервера

//Загружаем данные для гифки загрузки
let GifDiv: any = document.querySelector("div.gifLoad");
let loadingImg: HTMLImageElement = document.createElement("img");
loadingImg.src = `/static/dist/img/loading.gif`;


//renderListDir() отрендеривает список файлов в текущей директории
function renderListDir(Data: any, scanDirDiv: HTMLElement): void {
  for (let i = 1; i < Data["DataDir"].length; i++) {
    //создаём элемент
    const elemForCreat: HTMLParagraphElement = document.createElement("p");
    elemForCreat.setAttribute("class", "text-left");
    elemForCreat.setAttribute("id", "with-margins");
    //Добавляем текст файла или директории в элемент
    const elemText: Text = document.createTextNode(Data["DataDir"][i]["FileDescription"]);
    //Добавляем полученный элемент на страницу
    elemForCreat.appendChild(elemText);
    scanDirDiv.appendChild(elemForCreat);
    //Обрабатываем события связанные с только что созданным элементом
    (function (e: HTMLElement) {
      //Если нажата директория формируем новый запрос на сервер с путём этой директории
      e.addEventListener('click', async function () {
        if (!waitAnswer) {
          waitAnswer = true;
          console.log('Элемент ' + Data["DataDir"][i]["FilePath"] + ' был нажат');
          currertPath = Data["DataDir"][i]["FilePath"]
          //Получаем данные из этой директории
          dirJs = await getDataDir(Data["DataDir"][i]["FilePath"],listAnsverForServer);
          console.log(dirJs);
          //Отрендериваем эти данные
          waitAnswer = false;
          render(dirJs);

        }
      });

      e.addEventListener('mouseover', function () {
        e.classList.add('text-hover');
      });

      e.addEventListener('mouseout', function () {
        e.classList.remove('text-hover');
      });

    })(elemForCreat);


    console.log(Data["DataDir"][i]["FileDescription"]);
  }
}


//renderBackButton() отвечает за отображение и работу кнопки назад
function renderBackButton(scanDirDiv: HTMLElement): void {

  const elemForCreat: HTMLAnchorElement = document.createElement("a");
  elemForCreat.setAttribute("class", "btn btn-danger");

  const elemText: Text = document.createTextNode("Назад");
  elemForCreat.appendChild(elemText);
  scanDirDiv.appendChild(elemForCreat);
  //При нажатии на кнопку обрабатываем запрос на материнскую папку от текущей
  (function (e: HTMLElement) {
    e.addEventListener('click', async function () {
      window.moveTo(0, 0);
      if (!waitAnswer) {
        waitAnswer = true;

        const arrCurPath: string[] = currertPath.split("/");
        console.log(arrCurPath);
        //Обработчик если материнская папка равна "/"
        if (arrCurPath.length == 2) {
          currertPath = "/";
        } else {
          const sub: string[] = arrCurPath.slice(-1);
          const newCurPath: string = arrCurPath.slice(0, -1).join("/");
          currertPath = newCurPath;

        }


        console.log('Элемент ' + currertPath + ' был нажат');
        dirJs = await getDataDir(currertPath,listAnsverForServer);
        waitAnswer = false;
        render(dirJs);

      }
    });

    e.addEventListener('mouseover', function () {
      e.classList.add('text-hover');
    });

    e.addEventListener('mouseout', function () {
      e.classList.remove('text-hover');
    });

  })(elemForCreat);




}
//render() отвечает за рендер надписи текущей папки и времени работы, а так же запуска
//рендера списка файлов и кнопки назад
function render(dataForRender: any): void {
  let scanDirDiv: any = document.querySelector("div.scanDir");

  scanDirDiv.innerHTML = '';

  const elemRoot: HTMLParagraphElement = document.createElement("p");
  elemRoot.setAttribute("class", "text-left");
  elemRoot.setAttribute("id", "with-margins-label");
  const elemTextRoot: Text = document.createTextNode("Текущая директория: " + dataForRender["CurrentPathFolder"]);
  elemRoot.appendChild(elemTextRoot);
  scanDirDiv.appendChild(elemRoot);

  const elemTime: HTMLParagraphElement = document.createElement("p");
  elemTime.setAttribute("class", "text-left");
  elemTime.setAttribute("id", "with-margins-label");
  const elemTextTime: Text = document.createTextNode("Время открытия: " + dataForRender["TimeWork"]);
  elemTime.appendChild(elemTextTime);
  scanDirDiv.appendChild(elemTime);

  renderListDir(dataForRender, scanDirDiv);
  renderBackButton(scanDirDiv)


};

//Функция которая слушает ответ функции загрузки данных с сервера о состоянии ожидания
function listAnsverForServer(status:boolean): void{
  waitAnswer = !status
  if (status == false){
    renderLoadGif(true)
  }else{
    renderLoadGif(false)
  }
  
}




//renderLoadGif() отвечает за отображение гифки загрузки
function renderLoadGif(wait : boolean): void {
  console.log(GifDiv)
  if (wait){
        //Если идёт ожидание ответа от сервера, подгружает картинку загрузки
        delGif = true;

        GifDiv.appendChild(loadingImg);
        //Таск передвинуть гифку вверх и уменьшить её
  }else{

    if (delGif) {
  
      GifDiv.removeChild(loadingImg);
      delGif = false;
    }
  }



}

//main() основная функция модуля ts которая идёт на импорт в index.ts
//запускает первое открытие в стандартную папку
export function main(): void{
  window.addEventListener("load", (event) => {

  });
  
  document.addEventListener("readystatechange", (event) => {
  
  });
  
  //Первичная прогрузка данных и первый стратовый запро на сервер
  document.addEventListener("DOMContentLoaded", async (event) => {
    dirJs = await getDataDir(currertPath, listAnsverForServer);
    console.log(dirJs)
    if (!waitAnswer){
      render(dirJs);
    }
    
  });
}



