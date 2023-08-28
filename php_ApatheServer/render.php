<?php
//renderData() выводит данные на страницу в браунзере
function renderData($dataForTable)
{
    if ($dataForTable != "Error con to BD") { // Генерируем HTML-код таблицы с классом обертки
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

        foreach ($dataForTable as $row) {
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
    }else{
        $errWr = '<p>Error con to DB!</p>';
        echo $errWr;
    }


}
?>