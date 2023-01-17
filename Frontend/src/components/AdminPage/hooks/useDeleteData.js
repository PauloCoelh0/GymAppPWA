// import React, { useState, useEffect } from "react";
// import config from "./../../config";
// import axios from "axios";

// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";

// const DeleteCar = (props) => {
//   const [status, setStatus] = useState(null);

//   const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 400,
//     bgcolor: "background.paper",
//     border: "2px solid #000",
//     boxShadow: 24,
//     p: 4,
//   };

//   const delcar = {
//     width: 300,
//     bgcolor: "#FFF",
//     "&:hover": {
//       background: "#E51111",
//       color: "white",
//     },
//     fontWeight: "600",
//     color: "black",
//     size: "300px",
//     border: "2px solid #000",
//     transform: "translate(-50%, -50%)",
//     boxShadow: 14,
//     position: "absolute",
//     top: "25%",
//     left: "65%",
//   };

//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const delCar = (id) => {
//     const url = `http://localhost:3000/aulas/${id}`;
//     const requestOptions = {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Baerer ${config.token}`,
//       },
//     };
//     fetch(url, requestOptions).then(() => setStatus("Delete successful"));
//   };

//   const [cars, setCars] = useState([]);

//   useEffect(() => {
//     const url = `http://localhost:3200/stand/cars/${props.carId}`;
//     const getCars = async () => {
//       const response = await axios.get(url, {
//         headers: {
//           Accept: "application/json",
//           Authorization: "Baerer " + config.token,
//         },
//       });

//       setCars(response.data.carDetails);
//       console.log(response.data.carDetails);
//     };

//     getCars();
//   }, []);

//   return (
//     <div>
//       <Button sx={delcar} onClick={handleOpen}>
//         DELETE CAR
//       </Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             ARE YOU SURE?
//           </Typography>
//           <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//             <div>
//               <label>
//                 Status: <b>{status}</b>
//               </label>
//             </div>
//             <div>
//               <label>
//                 {cars.brand} ({cars.model})
//               </label>
//             </div>
//             <div>
//               <label>CAR ID: {cars.carId}</label>
//             </div>
//             <br />
//             <input
//               className="updateBtn5"
//               type="submit"
//               value="Confirm"
//               onClick={(event) => {
//                 delCar(cars.carId);
//                 setTimeout(function () {
//                   window.location.reload(1);
//                 }, 500);
//               }}
//             />
//           </Typography>
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// export default DeleteCar;
