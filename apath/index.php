<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>VFSweb Shasha</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
    <link rel="stylesheet" href="https://getbootstrap.com/docs/4.6/examples/cover/cover.css">
</head>

<body class="text-center">

<div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
    <header class="masthead mb-auto">
        <div class="inner">
            <h3 class="masthead-brand">KorvinPrim</h3>
            <nav class="nav nav-masthead justify-content-center">
                <a class="nav-link" href="http://localhost:8080/home">Обзор файлов</a>
                <a class="nav-link active" href="http://192.168.81.50/">Статистика</a>
            </nav>
        </div>
    </header>

    <main role="main" class="inner cover-left">
        <div class="gifLoad"></div>
        <h1 class="cover-heading">Текущая статистика запросов</h1>
        <!-- <h1 class="cover-heading">Реализация через PHP</h1>  -->
        <?php
            include 'render.php';
            include 'writingdatabase.php';
            include 'consoleLog.php';
            //Проверяем является ли текущий запрос записывающим, либо является запросом на отображение 
            //HTML страницы по передаваемому аргументу ADDDATA
            if(isset($_GET["ADDDATA"])){
                //Получаем данные из POST запроса
                $jsonData = file_get_contents('php://input');
                $data = json_decode($jsonData, true);
                writeValueDatabase($data);
            } else{
        renderData();
}
        ?>
        <div class="scanDir"></div>
    </main>
    <footer class="mastfoot mt-auto">
        <div class="inner">
            <p>Go here: <a href="https://github.com/KorvinPrim">GitHub KorvinPrim</a></p>
        </div>
    </footer>
</div>
</body>

</html>