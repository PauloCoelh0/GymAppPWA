import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Cars.css";
import config from "../../../../config";
import Car from "./marcacoes";
// import SearchBar from "../searchBar/SearchBar";
import { useNavigate } from "react-router-dom";

export default function Cars() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  const url = "http://localhost:3000/aulas";

  useEffect(() => {
    const getCars = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Accept: "application/json",
            // Authorization: "Baerer " + config.token,
          },
        });
        setCars(response.data.data);
        console.log("aqui");
        console.log(response.data.data);
      } catch (err) {
        console.log(err);
        return navigate("/login");
      }
    };

    getCars();
  }, []);

  return (
    <div className="cars">
      {/* <SearchBar placeholder="Search " data={cars} /> */}
      {cars?.map((car) => (
        <Car key={car._id} {...car} />
      ))}
    </div>
  );
}
