import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./Aula.css";
import Aula from "./marcacoes";
import SearchBar from "../search/SearchBar";
import { TabContext } from "../../../AdminPage/contexts";
import handleFilter from "./marcacoes";

export default function Aulas() {
  const [aulas, setAulas] = useState([]);
  const { setAulasCount } = useContext(TabContext);
  const [filteredAulas, setFilteredAulas] = useState(aulas);

  // console.log("Estou aqui");
  // console.log(filteredAulas);

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
        setAulasCount(response.data.data.length);
        setFilteredAulas(response.data.data);
        // console.log("aqui");
        // console.log(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    getAulas();
  }, []);

  return (
    <div className="aulas">
      <SearchBar
        placeholder="Search"
        data={aulas}
        handleFilterAulas={(filteredData) => setFilteredAulas(filteredData)}
      />
      {filteredAulas.map((aula) => (
        <Aula key={aula._id} {...aula} />
      ))}
    </div>
  );
}
