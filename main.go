package main

import (
	"fmt"
	"html/template"
	"net/http"
	"sort"
	"strings"

	"github.com/gorilla/mux"
	_ "github.com/gorilla/mux" //go get -u github.com/gorilla/mux
)

type frontendData struct {
	FileDescription   string
	FilePath          string
	ThisCurrentFolder bool
}

var showFullPath string
var listResFront map[string]ParticularFile
var currertPath string
var startPath string
var returnRes []frontendData

// writeRes() выводит результаты работы программы и представляет их в удобном виде для понимания
func OutputFileFolders(mapRes map[string]ParticularFile, rootPath string, fullVisibility string) ([]frontendData, error) {
	returnRes = []frontendData{}

	//Производим сортировку через ключи (полный путь)
	keys := make([]string, 0, len(mapRes))
	for key := range mapRes {
		if mapRes[key].MotherDir == rootPath {
			keys = append(keys, key)
		}
	}
	sort.Strings(keys)
	//Идём по основной mapRes через отсортированные ключи

	listFolderDirSplit := strings.Split(rootPath, "_")
	MatherPathForCurrertPath := strings.Join(listFolderDirSplit[:len(listFolderDirSplit)-1], "/")
	selfElem := frontendData{fmt.Sprintf("This dir: %v", rootPath),
		MatherPathForCurrertPath,
		true}
	returnRes = append(returnRes, selfElem)

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

		//В зависимости от заданного при старте работы, устанавливаем отображение
		//только имяни или пути

		if fullVisibility == "full" {
			nameForD = SortKey
		} else {
			nameForD = fileI.Name
		}

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
	currertPath = startPath
	tmpl, _ := template.ParseFiles("templates/index.html")
	fmt.Println(currertPath)
	res, err := OutputFileFolders(listResFront, currertPath, showFullPath)
	if err != nil {

		return
	}

	tmpl.Execute(w, res)
}

func showDataFolder(w http.ResponseWriter, r *http.Request) {
	tmpl, _ := template.ParseFiles("templates/index.html")
	vars := mux.Vars(r)
	correctDirPath := strings.Join(strings.Split(vars["key"], "_"), "/")
	currertPath = correctDirPath

	fmt.Println(correctDirPath)
	res, err := OutputFileFolders(listResFront, correctDirPath, showFullPath)
	if err != nil {

		return
	}
	tmpl.Execute(w, res)
}

func back(w http.ResponseWriter, r *http.Request) {
	tmpl, _ := template.ParseFiles("templates/index.html")
	vars := mux.Vars(r)

	listFolderDirSplit := strings.Split(vars["key"], "_")

	correctDirPath := strings.Join(listFolderDirSplit[:len(listFolderDirSplit)-1], "/")
	currertPath = correctDirPath

	fmt.Println(correctDirPath)
	res, err := OutputFileFolders(listResFront, correctDirPath, showFullPath)
	if err != nil {

		return
	}
	tmpl.Execute(w, res)
}

// handleRequest() цепляет функции на вызываемые адреса
func handleRequest() {
	rtr := mux.NewRouter()
	rtr.HandleFunc("/", index)

	rtr.HandleFunc("/back/{key}", back)

	//the ending can only accept numbers from 0-9 and there can be several of them
	rtr.HandleFunc("/folder/{key}", showDataFolder).Methods("GET", "POST")

	http.Handle("/", rtr)
	//Слушаем адреса с 8080 порта
	http.ListenAndServe(":8080", nil)
}

// main() Основная функция запускает обработчик запросов адресов
func main() {
	showFullPath = ""
	currertPath = "/"
	startPath = currertPath
	listResFront = make(map[string]ParticularFile)
	listResFront["/File1.exe"] = ParticularFile{
		//path.Join(rootPath, file.Name()), - Такая запись если нужно вернуть отображение
		//пути в имени при выводе
		"File1.exe",
		10000,
		false,
		"/",
		false}

	listResFront["/File2.exe"] = ParticularFile{
		//path.Join(rootPath, file.Name()), - Такая запись если нужно вернуть отображение
		//пути в имени при выводе
		"File2.exe",
		10000,
		false,
		"/",
		false}

	listResFront["/folder1"] = ParticularFile{
		//path.Join(rootPath, file.Name()), - Такая запись если нужно вернуть отображение
		//пути в имени при выводе
		"folder1.exe",
		10000,
		true,
		"/",
		false}

	listResFront["/folder1/fieTerminal.exe"] = ParticularFile{
		//path.Join(rootPath, file.Name()), - Такая запись если нужно вернуть отображение
		//пути в имени при выводе
		"fieTerminal.exe",
		9010,
		false,
		"/folder1",
		false}

	handleRequest()
}
