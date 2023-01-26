import React from "react";
import { useLanguage } from "../../languageContext";

export default function LangaugeSwitcher() {
  const { texts, changeLanguage } = useLanguage()

  const toggleLanguage = () => {
    changeLanguage(texts.CHANGE_LANGUAGE.CODE)
  }

  return <div>
    <button className="small" onClick={toggleLanguage}>{texts.CHANGE_LANGUAGE.NAME}</button>
  </div>
}