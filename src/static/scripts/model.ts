//getDataDir() запускает запрос и возвращает данные о файлах по
//данному пути от сервера
export function getDataDir(cPath: string, statusAnsver: (status: boolean) => void): Promise<any> {
  return new Promise(function (resolve, reject) {
    const request = new XMLHttpRequest();

    const url = "/?ROOT=" + cPath;
    request.open('GET', url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.responseType = "json";

    request.addEventListener("readystatechange", () => {
      if (request.readyState === 4 && request.status === 200) {
        const ResData = request.response;
        statusAnsver(true);
        resolve(ResData);
      }
    });

    statusAnsver(false);
    request.send();
  });
}