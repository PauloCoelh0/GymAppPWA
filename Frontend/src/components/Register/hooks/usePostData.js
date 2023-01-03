import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const usePostData = () => {
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const addData = (data) => {
    setLoading(true);
    fetch(`/auth/register`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response) {
          setData(response.json());
          alert("Pedido de registo enviado com sucesso!!");
          navigate("/login");
        } else {
          alert("Error ao adicionar");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error);
        alert(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    data,
    isError,
    isLoading,
    addData: addData,
  };
};
