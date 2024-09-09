import { CaretDownOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Dropdown, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import Alert from "../../helpers/alert/Alert";
import HttpClient from "../../helpers/network/HttpClient";

// COMPONENTS
import Layout from "../../components/layout/Layout";
import PTYDDialog from "./components/PYTDDialog";

import {
  FamilyIcon,
  FileHandIcon,
  FormPenIcon,
  GlobeIcon,
  HomeBorderIcon,
  LogoTTVAloneIcon,
} from "../../components/icons/Icons";
import AuthContext from "../../context/AuthContext";
import ModalAdvisory from "./components/ModalAdvisory";
import "./scss/home.page.scss";

const ProcedurePage = (props) => {
  const [loader, setLoader] = useState(false);
  const [categories, setCategories] = useState([]);
  const [notarialActs, setNotarialActs] = useState([]);
  const [notarialActSelected, setNotarialActSelected] = useState();
  const [openModalAdvisory, setOpenModalAdvisory] = useState(false);
  const [categorySelected, setCategorySelected] = useState();
  const [checked, setChecked] = useState(false);
  const [pytdDialog, setPytdDialog] = useState();
  const [page, setPage] = useState();
  const [idSelected, setIdSelected] = useState();
  const [currentNameSubMenu, setCurrentNameSubMenu] = useState();
  const { user } = useContext(AuthContext);

  const handleChange = async (value) => {
    if (value != "0") {
      const response = await HttpClient.get("/api/notarialact/" + value);
      if (response.status === 200) {
        sortNotarialActsOnChange(notarialActs, value);
        setNotarialActSelected(response.data);
        let notarialActsTemp = [...notarialActs];
        if (notarialActsTemp?.[0]?.key === "0") {
          notarialActsTemp.shift();
          setNotarialActs(notarialActsTemp);
        }
      }
    }
  };

  useEffect(() => {
    if (idSelected) {
      handleChange(idSelected);
    }
  }, [idSelected]);

  function onChange(e) {
    if (notarialActSelected) setChecked(e.target.checked);
    else {
      setChecked(false);
    }
  }

  const sortNotarialActsOnChange = (notarialActsParam, id) => {
    const copyNotarialActs = [...notarialActsParam];
    const notarialIndex = notarialActsParam?.findIndex((x) => x.key === id);
    const currentNotarial = copyNotarialActs[notarialIndex];
    if (currentNotarial) {
      copyNotarialActs.splice(notarialIndex, 1);
      setCurrentNameSubMenu(currentNotarial?.label);
      setNotarialActs([currentNotarial, ...copyNotarialActs]);
    }
  };

  const loadCategories = async () => {
    const response = await HttpClient.get("/api/category");
    if (response.status === 200) {
      setCategories(response.data);
      setCategorySelected(
        response.data.find((x) => x.name === "Inmobiliario")
      );
      loadNotarialActs(
        response.data.find((x) => x.name === "Inmobiliario")
      );
    }
  };

  const loadNotarialActs = async (category) => {
    setIdSelected();
    setCategorySelected(category);
    setNotarialActSelected();
    setNotarialActs([]);
    const response = await HttpClient.get(
      "/api/notarialAct/category/" + category._id
    );
    console.log(response);
    if (response.status === 200) {
      const buildItems =
        response &&
        response.data.reduce((current, prev) => {
          const item = {
            label: prev.name,
            key: prev._id,
          };
          current.push(item);
          return current;
        }, []);
      setIdSelected(buildItems && buildItems[0] && buildItems[0].key);
      setCurrentNameSubMenu(buildItems && buildItems[0] && buildItems[0].label);
      setNotarialActs(buildItems);
    }
  };

  const redirect = () => {
    let title,
      message = "";

    if (checked) {
      if (notarialActSelected) {
        if (notarialActSelected.form)
          props.history.push("/notarialact?id=" + notarialActSelected._id);
        else
          props.history.push(
            "/notarialactsteptwo?id=" + notarialActSelected._id
          );
      }
    } else {
      title = "¿Deseas iniciar tu trámite?";
      message = `Para poder continuar por favor acepta primero nuestros Términos y Condiciones.`;
    }

    if (title != "" && message != "")
      Alert.show({
        type: "warning",
        title: title,
        message: message,
        btnOk: "Aceptar",
        fnOk: () => {},
        buttonX: true,
        fnCancel: () => {},
      });
  };

  const openPYTD = () => {
    if (notarialActSelected) {
      setPage(notarialActSelected.page);
      setPytdDialog(notarialActSelected.page);
    } else {
      Alert.show({
        type: "warning",
        title: "¿Deseas iniciar tu trámite?",
        message: `Por favor selecciona primero el trámite que deseas realizar`,
        btnOk: "Aceptar",
        fnOk: () => {},
        btnCancel: "Cancelar",
      });
    }
  };

  const callback = (value) => {
    setChecked(value);
  };

  useEffect(() => {
    loadCategories();
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);

  return (
    <>
      <PTYDDialog
        page={page}
        data={pytdDialog}
        setData={setPytdDialog}
        callback={callback}
      />
      <Layout loader={loader}>
        <div className="contentProcedure">
          <Row className="margenWizard">
            <Col span={24} className="centrar-wisard">
              <div className="lineMain"> </div>
              <div className="content-circule">
                <div className="conatinerText top">Ingresa la información</div>
                <div className="circule margeBottom">
                  <span className="circule-number">1</span>
                </div>
              </div>

              <div className="line" />

              <div className="content-circule">
                <div className="circule margeTop">
                  <span className="circule-number">2</span>
                </div>
                <div className="conatinerText bottom">
                  Adjunta los documentos
                </div>
              </div>

              <div className="line" />

              <div className="content-circule">
                <div className="conatinerText top">Selecciona la notaría</div>
                <div className="circule margeBottom">
                  <span className="circule-number">3</span>
                </div>
              </div>

              <div className="line" />

              <div className="content-circule">
                <div className="circule margeTop">
                  <span className="circule-number">4</span>
                </div>
                <div className="conatinerText bottom">Realiza tu pago</div>
              </div>
            </Col>
          </Row>

          <Row className="paragraphContinue">
            <Col span={24}>
              <h5 className="indicaciones">
                Selecciona a continuación el trámite que deseas realizar:
              </h5>
            </Col>
          </Row>
          <br></br>
          <Row className="containerCards">
            <>
              {categories.map((category) => (
                <>
                  {category.name === "Familia" && (
                    <>
                      <div className="centrarArrow">
                        <div
                          className={
                            categorySelected &&
                            categorySelected.name === category.name
                              ? "card-tramite-active"
                              : "card-tramite"
                          }
                          onClick={() => loadNotarialActs(category)}
                        >
                          <FamilyIcon />

                          <h3 className="title-indicaciones">Familia</h3>
                        </div>
                        <div
                          className={
                            categorySelected &&
                            categorySelected.name === category.name
                              ? "arrow"
                              : ""
                          }
                        ></div>
                      </div>
                    </>
                  )}

                  {category.name === "Inmobiliario" && (
                    <div className="centrarArrow">
                      <div
                        className={
                          categorySelected &&
                          categorySelected.name === category.name
                            ? "card-tramite-active"
                            : "card-tramite"
                        }
                        onClick={() => loadNotarialActs(category)}
                      >
                        <HomeBorderIcon />
                        <h3 className="title-indicaciones">Inmobiliario</h3>
                      </div>
                      <div
                        className={
                          categorySelected &&
                          categorySelected.name === category.name
                            ? "arrow"
                            : ""
                        }
                      ></div>
                    </div>
                  )}

                  {category.name === "Empresarial" && (
                    <div className="centrarArrow">
                      <div
                        className={
                          categorySelected &&
                          categorySelected.name === category.name
                            ? "card-tramite-active"
                            : "card-tramite"
                        }
                        onClick={() => loadNotarialActs(category)}
                      >
                        <GlobeIcon />
                        <h3 className="title-indicaciones">Empresarial</h3>
                      </div>
                      <div
                        className={
                          categorySelected &&
                          categorySelected.name === category.name
                            ? "arrow"
                            : ""
                        }
                      ></div>
                    </div>
                  )}

                  {category.name === "Trámites especiales" && (
                    <div className="centrarArrow">
                      <div
                        className={
                          categorySelected &&
                          categorySelected.name === category.name
                            ? "card-tramite-active"
                            : "card-tramite"
                        }
                        onClick={() => loadNotarialActs(category)}
                      >
                        <FileHandIcon />
                        <h3 className="title-indicaciones">
                          Trámites especiales
                        </h3>
                      </div>
                      <div
                        className={
                          categorySelected &&
                          categorySelected.name === category.name
                            ? "arrow"
                            : ""
                        }
                      ></div>
                    </div>
                  )}
                </>
              ))}
            </>
          </Row>
          <Row className="containerSelect">
            <Col span={24}>
              <div className="info-user-content">
                <div
                  className="content-select"
                  style={{
                    backgroundImage: "url(/assets/images/fondoperfil.jpeg)",
                  }}
                >
                  <Dropdown
                    menu={{
                      items: notarialActs,
                      selectable: true,
                      onClick: ({ key }) => setIdSelected(key),
                    }}
                    overlayClassName="dropdownCustomProcedures"
                  >
                    <div className="select-item">
                      <span className="select-item__name">
                        {currentNameSubMenu}
                      </span>
                      <CaretDownOutlined className="icon" />
                    </div>
                  </Dropdown>
                  {/* <Select
                    className="select-tramite"
                    style={{ width: 120 }}c
                    onChange={handleChange}
                    value={idSelected}
                    placeholder="Seleccione un acto notarial"
                  >
                    <>
                      {notarialActs.map((item, i) => (
                        <Option key={i} value={item._id}>
                          {item.name}
                        </Option>
                      ))}
                    </>
                  </Select> */}
                  <span className="type-procedure">
                    {categorySelected && categorySelected.name}
                  </span>
                </div>
              </div>
            </Col>
          </Row>

          {(notarialActSelected && notarialActSelected.name != "") ||
          (categorySelected && categorySelected.name === "Empresarial") ? (
            <Row className="containerProcedure-info">
              <Col span={1}></Col>
              <Col
                xs={22}
                sm={22}
                md={16}
                lg={16}
                xl={16}
                className="categories"
              >
                <h3 className="title-indicaciones">
                  {categorySelected ? categorySelected.name + " /" : ""}
                </h3>
                <div className="line-morado"> </div>
                <h2 className="title-indicaciones">
                  {notarialActSelected ? notarialActSelected.name : ""}
                </h2>
                <h5 className="display-linebreak-gray">
                  {notarialActSelected ? notarialActSelected.description : ""}
                </h5>
                <h5 className="indicaciones">
                  {notarialActSelected
                    ? "Duración del trámite: " +
                      notarialActSelected.duration +
                      " aproximadamente."
                    : ""}
                </h5>
                {categorySelected &&
                  categorySelected.name === "Empresarial" && (
                    <div className="indicaciones-empresarial">
                      <h6 className="text">
                        En Tus trámites VIP entendemos que este trámite puede
                        generarte inquietudes, si tú lo deseas, puedes recibir
                        de parte de nuestros expertos una asesoría previa
                        completamente gratuita. <strong>¡Solicítala!</strong>
                        <br />
                        <br />
                        De lo contrario, recuerda que cuentas con todo nuestro
                        respaldo en
                        <span className="logo-help">
                          <LogoTTVAloneIcon />
                        </span>
                        cuando estés realizando el proceso de solicitud de tu
                        trámite a través de nuestro{" "}
                        <strong>Chat en Línea</strong> o la opción{" "}
                        <strong>Nosotros te llamamos.</strong>
                      </h6>
                      <Button
                        type="primary"
                        className="button-advisory"
                        onClick={() => setOpenModalAdvisory(true)}
                      >
                        Solicitar asesoría
                      </Button>
                    </div>
                  )}
              </Col>
              <Col xs={22} sm={22} md={7} lg={7} xl={7} className="centrar">
                <div className="content-button-tramite">
                  <div className="arrowButton"></div>
                  <Button
                    type="primary"
                    icon={<FormPenIcon />}
                    size="large"
                    className="button-tramite"
                    onClick={() => redirect()}
                  >
                    <span className="text">Comenzar trámite</span>
                  </Button>
                </div>
                <Row className="containerCheck">
                  <Col span={24}>
                    <div className="form-footer">
                      <Checkbox
                        name="cbPYTD"
                        onChange={onChange}
                        disabled={notarialActSelected === undefined}
                        checked={checked}
                      />
                      <span className="text" onClick={() => openPYTD()}>
                        Acepto los Términos y Condiciones
                      </span>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          ) : null}
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </Layout>
      {openModalAdvisory && (
        <ModalAdvisory
          openModalAdvisory={openModalAdvisory}
          setOpenModalAdvisory={setOpenModalAdvisory}
          user={user}
        />
      )}
    </>
  );
};

export default ProcedurePage;