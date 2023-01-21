import { useForm } from "react-hook-form";
import "./styles.moddule.scss";
import axios from "axios";

const url = "http://localhost:3000/mensagens/create";

function Messagens() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => postMessage(data);
  const postMessage = async (data) => {
    const messageData = new FormData();
    messageData.append("subject", data.subject);
    messageData.append("text", data.text);

    try {
      const response = await axios.post(url, messageData, {
        headers: {},
      });
      console.log(response);
      if (response.status === 200) {
        alert("Menssagem enviada com SUCESSO!");
        return response.data.data;
      } else {
        alert("ERRO: Mensagem não enviada!");
      }
    } catch (error) {
      console.log("Error creating message: ", error);
      alert(
        "ERRO: Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente mais tarde."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Título:
        <input
          type="text"
          id="subject"
          name="subject"
          required="required"
          {...register("subject")}
        />
      </label>
      <br />
      <label>
        Menssagem:
        <textarea
          id="text"
          name="text"
          required="required"
          {...register("text")}
        />
      </label>
      <br />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default Messagens;
