package main

import (
	"errors"
	"fmt"
	"io/fs"
	"log"
	"os"
	"path"
	"sort"
	"strings"
	"sync"
	"time"
)

// ParticularFile тип структуры созданный для удобства отображения конкретного файла
// Под которым собрана информация: о имени, размере, и о том является ли экземпляр
// файлом или папкой, какая директория для этого экземпляра родительская и выведена ли уже
// информция о нём в терминал
type ParticularFile struct {
	Name      string //Имя файла
	Size      int64  //Размер файла
	IsDir     bool   //Папка ли конкретная сущность
	MotherDir string //Родительский путь
	TimeScan  string //Время сканирования файла
}

// listRes карта содержащая все экземпляры ParticularFile найденные во время работы, для
// дальнейшего вывода в терминал
var listRes map[string]ParticularFile

// mutex мьютекс созданный для того что бы контролировать доступ горутин к listRes
var mutex sync.Mutex

// folderSize() рекурсивно проходит все вложенные папки и файлы и подсчитывает их вес
func folderSize(rootPath string) (int64, error) {
	var ValSize int64
	files, err := OpenPath(rootPath)
	if err != nil {
		fmt.Println(err)
		return 0, err
	}
	for _, file := range files {
		//Если файл то пробавляем вес файла к весу папки
		if !file.IsDir() {
			ValSize += file.Size()
		} else {
			//Если фиректория то делаем рекурсивный вход
			folder_size, err := folderSize(path.Join(rootPath, file.Name()))
			if err != nil {
				return 0, err
			} else {
				//Если рекурсия закончена прибавляем размер к весу папки
				ValSize += folder_size
			}
		}

	}
	return ValSize, nil
}

// writeRes() выводит результаты работы программы и представляет их в удобном виде для понимания
func writeRes(mapRes map[string]ParticularFile, rootPath string, fullVisibility string) error {
	//Производим сортировку через ключи (полный путь)
	keys := make([]string, 0, len(mapRes))
	for key := range mapRes {
		keys = append(keys, key)
	}
	sort.Strings(keys)
	//Идём по основной mapRes через отсортированные ключи
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
		fmt.Println(personalTabulation, directORfile, " - ", nameForD, " ", size, dimension)
	}
	return nil
}

// checkCorrectnessPath() проверяет, существует ли путь
func checkCorrectnessPath(rootPath string) error {

	fileInfo, err := os.Stat(path.Join(rootPath))
	if err != nil {
		fmt.Println(err)
		return err
	}

	if !fileInfo.IsDir() {
		fmt.Println("Path file, no dir!")
		return errors.New("Path file, no dir!")
	}

	return nil
}

// OpenPath() открывает и собирает данные в указанной директории
// после возвращает полученный []fs.FileInfo.
func OpenPath(rootPath string) ([]fs.FileInfo, error) {
	dir, err := os.Open(path.Join(rootPath))
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	defer dir.Close()

	// Получаем список файлов и папок
	files, err := dir.Readdir(-1)

	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	return files, err
}

// ScanPath() получет WaitGroup,путь начальной директории, и мьютекс.
// Далее записывает их в зависимости от типа (файл или директория)
// Если директория, тогда вызывает новую горутину самого себя для учёта всех файлов этой директории
func ScanPath(wg *sync.WaitGroup,
	wgFolder *sync.WaitGroup,
	rootPath string,
	mutex *sync.Mutex,
) ([]fs.FileInfo, error) {
	defer mutex.Unlock()
	defer func() { wg.Done() }()
	//Запускаем таймер
	starttime := time.Now()

	//Получаем список []fs.FileInfo с файлами в указанной директории
	files, err := OpenPath(rootPath)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	mutex.Lock() //Работает корректно без гонки и дедлоков только в таком положении
	//Для каждого найденного файла
	for _, file := range files {
		//Проверяем папка ли
		if !file.IsDir() {
			//Если файл просто записываем в listRes
			listRes[path.Join(rootPath, file.Name())] = ParticularFile{
				//path.Join(rootPath, file.Name()), - Такая запись если нужно вернуть отображение
				//пути в имени при выводе
				file.Name(),
				file.Size(),
				false,
				rootPath,
				fmt.Sprintf("%v", time.Since(starttime))}
		} else {
			//Если папка находим размер
			Fsize, err := folderSize(path.Join(rootPath, file.Name()))
			if err != nil {
				listRes[path.Join(rootPath, file.Name())] = ParticularFile{
					//path.Join(rootPath, file.Name()), - Такая запись если нужно вернуть отображение
					//пути в имени при выводе
					file.Name(),
					-1,
					true,
					rootPath,
					fmt.Sprintf("%v", time.Since(starttime))}
			} else {
				//Записываем эту папку с её размером

				listRes[path.Join(rootPath, file.Name())] = ParticularFile{
					//path.Join(rootPath, file.Name()), - Такая запись если нужно вернуть отображение
					//пути в имени при выводе
					file.Name(),
					Fsize,
					true,
					rootPath,
					""}
				//Запускаем горутину для этой папки
				wg.Add(1)

				wgFolder.Add(1)
				go ScanPath(wg, wgFolder, path.Join(rootPath, file.Name()), mutex)
				wgFolder.Wait()
				workTime := fmt.Sprintf("%v", time.Since(starttime))
				linklOneElem := listRes[path.Join(rootPath, file.Name())]
				linklOneElem.TimeScan = workTime

			}
		}

	}
	wgFolder.Add(-1)

	return files, nil
}

// Read()  Эта функция начинает процесс
// сбора данных в указанной директории и координирует
// гоурутины.
func Read(pathScan string) (map[string]ParticularFile, string, error) {
	// f, _ := OpenPath("/")
	// for _, el := range f {
	// 	log.Println(el.Name())
	// }
	starttime := time.Now()
	var wgScan sync.WaitGroup
	var wgScanFolder sync.WaitGroup
	wgScan.Add(1)

	listRes = make(map[string]ParticularFile)

	//Запускаем сбор данных
	err := checkCorrectnessPath(pathScan)

	if err != nil {
		workTime := fmt.Sprintf("%v", time.Since(starttime))
		return nil, workTime, err
	} else {
		go ScanPath(&wgScan, &wgScanFolder, pathScan, &mutex)
		//Дожидаемся окончания
		wgScan.Wait()
		//Выводим результаты
		workTime := fmt.Sprintf("%v", time.Since(starttime))
		log.Println(workTime)
		return listRes, workTime, nil
	}
}
