import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
const FormularioClima = () => {
    const [localizacion,setLocalizacion]=useState([{}])
    const [clima,setClima]=useState({})

    const apikey = import.meta.env.VITE_API_KEY;
    console.log(apikey)
    let paisElegido
    let ciudadElegida
    let tipodeclima    
    let velocidadViento
    let gradosViento 
    let descripcionclima
    let humedad
    let temperatura, sensasionTermica

    if( !clima || !clima.wind ){        
        velocidadViento= ''
        gradosViento = ''
    }else{
        gradosViento = clima.wind.deg
       velocidadViento=  clima.wind.speed
       humedad = clima.main.humidity
       temperatura = clima.main.temp
       sensasionTermica = clima.main.feels_like
    }
    if( !clima || !clima.weather){
        tipodeclima = ''
    }else{
        tipodeclima = clima.weather[0].main
        descripcionclima= clima.weather[0].description
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
            `http://api.openweathermap.org/geo/1.0/direct?q=${ciudadElegida},${paisElegido}&appid=${apikey}`
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
            `https://api.openweathermap.org/data/2.5/weather?lat=${localizacion.lat}&lon=${localizacion.lon}&appid=${apikey}`
        )
        const datos = await respuesta.json();
         setClima(datos)    
        
    }    catch(err){
        console.log(err)
    }
}

  return (
    <div className="border rounded bg-white p-4 border-4 border-black w-100 ">
    <h1 className="text-center"> El Clima</h1>
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
      <p>Clima: {tipodeclima}, {descripcionclima}</p>
      <p>Viento: direccion: {gradosViento}° , Velocidad: {Math.trunc(velocidadViento *1.61)} kmh</p>
      <p>Temperatura: {Math.round(temperatura-273.15)}°c</p>
      <p>Sensasion termica: {Math.round(sensasionTermica-273.15)}°c</p>
      <p>Humedad: {humedad} %</p>       
      {console.log(clima)}
      

    </div>
  );
};

export default FormularioClima;
