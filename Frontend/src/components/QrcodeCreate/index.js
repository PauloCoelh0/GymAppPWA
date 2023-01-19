import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import styles from "./styles.module.scss";

function Qrcode({ user = { email: "", password: "", _id: "" } }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const newWord = encodeURI(`${user.email}&&${user.password}&&${user._id}`);
    setValue(newWord);
  }, [user]);

  return (
    <div className={styles.qrCodeCreate}>
      <QRCode
        size={64}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={value}
        viewBox={`0 0 64 64`}
      />
    </div>
  );
}

export default Qrcode;
