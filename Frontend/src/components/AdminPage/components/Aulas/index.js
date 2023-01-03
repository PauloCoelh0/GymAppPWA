import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Table from "../../../Table";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { useGetData } from "../../hooks/useGetData";
import { usePostData } from "../../hooks/usePostData";
import { TabContext } from "../../contexts";

const Aulas = () => {
  const { register, handleSubmit } = useForm();
  const { isError, isLoading, data } = useGetData("aulas", 0, 0);
  const { isLoading: isLoadingPost, addData } = usePostData("aulas/create");
  const { setGamesCount } = useContext(TabContext);

  useEffect(() => {
    setGamesCount(data.data.length);
  }, [data, setGamesCount]);

  if (isLoading) {
    return <div>Is Loading</div>;
  }

  if (isError) {
    return <div>No Data Loading</div>;
  }

  return (
    <Container>
      <Row>
        <Col className={styles.column}>
          <h3>Criar Aula</h3>
          {isLoadingPost ? (
            <div> is Loading </div>
          ) : (
            <div className={styles.container}>
              <form className={styles.form} onSubmit={handleSubmit(addData)}>
                <div className={styles.field}>
                  <label className={styles.label} for="beginDate">
                    Data-Inicio:
                  </label>
                  <input
                    id="beginDate"
                    type="date"
                    name="beginDate"
                    required="required"
                    {...register("beginDate")}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} for="endDate">
                    Data-Fim:
                  </label>
                  <input
                    id="endDate"
                    type="date"
                    name="endDate"
                    {...register("endDate")}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} for="name">
                    Nome:
                  </label>
                  <input
                    id="name"
                    name="name"
                    required="required"
                    {...register("name")}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} for="room">
                    Sala:
                  </label>
                  <input
                    id="room"
                    name="room"
                    required="required"
                    {...register("room")}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} for="capacity">
                    Capacidade:
                  </label>
                  <input
                    id="capacity"
                    name="capacity"
                    required="required"
                    {...register("capacity")}
                  />
                </div>
                <Row>
                  <input className="submit" type="submit" />
                </Row>
              </form>
            </div>
          )}
        </Col>
        <Col>
          <Table
            columns={["beginDate", "endDate", "name", "room", "capacity"]}
            rows={data}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Aulas;
