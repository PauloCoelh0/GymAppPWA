import { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import "./styles.module.scss";
import styles from "./styles.module.scss";
import Qrcode from "../../../QrcodeCreate";
import Modal from "react-modal";
import axios from "axios";
import Cookies from "js-cookie";

export const Perfil = ({ user = { name: "" } }) => {
  const { register, handleSubmit, reset } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const cookieValue = Cookies.get("userID");
  const valueWithoutJ = cookieValue.substring(3, cookieValue.length - 1);
  const userId = valueWithoutJ;

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/users/${userId}`,
        data
      );
      setUpdatedUser(response.data);
      reset();
    } catch (err) {
      console.error(err);
    }
    toggleModal(); // close the modal
  };

  console.log("AquiMeu!");
  console.log(userId);
  useEffect(() => {
    reset(updatedUser);
  }, [updatedUser]);

  return (
    <div class="container mt-4 mb-4 p-3 d-flex justify-content-center">
      <div class="card p-4" style={{ width: "500px" }}>
        <div class="image d-flex flex-column justify-content-center align-items-center">
          <button
            class="btn btn-secondary"
            style={{
              backgroundColor: "white",
              borderColor: "white",
              boxShadow: "0 0 10px #3d3d3d",
            }}
          >
            <img src={user.picture} height="150" width="150" />
          </button>
          <span class="name mt-3">{user.name}</span>
          <span class="idd">{user.age} anos</span>
          <div class="d-flex flex-row justify-content-center align-items-center gap-2">
            <span class="idd1">{user.email}</span>
            <span>
              <i class="fa fa-copy"></i>
            </span>
          </div>
          <div class="text mt-3">
            <span>{user.address}</span>
          </div>
          <div class="text mt-3">
            <span>{user.country}</span>
          </div>
          <br />
          <div class="d-flex mt-2">
            <button class="btn1 btn-dark" onClick={toggleModal}>
              Edit Profile
            </button>
            <Modal isOpen={isModalOpen}>
              <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.field}>
                  <label className={styles.label} for="name">
                    Name:
                  </label>
                  <input
                    id="name"
                    type="name"
                    name="name"
                    required="required"
                    {...register("name")}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} for="password">
                    Password:
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    required="required"
                    {...register("password")}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} for="email">
                    Email:
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required="required"
                    {...register("email")}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} for="age">
                    Age :
                  </label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    {...register("age")}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} for="address">
                    Address :
                  </label>
                  <input
                    id="address"
                    name="address"
                    required="required"
                    {...register("address")}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} for="country">
                    Country :
                  </label>
                  <input
                    id="country"
                    name="country"
                    required="required"
                    {...register("country")}
                  />
                </div>
                <button onClick={toggleModal}>Cancel</button>
                <button type="submit" onClick={handleSubmit(onSubmit)}>
                  Save
                </button>
              </form>
            </Modal>
          </div>
          <br />
          <div class="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
            <span>
              <i class="fa fa-twitter"></i>
            </span>
            <span>
              <i class="fa fa-facebook-f"></i>
            </span>
            <span>
              <i class="fa fa-instagram"></i>
            </span>
            <span>
              <i class="fa fa-linkedin"></i>
            </span>
          </div>
        </div>
      </div>

      <div class="card p-4" style={{ width: "447px", textAlign: "center" }}>
        <h2>
          <b>Entra com QrCode</b>
        </h2>
        <br />
        <Qrcode user={user} />
      </div>
    </div>
  );
};
