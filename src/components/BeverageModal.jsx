import { Modal, Image } from 'react-bootstrap'
import useBeverages from '../hooks/useBeverages'
import '../styles/Button.css'

const BeverageModal = () => {
  const {
    modal,
    recipe,
    loading,
    favorites,
    toggleFavorite,
    handleModalClick,
  } = useBeverages()

  return (
    !loading && (
      <Modal show={modal} onHide={handleModalClick} className="modalContent">
        <Modal.Header className="modalHeader">
          <div className="modalTitleWrapper">
            <Modal.Title className="modalTitle">{recipe.strDrink}</Modal.Title>
          </div>

          <button
            className="heartButton"
            onClick={() => toggleFavorite(recipe.idDrink)}
          >
            {favorites.some((fav) => fav.idDrink === recipe.idDrink)
              ? '❤️'
              : '🤍'}
          </button>
        </Modal.Header>

        <Modal.Body>
          <Image
            src={recipe.strDrinkThumb}
            alt={`Imagen de ${recipe.strDrink}`}
            fluid
          />

          <h4 className="mt-4">Instrucciones</h4>
          <p>{recipe.strInstructions}</p>

          <h4>Ingredientes y cantidades</h4>
          <ul>
            {Object.keys(recipe).map((key) => {
              if (key.includes('strIngredient') && recipe[key]) {
                return (
                  <li key={key}>
                    {recipe[key]} {recipe[`strMeasure${key.slice(13)}`]}
                  </li>
                )
              }

              return null
            })}
          </ul>
        </Modal.Body>
      </Modal>
    )
  )
}

export default BeverageModal
