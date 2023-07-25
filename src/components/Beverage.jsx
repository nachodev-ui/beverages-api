import { Col, Card } from 'react-bootstrap'
import useBeverages from '../hooks/useBeverages'
import '../styles/Button.css'

const Beverage = ({ beverage }) => {

  const { handleModalClick, handleIdBeverage } = useBeverages()

  return (
    <Col md={6} lg={3} className="mb-5">
      <Card
        className="h-100"
        style={{
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Card.Img
          variant="top"
          src={beverage.strDrinkThumb}
          alt={`Imagen de ${beverage.strDrink}`}

        />

        <Card.Body
          style={{
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            
          }}
        >
          <Card.Title>{beverage.strDrink}</Card.Title>

          <button
            className="receiptButton"
            onClick={() => {
              handleModalClick()
              handleIdBeverage(beverage.idDrink)
            }}
          >
            Ver receta
          </button>

        </Card.Body>
      </Card>
    </Col>
  )
}

export default Beverage
