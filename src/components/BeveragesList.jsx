import { Row } from 'react-bootstrap'
import Beverage from './Beverage'
import useBeverages from '../hooks/useBeverages'

const BeveragesList = () => {
  const { beverages } = useBeverages()

  return (
    <Row className="mt-5">
      {beverages.map((beverage) => (
        <Beverage key={beverage.idDrink} beverage={beverage} />
      ))}
    </Row>
  )
}

export default BeveragesList
