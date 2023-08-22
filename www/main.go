package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"sort"
	"strings"
)

// transportStruct Транспортная обёртка для данных для фронтенда
type transportStruct struct {
	Status            bool
	ErrText           error
	CurrentPathFolder string
	DataDir           []frontendData
	TimeWork          string
}

// frontendData структура для экземпляра файла для передачи во фронтенд
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
var transpForFrontJson transportStruct     //Транспортная обёртка для данных для фронтенда
var statusScanPath bool                    //Удалось ли провести сканирование пути

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
		dimension := "File is blocked!"
		var size string
		var nameForD string
		if fileI.Size < 0 {
			size = ""
		} else if fileI.Size/1024/1024 != 0 {
			size = fmt.Sprint(fileI.Size / 1024 / 1024)
			dimension = " Mb"
		} else if fileI.Size/1024 != 0 {
			size = fmt.Sprint(fileI.Size / 1024)
			dimension = " Kb"
		} else if fileI.Size/1024 != 0 {
			size = fmt.Sprint(fileI.Size)
			dimension = " ba"
		}
		//В зависимости от заданного при старте работы, устанавливаем отображение имяни или пути
		if fullVisibility == "full" {
			nameForD = SortKey
		} else {
			nameForD = fileI.Name
		}
		//Переформатируем строку из формата dir1/dir2/file1 в dir1_dir2_file1
		//pathFromFront := strings.Join(strings.Split(SortKey, "/"), "_")
		selfElem := frontendData{fmt.Sprintf("%v%v  -  %v %v %v", personalTabulation, directORfile, nameForD, size, dimension),
			SortKey,
			false,
		}
		returnRes = append(returnRes, selfElem)
	}

	return returnRes, nil
}

// index() обработка основной страницы
func index(w http.ResponseWriter, r *http.Request) {
	//tmpl, _ := template.ParseFiles("templates/index.html") //Убрали подтягивание шаблона HTML
	//Получаем значение пути из ссылки
	currertPath := r.URL.Query().Get("ROOT")
	log.Println(currertPath)

	//Проверяем, возможно сканирование уже проводилось
	// count, ok := listResFront[currertPath]
	// if ok{
	// 	listResFront, time, err :=!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	// }

	//Отправляем путь в VFS
	listResFront, time, err := Read(currertPath)

	if err != nil {
		log.Println(err)
	}

	if err != nil {
		statusScanPath = false
	} else {
		statusScanPath = true
	}

	//Формируем структуры вывода для JS
	res, _ := OutputFileFolders(listResFront, currertPath, showFullPath)

	//Конвертируем результирующую структуру в формат Json
	//transForResJson, _ := json.Marshal(res)
	transpForFrontJson = transportStruct{statusScanPath, err, currertPath, res, time}

	jsonFormData, _ := json.Marshal(transpForFrontJson)
	//Передаём Json в http.ResponseWriter
	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonFormData)

}

// home_page() обработка тестовой страницы в дальнейшем будет удалёно или изменено
func home_page(w http.ResponseWriter, r *http.Request) {
	res, err := OutputFileFolders(listResFront, currertPath, showFullPath)
	if err != nil {

		return
	}

	tmpl, _ := template.ParseFiles("templates/index.html")

	tmpl.Execute(w, res)
}

// handleRequest() цепляет функции на вызываемые адреса
func handleRequest() {
	//Добавляем обработку основной ссылки
	http.HandleFunc("/", index)
	//Добавляем обработчик демонстрационной страницы (тест)
	http.HandleFunc("/home", home_page)
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

//http://localhost:8080/?ROOT=/home/anton/go/src/WebInterfaceVFS/
