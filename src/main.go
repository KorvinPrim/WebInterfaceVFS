package main

import (
	"bufio"
	"bytes"
	"encoding/json"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"reflect"
	"sort"
	"strings"
	"time"
)

// transportStruct Транспортная обёртка для данных для фронтенда
type transportStruct struct {
	Status            bool
	ErrText           error
	CurrentPathFolder string
	DataDir           []frontendData
	TimeWork          string
}

// transportStructForPhp структура для экземпляра файла для передачи в бекенд php для дальнешей записи в субд
type transportStructForPhp struct {
	Status            bool
	ErrText           error
	CurrentPathFolder string
	Date              string
	Size              string
	TimeWork          string
}

// frontendData структура для экземпляра файла для передачи во фронтенд js
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
		dimension := "Dir is blocked!"
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

// findFolderSizeByFiles() находит размер папки, по уже найденным файлам в ней
func findFolderSizeByFiles(mapRes map[string]ParticularFile, rootPath string) string {
	//returnRes = []frontendData{}

	//Производим сортировку через ключи (полный путь)
	keys := make([]string, 0, len(mapRes))
	for key := range mapRes {
		//Проверяем, является ли родительской директорией файла текущая директория, если да, тогда добавляем его
		if mapRes[key].MotherDir == rootPath {
			keys = append(keys, key)
		}
	}

	sort.Strings(keys)
	//Считаем вес файла
	var size int64 = 0
	for _, SortKey := range keys {
		elemSize := mapRes[SortKey].Size
		if fmt.Sprintf("%v", reflect.TypeOf(elemSize)) == "int64" {
			size += elemSize
		}

	}
	//Устанавливаем размерность массы файла
	sizeForRet := ""
	dimension := "Dir is blocked!"
	if size < 0 {
		sizeForRet = ""
	} else if size/1024/1024 != 0 {
		sizeForRet = fmt.Sprint(size / 1024 / 1024)
		dimension = " Mb"
	} else if size/1024 != 0 {
		sizeForRet = fmt.Sprint(size / 1024)
		dimension = " Kb"
	} else if size/1024 != 0 {
		sizeForRet = fmt.Sprint(size)
		dimension = " ba"
	}

	return fmt.Sprintf("%v%v", sizeForRet, dimension)
}

// readServerId() возвращает ссылку на сервер для записи
// данных в бд из файла configServ.txt
func readServerId() (string, error) {
	// Открываем файл для чтения
	var firstLine string
	file, err := os.Open("configServ.txt")
	if err != nil {
		fmt.Println("Ошибка при открытии файла:", err)
		return "", err
	}
	defer file.Close()

	// Создаем сканер для чтения файла
	scanner := bufio.NewScanner(file)

	// Читаем первую строку файла
	if scanner.Scan() {
		firstLine = scanner.Text()

	}

	if err := scanner.Err(); err != nil {
		fmt.Println("Ошибка при чтении файла:", err)
	}
	return firstLine, nil
}

// sendPhpData() отправляет данные о текущей папке в  PHP
func sendPhpData(Status bool,
	ErrText error,
	CurrentPathFolder string,
	Date string,
	Size string,
	TimeWork string) {
	data := transportStructForPhp{Status, ErrText, CurrentPathFolder, Date, Size, TimeWork}
	// Создаем структуру данных для JSON

	// Преобразуем структуру данных в JSON
	jsonData, err := json.Marshal(data)
	if err != nil {
		fmt.Println("Ошибка при преобразовании в JSON:", err)
		return
	}

	curUrl, err := readServerId()
	// Определенная ссылка для отправки JSON
	url := curUrl + "/?ADDDATA=true"

	if err != nil {
		fmt.Println("Ошибка при считывании конфигурационного файла", err)
		return
	}

	// Создаем запрос POST с JSON-данными
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		fmt.Println("Ошибка при создании запроса:", err)
		return
	}

	// Устанавливаем заголовок Content-Type для JSON
	req.Header.Set("Content-Type", "multipart/form-data")

	// Отправляем запрос и получаем ответ
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Ошибка при отправке запроса:", err)
		return
	}
	defer resp.Body.Close()

	// Проверяем статус ответа
	if resp.StatusCode == http.StatusOK {
		fmt.Println("JSON-файл успешно отправлен в", url)
	} else {
		fmt.Println("Ошибка при отправке JSON-файла. Код статуса:", resp.StatusCode)
	}
}

// index() обработка основной страницы
func index(w http.ResponseWriter, r *http.Request) {
	//tmpl, _ := template.ParseFiles("templates/index.html") //Убрали подтягивание шаблона HTML
	//Получаем значение пути из ссылки
	currertPath := r.URL.Query().Get("ROOT")
	log.Println(currertPath)

	listResFront, timeWorck, err := Read(currertPath)

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
	transpForFrontJson = transportStruct{statusScanPath, err, currertPath, res, timeWorck}

	dt := time.Now()

	sizeCurFold := findFolderSizeByFiles(listResFront, currertPath)
	//Отправляем данные для PHP
	sendPhpData(true, err, currertPath, dt.Format("01-02-2006"), sizeCurFold, timeWorck)

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

	tmpl, _ := template.ParseFiles("static/dist/index.html")

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
	http.Handle("static/dist", http.StripPrefix("static/dist", http.FileServer(http.Dir("./static/dist"))))
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
