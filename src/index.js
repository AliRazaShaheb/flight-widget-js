const tableBody = document.getElementById("table-body");

// let flights = [
//   {
//     time: "08:11",
//     destination: "OMAN",
//     flight: "OX 203",
//     gate: "A 01",
//     remarks: "ON TIME",
//   },
//   {
//     time: "09:10",
//     destination: "DUBAI",
//     flight: "ML 100",
//     gate: "B 01",
//     remarks: "ON TIME",
//   },
//   {
//     time: "10:15",
//     destination: "LONDON",
//     flight: "LA 012",
//     gate: "C 01",
//     remarks: "CANCELLED",
//   },
//   {
//     time: "10:30",
//     destination: "MUMBAI",
//     flight: "MU 001",
//     gate: "A 02",
//     remarks: "ON TIME",
//   },
//   {
//     time: "11:00",
//     destination: "NEW DELHI",
//     flight: "DL 101",
//     gate: "C 02",
//     remarks: "ON TIME",
//   },
// ];
const baseURL = "http://localhost:8000/";
let flights = [];

const addData = (data) => {
  flights.push(data);
};

const fetchData = async () => {
  const res = await fetch(baseURL);
  const json = await res.json();
  const data = JSON.stringify(json);
  addData(data);
  return json;
};

const populateFlights = (arr, start, end) => {
  const flights_sliced = arr.slice(start, end);
  for (let flight of flights_sliced) {
    const tb_row = document.createElement("tr");
    const new_flightDetails = {
      time: flight.departing.toUpperCase(),
      destination: flight.destination.slice(0, 10).toUpperCase(),
      flight: flight.flightNumber[0].slice(0, 10).toUpperCase(),
      gate: flight.gate.toUpperCase(),
      remarks: flight.status.toUpperCase(),
    };

    for (let flightDetails in new_flightDetails) {
      const tb_cell = document.createElement("td");

      const word = Array.from(new_flightDetails[flightDetails]);

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
console.log(flights);
let start = 0;
let end = 6;
const id = setInterval(async () => {
  const data = await fetchData();
  tableBody.textContent = "";
  populateFlights(data, start, end);
  start++;
  end++;
}, 4000);

// setTimeout(() => {
//   clearInterval(id);
// }, 300000);
