import { Container, Card, CardImg } from 'react-bootstrap'
import useBeverages from '../hooks/useBeverages'

const Favorites = ({ handleFavoritesClick }) => {
  const { favorites } = useBeverages()

  return (
    <Container className="mt-2">
      <div className="back">
        <button className="heartButton" onClick={handleFavoritesClick}>
          ⇦ <span className="fav-text">Volver</span>
        </button>
      </div>


      <h1 className="text-center mb-5 mt-5 favorites-text">Mis favoritos</h1>

      <div className="d-flex flex-wrap justify-content-center">
        {favorites.map((favorite) => (
          <Card
            key={favorite.idDrink}
            className="m-3"
            style={{ width: '18rem' }}
          >
            <CardImg
              variant="top"
              src={favorite.strDrinkThumb}
              alt={`Imagen de ${favorite.strDrink}`}
            />
            <Card.Body>
              <Card.Title>{favorite.strDrink}</Card.Title>
            </Card.Body>
          </Card>
        ))}
      </div>

      {favorites.length === 0 && (
        <h1 className="text-center mb-4 mt-5 nofav-text">
            Aún has agregado bebidas a tus favoritos
        </h1> 
      )}
    </Container>
  )
}

export default Favorites
