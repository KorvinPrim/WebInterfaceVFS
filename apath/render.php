<?php
//renderData() выводит данные на страницу в браунзере
function renderData(){ 
// Параметры подключения к базе данных
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
    
    // Генерируем HTML-код таблицы с классом обертки
    $table = '<div class="bootstrap-table-wrapper">
                <table class="table table-bordered">
                    <thead class="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Root</th>
                            <th>Date</th>
                            <th>Size</th>
                            <th>Elapsed Time</th>
                        </tr>
                    </thead>
                    <tbody>';
    
    foreach ($data as $row) {
        $table .= '<tr>
                        <td>' . $row['id'] . '</td>
                        <td>' . $row['root'] . '</td>
                        <td>' . $row['date'] . '</td>
                        <td>' . $row['size'] . '</td>
                        <td>' . $row['elapsedtime'] . '</td>
                    </tr>';
    }
    
    $table .= '</tbody>
            </table>
        </div>';
    
    // Подключаем CSS стили 
    $css = '<style>
                .bootstrap-table-wrapper table {
                    border-collapse: collapse;
                    color: white; /* Изменяем цвет шрифта на белый */
                }
                .bootstrap-table-wrapper th,
                .bootstrap-table-wrapper td {
                    border: 1px solid black;
                    padding: 8px;
                }
            </style>';
    
    // Выводим таблицу со стилями 
    echo $css . $table;

}
?>