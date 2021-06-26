import React, { useState } from "react";
import { MDBBtn } from "mdbreact";
import Jitsi from "../../../../components/Jitsi";
import Activity from "../../../../components/Activity/Alphabetical/index";
import finishSession from "../finishSession";
import { v4 as uuidv4 } from "uuid";
import imgCherry from "../../../../components/Activity/Alphabetical/images/fruits/fruit_cherry.png";
import imgGrape from "../../../../components/Activity/Alphabetical/images/fruits/fruit_grape.png";
import imgApple from "../../../../components/Activity/Alphabetical/images/fruits/fruit_apple.png";
import imgLemon from "../../../../components/Activity/Alphabetical/images/fruits/fruit_lemon.png";
import imgBanana from "../../../../components/Activity/Alphabetical/images/fruits/fruit_banana.png";
import imgCat from "../../../../components/Activity/Alphabetical/images/animals/cat.png";
import imgGiraffe from "../../../../components/Activity/Alphabetical/images/animals/giraffe.png";
import imgLion from "../../../../components/Activity/Alphabetical/images/animals/lion.png";
import imgDog from "../../../../components/Activity/Alphabetical/images/animals/dog.png";
import imgElephant from "../../../../components/Activity/Alphabetical/images/animals/elephant.png";

const Alphabetical = ({
  props,
  handleChange,
  session,
  showTools,
  showMeeting,
}) => {
  const [activityData, setActivityData] = useState({
    elements: [
      {
        id: uuidv4(),
        name: "CEREZA",
        src: imgCherry,
        width: 90,
        height: 85,
        draggable: true,
        matched: false,
      },
      {
        id: uuidv4(),
        name: "UVA",
        src: imgGrape,
        width: 90,
        height: 85,
        draggable: true,
        matched: false,
      },
      {
        id: uuidv4(),
        name: "MANZANA",
        src: imgApple,
        width: 90,
        height: 85,
        draggable: true,
        matched: false,
      },
      {
        id: uuidv4(),
        name: "LIMÓN",
        src: imgLemon,
        width: 90,
        height: 85,
        draggable: true,
        matched: false,
      },
      {
        id: uuidv4(),
        name: "BANANA",
        src: imgBanana,
        width: 90,
        height: 85,
        draggable: true,
        matched: false,
      },
    ],
    colors: ["#DE8971", "#7B6079", "#A7D0CD", "#FFE9D6"],
  });

  function redirectTool(tool) {
    showTools({ [tool]: true });
  }

  function redirectEnd() {
    showTools({ alphabetical: false });
    showMeeting({ end: true });
  }

  function restart() {
    setActivityData({
      elements: [
        {
          id: uuidv4(),
          name: "GATO",
          src: imgCat,
          width: 90,
          height: 85,
          draggable: true,
        },
        {
          id: uuidv4(),
          name: "JIRAFA",
          src: imgGiraffe,
          width: 90,
          height: 85,
          draggable: true,
        },
        {
          id: uuidv4(),
          name: "LEÓN",
          src: imgLion,
          width: 90,
          height: 85,
          draggable: true,
        },
        {
          id: uuidv4(),
          name: "PERRO",
          src: imgDog,
          width: 90,
          height: 85,
          draggable: true,
        },
        {
          id: uuidv4(),
          name: "ELEFANTE",
          src: imgElephant,
          width: 90,
          height: 85,
          draggable: true,
        },
      ],
      colors: ["#DE8971", "#7B6079", "#A7D0CD", "#FFE9D6"],
    });
  }

  return (
    <React.Fragment>
      <div className="row">
        <div className="pb-3 mt-2 col-md-8">
          <Activity data={activityData} />
        </div>
        <div className="col-md-4" style={{ marginTop: "3px" }}>
          <div data-test="col">
            <label
              className="mb-1"
              style={{ fontSize: "13px", fontWeight: "bold" }}
            >
              Cámara del alumno
            </label>
          </div>
          {props.location.state && (
            <Jitsi
              roomId={
                props.location.state.roomId +
                "-" +
                props.location.state.sessionId
              }
              userName={sessionStorage.getItem("name")}
              height="200px"
            />
          )}
          <div data-test="col" style={{ paddingTop: "12px" }}>
            <label
              className="mb-1"
              style={{ fontSize: "13px", fontWeight: "bold" }}
            >
              Acciones
            </label>
          </div>
          <div
            data-test="container"
            className="container-fluid section mb-3 border p-3 col-md-12"
          >
            <div className="row">
              <div className="col-md-12">
                <MDBBtn
                  onClick={restart}
                  size="lg"
                  className="py-2 green darken-2 shadow-none text-white btnOption w-100 ml-0"
                >
                  <span>Reiniciar actividad</span>
                </MDBBtn>
              </div>
              <div className="col-md-12 mt-2">
                <MDBBtn
                  onClick={() => redirectTool("numerical")}
                  size="lg"
                  className="py-2 blue darken-2 shadow-none text-white btnOption w-100 ml-0"
                >
                  <span>Herramienta Númerica</span>
                </MDBBtn>
              </div>
              <div className="col-md-12 mt-2">
                <MDBBtn
                  onClick={() => redirectTool("pictogram")}
                  size="lg"
                  className="py-2 blue darken-2 shadow-none text-white btnOption w-100 ml-0"
                >
                  <span>Pictogramas</span>
                </MDBBtn>
              </div>
            </div>
          </div>
          <div data-test="col">
            <label
              className="mb-1"
              style={{ fontSize: "13px", fontWeight: "bold" }}
            >
              Fin de la sesión
            </label>
          </div>
          <div
            data-test="container"
            className="container-fluid section mb-3 border p-3 col-md-12"
          >
            <div className="col-md-12 mb-1">
              <MDBBtn
                onClick={() => finishSession(redirectEnd)}
                size="lg"
                className="py-2 shadow-none btnOption btnCancel w-100 ml-0"
              >
                <span>Finalizar</span>
              </MDBBtn>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-md-12 my-1">
          <label>Observaciones de la actividad</label>
          <textarea
            id="alphabeticalComments"
            rows="3"
            onChange={handleChange}
            value={session.alphabeticalComments}
            type="text"
            className="form-control"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Alphabetical;
