import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
const FormularioClima = () => {
    const [localizacion,setLocalizacion]=useState([{}])
    const [clima,setClima]=useState({})


    let paisElegido
    let ciudadElegida
    let tipodeclima
    let viento
    let velocidad
    let grados 
    if( !clima || !clima.wind || !clima.wind.deg){
        viento = ''
        velocidad= ''
        grados = ''
    }else{
        grados = clima.wind.deg
       velocidad=  clima.wind.speed
    }
    if( !clima || !clima.weather){
        tipodeclima = ''
    }else{
        tipodeclima = clima.weather[0].main
    }
    
    const onSubmit= (data) => {
        paisElegido=data.pais
        ciudadElegida=data.ciudad
        console.log(paisElegido)
        console.log(ciudadElegida)
        consultarApiGeolocalizacion()         
       


     }
    
    
        const {
            register,
            formState:{errors},
            handleSubmit
        } = useForm();

        useEffect(() => {
            if (localizacion.lat && localizacion.lon) {
              consultarApiClima();
            }
          }, [localizacion]);




const consultarApiGeolocalizacion = async () => {
    try{
        const respuesta = await fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${ciudadElegida},${paisElegido}&limit=1&appid=884ba21d94e5eefa516fb60f42237962`
        )
        const datos = await respuesta.json();        
        setLocalizacion(datos[0])                
        consultarApiClima()
    }
    catch(err){
        console.log(err)
    }
    
}

const consultarApiClima = async () => {
    
    try{
        const respuesta = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${localizacion.lat}&lon=${localizacion.lon}&appid=884ba21d94e5eefa516fb60f42237962`
        )
        const datos = await respuesta.json();
         setClima(datos)    
        
    }    catch(err){
        console.log(err)
    }
}

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Ciudad: </InputGroup.Text>
          <Form.Control
            placeholder="Ciudad"
            aria-label="Username"
            aria-describedby="basic-addon1"
            
            {...register("ciudad", {
                required: true,                
            })}
          />
          <InputGroup.Text id="basic-addon2">Pais: </InputGroup.Text>
          <Form.Control
            placeholder="Pais"
            aria-label="Username"
            aria-describedby="basic-addon1"
            
            {...register("pais", {
                required: true
            })
                
            }
          />
        </InputGroup>
        <div className="d-flex justify-content-end">
        <Button type="submit">Mostrar Clima</Button>
        </div>
      </Form>
      <p>El clima es: {tipodeclima}</p>
      <p>Viento: direccion: {grados}° , velocidad: {velocidad} mph</p>
      

    </>
  );
};

export default FormularioClima;
