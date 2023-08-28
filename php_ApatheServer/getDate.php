<?php
//getDateDir() возвращает распарсенный json со всеми данными из БД
function getDateDir()
{
    // Параметры подключения к базе данных
    $servername = "localhost";
    $username = "root";
    $password = "pass";
    $dbname = "t_stat";

    try {
        // Создание подключения к базе данных
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Проверка на успешное подключение
        if ($conn->connect_error) {
            die("Ошибка подключения к базе данных: " . $conn->connect_error);
        }
        // Создание и выполнение запроса SELECT
        $sql = "SELECT * FROM listreq";
        $result = $conn->query($sql);

        // Проверка на наличие данных
        if ($result->num_rows > 0) {
            // Вывод данных
            while ($row = $result->fetch_assoc()) {
                $elem = array(
                    "id" => $row["id"],
                    "root" => $row["pathDir"],
                    "date" => $row["Dateque"],
                    "size" => $row["SizeDir"],
                    "elapsedtime" => $row["TimeWork"],
                );
                $data[] = $elem;

            }
        } else {
            echo "Нет данных в таблице";
        }

        // Закрытие соединения с базой данных
        $conn->close();

    } catch (Exception $e) {
        echo $e->getMessage();
        $data = "Error con to BD";
        die();

    }




    return $data;
}
?>