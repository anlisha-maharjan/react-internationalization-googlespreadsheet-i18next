import React from "react";
import * as Mui from "@mui/material";
import { useTranslation } from "react-i18next";
import en from "./assets/images/en.svg";
import no from "./assets/images/no.svg";

function App() {
  const { i18n, t } = useTranslation();

  const setLocale = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Mui.Container className="mt-2 h-100vh" fixed>
      <Mui.Box display="flex" justifyContent={"flex-end"} className="mb-3">
        <Mui.Button
          className={`mr-2 ${
            i18n.language === "en"
              ? "border-1 border-color-danger border-rad-4 text-color-danger"
              : "text-color-black"
          }`}
          onClick={() => setLocale("en")}
        >
          <span className="d-flex">
            <img src={en} alt="" className="img-fluid mr-1" />
            EN
          </span>
        </Mui.Button>
        <Mui.Button
          className={`${
            i18n.language === "no"
              ? "border-1 border-color-danger border-rad-4 text-color-danger"
              : "text-color-black"
          }`}
          onClick={() => setLocale("no")}
        >
          <span className="d-flex">
            <img src={no} alt="" className="img-fluid mr-1" />
            NO
          </span>
        </Mui.Button>
      </Mui.Box>
      <Mui.Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Mui.Typography
          component="h2"
          variant="h2"
          className="mb-3 font-weight-bold"
          textAlign="center"
        >
          {t("APP.WELCOME")}
        </Mui.Typography>

        <Mui.Typography
          component="h3"
          variant="h3"
          className="mb-3 font-weight-medium"
          textAlign="center"
        >
          {t("APP.TITLE")}
        </Mui.Typography>
        <Mui.Typography
          component="p"
          variant="p"
          className="mb-2 font-weight-normal"
          textAlign={"justify"}
        >
          {t("APP.SUBTITLE")}
        </Mui.Typography>
        <Mui.Typography
          component="p"
          variant="p"
          className="font-weight-normal"
          textAlign={"justify"}
        >
          {t("APP.DESCRIPTION")}
        </Mui.Typography>
      </Mui.Box>
    </Mui.Container>
  );
}

export default App;
