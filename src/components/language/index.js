import React from "react";
import * as Mui from "@mui/material";
import { useTranslation } from "react-i18next";
import en from "./assets/images/en.svg";
import no from "./assets/images/no.svg";

function Language() {
  const { i18n } = useTranslation();

  const setLocale = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
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
  );
}

export default Language;
