import React from 'react'
import phrases from './phrases';

const LanguageContext = React.createContext();

function LanguageProvider({ children }) {
  const defaultValue = 'pt'
  const [texts, setTexts] = React.useState();

  function changeLanguage(language) {
    setTexts(phrases[language])
  }

  React.useEffect(() => {
    changeLanguage(defaultValue)
  }, [])

  const value = { texts, changeLanguage }

  if (!value.texts) return null

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

function useLanguage() {
  const context = React.useContext(LanguageContext)

  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }

  return context
}

export { LanguageProvider, useLanguage }