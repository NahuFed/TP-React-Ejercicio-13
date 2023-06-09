import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
const FormularioClima = () => {

    const {
        register,
        formState:{errors},
        handleSubmit
    } = useForm();


const onSubmit= (data) => {
    console.log(data)    

}

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Ubicacion: </InputGroup.Text>
          <Form.Control
            placeholder="Ubicacion"
            aria-label="Username"
            aria-describedby="basic-addon1"
            {...register("ubicacion", {
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
      <p>El clima es: </p>
    </>
  );
};

export default FormularioClima;
