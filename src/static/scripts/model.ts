//getDataDir() запускает запрос и возвращает данные о файлах по
//данному пути от сервера
export function getDataDir(cPath: string, statusAnswer: (status: boolean) => void): Promise<any> {
  return new Promise(function (resolve, reject) {
    const request = new XMLHttpRequest();

    const url = "/?ROOT=" + cPath;
    request.open('GET', url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.responseType = "json";

    request.addEventListener("readystatechange", () => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          const ResData = request.response;
          statusAnswer(true);
          resolve(ResData);
        } else {
          statusAnswer(false);
          reject(new Error("Ошибка при выполнении запроса: " + request.status));
        }
      }
    });

    request.addEventListener("error", () => {
      statusAnswer(false);
      reject(new Error("Ошибка при выполнении запроса: сервер недоступен"));
    });

    statusAnswer(false);
    request.send();
  });
}