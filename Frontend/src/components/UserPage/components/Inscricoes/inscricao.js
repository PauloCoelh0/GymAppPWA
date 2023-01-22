import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./Aula.css";
import Inscricoes from "./inscricoes";
import Cookies from "js-cookie";
import { InscricoesContext } from "../../../AdminPage/contexts";

export function Inscricao() {
  const [aulas, setAulas] = useState([]);
  const cookieValue = Cookies.get("userID");
  const { setAulasInscritasCount } = useContext(InscricoesContext);
  const valueWithoutJ = cookieValue.substring(3, cookieValue.length - 1);
  const userId = valueWithoutJ;

  const url = `http://localhost:3000/aulas/subscription/${userId}`;
  useEffect(() => {
    const getAulas = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Accept: "application/json",
          },
        });
        setAulas(response.data);
        setAulasInscritasCount(response.data.length);
        console.log("aqui");
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getAulas();
  }, []);

  const deleteCard = (id) => {
    setAulas((aulas) => aulas.filter((aula) => aula._id !== id));
  };

  return (
    <div className="aulas">
      {aulas.map((aula) => (
        <Inscricoes
          key={aula._id}
          aula={aula}
          {...aula}
          onDelete={() => deleteCard(aula._id)}
        />
      ))}
    </div>
  );
}
