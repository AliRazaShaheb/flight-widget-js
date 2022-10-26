const tableBody = document.getElementById("table-body");

let flights = [
  {
    time: "08:11",
    destination: "OMAN",
    flight: "OX 203",
    gate: "A 01",
    remarks: "ON TIME",
  },
  {
    time: "09:10",
    destination: "DUBAI",
    flight: "ML 100",
    gate: "B 01",
    remarks: "ON TIME",
  },
  {
    time: "10:15",
    destination: "LONDON",
    flight: "LA 012",
    gate: "C 01",
    remarks: "CANCELLED",
  },
  {
    time: "10:30",
    destination: "MUMBAI",
    flight: "MU 001",
    gate: "A 02",
    remarks: "ON TIME",
  },
  {
    time: "11:00",
    destination: "NEW DELHI",
    flight: "DL 101",
    gate: "C 02",
    remarks: "ON TIME",
  },
];

const populateFlights = () => {
  for (let flight of flights) {
    const tb_row = document.createElement("tr");

    for (let flightDetails in flight) {
      const tb_cell = document.createElement("td");

      const word = Array.from(flight[flightDetails]);

      for (let [index, character] of word.entries()) {
        setTimeout(() => {
          const span = document.createElement("span");
          span.classList.add("flip");
          span.textContent = character;
          tb_cell.append(span);
        }, 100 * index);
      }
      tb_row.append(tb_cell);
    }
    tableBody.append(tb_row);
  }
};

const destination = [
  "OMAN",
  "DUBAI",
  "MUMBAI",
  "KOLKATA",
  "BAIRUT",
  "MOSCOW",
  "BAGDOGRA",
  "NEW DELHI",
];
const remarks = ["ON TIME", "CANCELLED", "DELAYED"];

const numbers = "0123456789";
const letters = "ABCDEFGHIJKLMNOPQSTUVWZ";

function generateRandom(str, limit) {
  if (limit) {
    return Math.floor(Math.random() * limit);
  }
  return str.charAt(Math.floor(Math.random() * str.length));
}

function randomTime(time) {
  const t = generateRandom("", time);
  return t <= 9 ? `0${t}` : `${t}`;
}
populateFlights();
const id = setInterval(() => {
  flights.shift();
  flights.push({
    time: `${randomTime(24)}:${randomTime(60)}`,
    destination: destination[Math.floor(Math.random() * destination.length)],
    flight: `${generateRandom(letters)}${generateRandom(
      letters
    )} ${generateRandom(numbers)}${generateRandom(numbers)}${generateRandom(
      numbers
    )}`,
    gate: `${generateRandom(letters)} ${generateRandom(
      numbers
    )}${generateRandom(numbers)}`,
    remarks: remarks[Math.floor(Math.random() * remarks.length)],
  });
  tableBody.textContent = "";
  populateFlights();
}, 4000);

setTimeout(() => {
  clearInterval(id);
}, 300000);
