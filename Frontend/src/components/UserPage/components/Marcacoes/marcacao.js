import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Aula.css";
import Aula from "./marcacoes";
import SearchBar from "../search/SearchBar";
import { useNavigate } from "react-router-dom";

export default function Aulas() {
  const [aulas, setAulas] = useState([]);
  const navigate = useNavigate();

  const url = "http://localhost:3000/aulas";

  useEffect(() => {
    const getAulas = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Accept: "application/json",
          },
        });
        setAulas(response.data.data);
        console.log("aqui");
        console.log(response.data.data);
      } catch (err) {
        console.log(err);
        return navigate("/login");
      }
    };

    getAulas();
  }, []);

  return (
    <div className="aulas">
      <SearchBar placeholder="Search " data={aulas} />
      {aulas?.map((aula) => (
        <Aula key={aula._id} {...aula} />
      ))}
    </div>
  );
}
