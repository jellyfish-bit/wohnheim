const cycle = 7;
const roomPairs = 16;
const currentDateTime = new Date().getTime();
const currentEndDateTime = currentDateTime + ((cycle-1) * 86400000)

let startDate = new Date("2024-03-11");
let endDate = new Date("2024-03-17");

for (let i = 1; i <= roomPairs;i++) {
    const element = document.getElementById("room" + i);
    let dateStart = new Date(startDate);
    let dateEnd = new Date(endDate);

    setupLine(element, dateStart, dateEnd, i);

    startDate.setDate(startDate.getDate() + cycle);
    endDate.setDate(endDate.getDate() + cycle);

}
function setupLine(element, dateStart, dateEnd, index) {
    while (dateEnd.getTime() + 86400000 < currentDateTime) {
        dateStart.setDate(dateStart.getDate() + roomPairs * cycle);
        dateEnd.setDate(dateEnd.getDate() + roomPairs * cycle);
    }
    const dateString = dateStart.toLocaleDateString("en-DE") + " - " + dateEnd.toLocaleDateString("en-DE");
    element.innerText = dateString.replaceAll("/", ".");

    if (dateStart.getTime() < currentDateTime && dateEnd.getTime() < currentEndDateTime) {
        element.classList.add("main-color", "main-color-border");
        document.getElementById("room" + index + ".1").classList.add("main-color", "main-color-border")
        document.getElementById("room" + index + ".2").classList.add("main-color", "main-color-border")
        //document.getElementById("note" + index ).classList.add("main-color", "main-color-border")

    }
}

fetch("./floor-drinks-2.json").then(response => {
    return response.json()
}
).then(data => {console.log(data)})