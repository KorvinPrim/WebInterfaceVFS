// import {readFile} from "fs";

// function readUrlServer(filePath: string): Promise<string> {
//   return new Promise((resolve, reject) => {
//     readFile(filePath, 'utf8', (err, data) => {
//       if (err) {
//         console.error('Error:', err);
//         resolve("http://192.168.81.50");
//         //reject(err);
//       } else {
//         const firstLine = data.split('\n')[0];
//         resolve(firstLine);
//       }
//     });
//   });
// }
//getDataForGraph() делает get запрос к PHP обработчику выдачи данных
//из БД распарсивает json и возвращает Promis
export function getDataForGraph(): Promise<any> {
  return new Promise(function (resolve, reject) {
    const request = new XMLHttpRequest();
    const url = "http://192.168.81.50/getDataDBForGraph.php";
    request.open('GET', url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.responseType = "json";

    request.addEventListener("readystatechange", () => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          const ResData = request.response;
          resolve(ResData);
        } else {
          reject(new Error("Ошибка при выполнении запроса: " + request.status));
        }
      }
    });

    request.addEventListener("error", () => {
      reject(new Error("Ошибка при выполнении запроса: сервер недоступен"));
    });
    request.send();
  });


}