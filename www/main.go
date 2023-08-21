package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sort"
	"strings"
)

// frontendData структура для экземпляра файла для передачи во фронтенд, в будущем будет убран и заменён json-ном
type frontendData struct {
	FileDescription   string
	FilePath          string
	ThisCurrentFolder bool
}

var showFullPath string //Переменная отвечающая за включения показа
// полного пути приравнять к full-что бы отображать полный путь
var listResFront map[string]ParticularFile //Список со всеми файлами в отсканированной директории
var currertPath string                     //Текущая дериктория
var startPath string                       //Путь стартовой дериктории
var returnRes []frontendData               //Список файлов в текущей директории

// OutputFileFolders() собирает структуру с нужными данными и в нужном формате
// о полученных файлов для конвертации в Json и передачи в http.ResponseWriter в дальнейшем
func OutputFileFolders(mapRes map[string]ParticularFile, rootPath string, fullVisibility string) ([]frontendData, error) {
	returnRes = []frontendData{}

	//Производим сортировку через ключи (полный путь)
	keys := make([]string, 0, len(mapRes))
	for key := range mapRes {
		//Проверяем, является ли родительской директорией файла текущая директория, если да, тогда добавляем его
		if mapRes[key].MotherDir == rootPath {
			keys = append(keys, key)
		}
	}

	sort.Strings(keys)
	//Идём по основной mapRes через отсортированные ключи
	//Остаток кода после работы с gorillaMix, при переходе на работу с JS и PHP будет упразнён
	//Сейчас оставлен для работоспособности текущей версии.
	//Код отвечал за переконвертировании ссылки-пути: dir1_dir2_file1 в формат dir1/dir2/file1
	listFolderDirSplit := strings.Split(rootPath, "_")
	MatherPathForCurrertPath := strings.Join(listFolderDirSplit[:len(listFolderDirSplit)-1], "/")
	selfElem := frontendData{fmt.Sprintf("This dir: %v", rootPath),
		MatherPathForCurrertPath,
		true}
	returnRes = append(returnRes, selfElem)

	//Формируем структуру frontendData для передачи во фронтенд
	for _, SortKey := range keys {
		//Определяем тип
		fileI := mapRes[SortKey]
		directORfile := "File"
		if fileI.IsDir {
			directORfile = "Directory"
		}
		//Добавляем табуляцию по число вложений в папки отнимаем начальный сдвиг по исходному пути
		personalTabulation := strings.Repeat("\t", len(strings.Split(SortKey, "/"))-len(strings.Split(rootPath, "/")))
		//Определяем форматирование относительно веса файла
		dimension := " ba"
		var size int64
		var nameForD string
		if fileI.Size/1024/1024 != 0 {
			size = fileI.Size / 1024 / 1024
			dimension = " Mb"
		} else if fileI.Size/1024 != 0 {
			size = fileI.Size / 1024
			dimension = " Kb"
		}

		//В зависимости от заданного при старте работы, устанавливаем отображение имяни или пути
		if fullVisibility == "full" {
			nameForD = SortKey
		} else {
			nameForD = fileI.Name
		}
		//Переформатируем строку из формата dir1/dir2/file1 в dir1_dir2_file1
		pathFromFront := strings.Join(strings.Split(SortKey, "/"), "_")
		selfElem := frontendData{fmt.Sprintf("%v%v  -  %v %v %v", personalTabulation, directORfile, nameForD, size, dimension),
			pathFromFront,
			false,
		}
		returnRes = append(returnRes, selfElem)
	}

	return returnRes, nil
}

// index() обработка основной страницы и создание экцемпляра User
func index(w http.ResponseWriter, r *http.Request) {
	//tmpl, _ := template.ParseFiles("templates/index.html") //Убрали подтягивание шаблона HTML
	//Получаем значение пути из ссылки
	currertPath := r.URL.Query().Get("ROOT")
	log.Println(currertPath)
	//Отправляем путь в VFS
	listResFront, err := Read(currertPath)
	if err != nil {
		log.Println(err)
	}
	//Формируем структуры вывода для JS
	res, err := OutputFileFolders(listResFront, currertPath, showFullPath)
	if err != nil {

		return
	}
	//Конвертируем результирующую структуру в формат Json
	jsonFormRes, _ := json.Marshal(res)
	//Передаём Json в http.ResponseWriter
	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonFormRes)

}

// handleRequest() цепляет функции на вызываемые адреса
func handleRequest() {
	//Добавляем обработку основной ссылки
	http.HandleFunc("/", index)
	//Добавляем статику
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static/"))))
	//Слушаем адреса с 8080 порта
	http.ListenAndServe(":8080", nil)
}

// main() Основная функция запускает обработчик запросов адресов и в ней формируются тестовые файлы и директории
func main() {
	showFullPath = ""
	currertPath = "/"
	startPath = currertPath
	listResFront = make(map[string]ParticularFile)

	handleRequest()
}
