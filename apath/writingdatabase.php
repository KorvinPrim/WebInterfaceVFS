<?php
//writeValueDatabase() распарсивает данные из POST запроса и сохраняяет их в БД
function writeValueDatabase($data){ 

        // Доступ к данным из JSON
        $pathd = $data['CurrentPathFolder'];
        $dated = $data['Date'];
        $sized = $data['Size'];
        $timeWorkd = $data['TimeWork'];
    
        $servername = "localhost";
        $username = "root";
        $password = "pass";
        $dbname = "t_stat";
        
        // Создание подключения к базе данных
        $conn = new mysqli($servername, $username, $password, $dbname);
        
        // Проверка на успешное подключение
        if ($conn->connect_error) {
            die("Ошибка подключения к базе данных: " . $conn->connect_error);
        }
        
        // Создание и выполнение запроса INSERT
        $sql = "INSERT INTO listreq (pathDir, Dateque, SizeDir, TimeWork) VALUES ('$pathd', '$dated', '$sized', '$timeWorkd')";
        
        if ($conn->query($sql) === TRUE) {
            echo "Данные успешно добавлены в таблицу";
        } else {
            echo "Ошибка при добавлении данных: " . $conn->error;
        }
        
        // Закрытие соединения с базой данных
        $conn->close();
}
?>