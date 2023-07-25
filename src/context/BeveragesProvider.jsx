import { useState, useEffect, createContext } from 'react'
import axios from 'axios'

const BeveragesContext = createContext()

const BeveragesProvider = ({ children }) => {
  const [beverages, setBeverages] = useState([])
  const [modal, setModal] = useState(false)
  const [idBeverage, setIdBeverage] = useState(null)
  const [recipe, setRecipe] = useState({})
  const [loading, setLoading] = useState(false)
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    setLoading(true)

    const getRecipe = async () => {
      if (!idBeverage) return

      try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idBeverage}`
        const { data } = await axios(url)

        setRecipe(data.drinks[0])
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    getRecipe()
  }, [idBeverage])

  const getBeverages = async (search) => {
    const { categoria } = search

    try {
      const { data } = await axios(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoria}`
      )

      setBeverages(data.drinks)
    } catch (error) {
      console.log(error)
    }
  }

  // Agregar a favoritos
  const toggleFavorite = (id) => {
    // Comprobar si la bebida ya está en favoritos
    const isFavorited = favorites.some((fav) => fav.idDrink === id)

    if (isFavorited) {
      // Si está en favoritos, removerlo
      const updatedFavorites = favorites.filter((fav) => fav.idDrink !== id)
      setFavorites(updatedFavorites)
    } else {
      // Buscar la bebida en la lista de todas las bebidas
      const drink = beverages.find((beverage) => beverage.idDrink === id)

      if (drink) {
        // Si la bebida existe, la agregamos a favoritos
        setFavorites([...favorites, drink])
      }
    }
  }

  // Guardar los favoritos en localStorage cada vez que se actualice la lista de favoritos
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  // Recuperar los favoritos del localStorage al cargar la página
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites'))

    if (storedFavorites && Array.isArray(storedFavorites)) {
      setFavorites(storedFavorites)
    }
  }, [])

  const handleIdBeverage = (id) => {
    setIdBeverage(id)
  }

  const handleModalClick = () => {
    setModal(!modal)
  }

  return (
    <BeveragesContext.Provider
      value={{
        beverages,
        getBeverages,
        handleModalClick,
        modal,
        handleIdBeverage,
        recipe,
        loading,
        favorites,
        toggleFavorite,
      }}
    >
      {children}
    </BeveragesContext.Provider>
  )
}

export { BeveragesProvider }

export default BeveragesContext
