import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";
const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  const options = {
    method: "GET",
    url: "https://toronto-pearson-airport.p.rapidapi.com/departures",
    headers: {
      "X-RapidAPI-Key":
        process.env.RAPID_API_KEY ||
        "d6f22a5797msh48e0b7b2aff05cfp1b3ee9jsn56263f38024d",
      "X-RapidAPI-Host": "toronto-pearson-airport.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      res.json(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.listen(port, () => console.log(`server is running at ${port}`));
