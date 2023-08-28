import { Chart, registerables } from "chart.js";
import { getDataForGraph } from "./getDataForGraph";
let dirJs: any
Chart.register(...registerables);
// "id" => $row["id"],
// "root" => $row["pathDir"],
// "date" => $row["Dateque"],
// "size" => $row["SizeDir"],
// "elapsedtime" => $row["TimeWork"],


//Point служит хранилищем одного конкретного экземпляра запроса открытия
interface Point {
    x: number;
    y: number;
}

//main() главная функция модуля, отслеживает события и если контент был загружен запрашивает
//у apache данные из БД 
export function main(): void {
    window.addEventListener("load", (event) => {

    });

    document.addEventListener("readystatechange", (event) => {
    });

    //Первичная прогрузка данных и первый стратовый запро на сервер
    document.addEventListener("DOMContentLoaded", async (event) => {
        dirJs = await getDataForGraph();
        renderGraph(dirJs);
    });
}

//collectDataForGraph() Принимает данные о запросах в формате как они хранились в бд
//и создаёт список из элементов Point для передачи для создания графика
function collectDataForGraph(dataForRender: any): Point[] {
    const dictionary: Point[] = [];
    for (let i = 1; i < dataForRender.length; i++) {
        if (dataForRender[i] != "Dir is blocked!") {

            let size: number = Number(dataForRender[i]["size"].split(" ")[0]);
            const dimension: string = dataForRender[i]["size"].split(" ")[1];
            if (dimension == "Mb") {
                size = size * 1024 * 1024
            } else if (dimension == "Kb") {
                size = size * 1024
            }

            const point: Point = {
                x: dataForRender[i]["elapsedtime"],
                y: size / 1024 / 1024
            };

            dictionary.push(point);

            console.log(size)
            console.log(dimension)

        }


    }
    return dictionary
}


//renderGraph() создаёт график на странице из предоставленных данных 
function renderGraph(dataForRender: any): void {
    const dictionary = collectDataForGraph(dataForRender)
    let ctx = document.getElementById("myChart") as HTMLCanvasElement;
    let myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: '',
                data: dictionary,
                backgroundColor: 'rgb(255, 255, 255)'
            }],
        },
        options: {
            scales: {

                x: {

                    type: 'linear',
                    position: 'bottom',

                }
            }
        }
    });
}
