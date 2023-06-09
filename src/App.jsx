import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import FormularioClima from './components/FormularioClima'

function App() {


  return (
    <>
      <Container className='mt-5'>
        <FormularioClima></FormularioClima>
      </Container>
    </>
  )
}

export default App
