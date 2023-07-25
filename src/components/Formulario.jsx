import { useState } from 'react'
import { Form, Row, Col, Alert } from 'react-bootstrap'
import useCategories from '../hooks/useCategories'
import useBeverages from '../hooks/useBeverages'
import '../styles/Button.css'

const Formulario = () => {
  const [search, setSearch] = useState({
    categoria: '',
  })
  const [error, setError] = useState('')
  const { categories } = useCategories()
  const { getBeverages } = useBeverages()

  const handleChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    })
  }

  const scrollToBeveragesList = () => {
    setTimeout(() => {
      const beveragesListElement = document.getElementById('beveragesList')
      beveragesListElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })

      // After scrollIntoView, set a margin top to the beverages list to avoid the header
      beveragesListElement.style.marginTop = '20vh'
    }, 200)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (Object.values(search).includes('')) {
      setError('Todos los campos son obligatorios')
      return
    }

    setError('')
    await getBeverages(search)
    scrollToBeveragesList()
  }

  return (
    <Form onSubmit={handleSubmit}>
      {error && (
        <Alert variant="danger" className="text-center w-60">
          {error}
        </Alert>
      )}

      <Row className="justify-content-center text-center mt-3">
        <Col md={6}>
          <Form.Group className="mb-4">
            <Form.Select
              id="categoria"
              name="categoria"
              value={search.categoria}
              onChange={handleChange}
              className="text-center w-50 mx-auto"
            >
              <option value="">Selecciona una bebida</option>
              {categories.map((categories) => (
                <option
                  key={categories.strCategory}
                  value={categories.strCategory}
                  className="text-center"
                >
                  {categories.strCategory}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Row className="justify-content-center">
          <Col md={6}>
            <button className="customButton w-50">Buscar bebidas</button>
          </Col>
        </Row>
      </Row>
    </Form>
  )
}

export default Formulario
