import { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import Formulario from './components/Formulario'
import BeveragesList from './components/BeveragesList'
import BeverageModal from './components/BeverageModal'
import { CategoriesProvider } from './context/CategoriesProvider'
import { BeveragesProvider } from './context/BeveragesProvider'
import Favorites from './components/Favorites'

function App() {
  const [showHeader, setShowHeader] = useState(true)
  const [showFavorites, setShowFavorites] = useState(false)

  useEffect(() => {
    // Ocultar el header después de 3 segundos
    const timer = setTimeout(() => {
      setShowHeader(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleFavoritesClick = () => {
    setShowFavorites(!showFavorites)
  }

  return (
    <CategoriesProvider>
      <BeveragesProvider>
        <header
          className={`py-4 headerContent ${showHeader ? 'show' : 'hide'}`}
        >
          <div className={`${showHeader ? '' : 'header-title'}`}>
            <h1
              className={`text-center mb-5 ${
                showHeader ? '' : 'header-title-hide'
              }`}
            >
              ¿Qué te gustaría tomar hoy?
            </h1>
          </div>
        </header>

        {showFavorites ? (
          <Row
            lg={12}
            className="justify-content-start align-items-center px-4 py-2"
          >
            <Favorites handleFavoritesClick={handleFavoritesClick} />
          </Row>
        ) : (
          <Container className={`mt-2 ${showHeader ? 'hide' : ''}`}>
            <button className="heartButton" onClick={handleFavoritesClick}>
              🍷
              <span className="fav-text">Ir a favoritos</span>
            </button>

            <Formulario />

            <div id="beveragesList" style={{ marginTop: '14vh' }}>
              <BeveragesList />
            </div>

            <BeverageModal />
          </Container>
        )}
      </BeveragesProvider>
    </CategoriesProvider>
  )
}

export default App
