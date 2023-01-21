import _ from "lodash";
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import styles from "./styles.module.scss";

function QrcodeRead({ setDataLogin }) {
  const [data, setData] = useState({ name: "QrCode" });

  return (
    <div className={styles.qrCodeReader}>
      <QrReader
        constraints={{ facingMode: "user" }}
        onResult={(result, error) => {
          if (!_.isNil(result)) {
            const newResult = result.text.split("&&");
            const data = {
              email: newResult[0],
              password: newResult[1],
              _id: newResult[2],
              isQrCode: true,
            };
            setData(data);
            setDataLogin(data);
          }
          if (!!error) {
            //console.info(error);
          }
        }}
      />
      <p>{data.email}</p>
    </div>
  );
}
export default QrcodeRead;
