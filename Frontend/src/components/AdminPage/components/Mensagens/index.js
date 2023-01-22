import { useForm } from "react-hook-form";
import "./styles.moddule.scss";
import axios from "axios";

const url = "http://localhost:3000/mensagens/create";

function Mensagens() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => postMessage(data);

  const postMessage = async (data) => {
    axios
      .post(url, data)
      .then((res) => {})
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <form className="mensagensForm" onSubmit={handleSubmit(onSubmit)}>
      <label className="mensagenslabel">
        Título:
        <input
          className="mensagensinput"
          type="text"
          id="subject"
          name="subject"
          required="required"
          {...register("subject")}
        />
      </label>
      <br />
      <label className="mensagenslabel">
        Menssagem:
        <textarea
          id="text"
          name="text"
          required="required"
          {...register("text")}
        />
      </label>
      <br />
      <button className="mensagensbutton" type="submit">
        Enviar
      </button>
    </form>
  );
}

export default Mensagens;
