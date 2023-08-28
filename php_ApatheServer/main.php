<?php
function main()
{
    include 'render.php';
    include 'writingdatabase.php';
    include 'consoleLog.php';
    include 'getDate.php';
    //Проверяем является ли текущий запрос записывающим, либо является запросом на отображение 
    //HTML страницы по передаваемому аргументу ADDDATA
    if (isset($_GET["ADDDATA"])) {
        //Получаем данные из POST запроса
        writeValueDatabase(file_get_contents('php://input'));

    } else {
        renderData(getDateDir());
    }
}
?>