import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import FormularioClima from './components/FormularioClima'

function App() {


  return (
    <>
      <Container className='mt-5 main'>
        <FormularioClima></FormularioClima>
      </Container>
      <footer className="bg-dark text-center text-light py-4">
        <p>&copy; Todos los derechos reservados </p>
      </footer>     
    
    </>
  )
}

export default App
