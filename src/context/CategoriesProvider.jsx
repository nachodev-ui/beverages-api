import { useState, useEffect, createContext } from 'react'
import axios from 'axios'

const cocktailUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'

const CategoriesContext = createContext()

const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([])

  const getCategories = async () => {
    try {
      const { data } = await axios(cocktailUrl)

      setCategories(data.drinks)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <CategoriesContext.Provider
      value={{
        categories,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  )
}

export { CategoriesProvider }

export default CategoriesContext
