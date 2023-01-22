import { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import Qrcode from "../../../QrcodeCreate";
import axios from "axios";
import Cookies from "js-cookie";
import UserUpdateForm from "./EditPerfil";

export const Perfil = ({ user = { name: "" } }) => {
  const cookieValue = Cookies.get("userID");
  const valueWithoutJ = cookieValue.substring(3, cookieValue.length - 1);
  const userId = valueWithoutJ;

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
            <img
              src={user.picture}
              height="160"
              width="160"
              style={{ borderRadius: "5%" }}
            />
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
          <UserUpdateForm />
          <br />
          <br />
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
