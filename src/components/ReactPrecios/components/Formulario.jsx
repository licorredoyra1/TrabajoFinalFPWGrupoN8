import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from "react-hook-form";

function Formulario({ setProductos, productos }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = (data) => {
        setProductos([...productos, data])
        reset();
    }


    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="mb-3">
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="12" className="my-3">
                    <Form.Control type="text" className="text-center" placeholder="Producto"
                        {...register("producto", {
                            required: "el producto es requerido",
                            minLength: { value: 2, message: "El producto debe requerir mínimamente 2 caracteres" },
                            maxLength: { value: 20, message: "El producto debe tener como máximo 20 caracteres" }
                        })}
                    />
                    <Form.Text className="text-danger">
                        {errors.producto?.message}
                    </Form.Text>
                </Form.Group>
                <Form.Group as={Col} md="12" className="my-3">

                    <Form.Control type="number" className="text-center" placeholder="Precio" 
                    {...register("precio",{
                        required: 'El precio es necesario',
                        min:{ value: 5, message: 'el precio debe valer mínimamente 5'},
                        max:{ value:100000, message: 'el precio máximo es de 100.000'}
                    })}
                     />
                     <Form.Text className="text-danger">
                        {errors.precio?.message}
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid state.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12" className="my-3">
                    <Form.Select {...register('comercio', {required: 'Debe seleccionar un comercio'})}>
                        <option className='text-center' value=''>Seleccionar comercio</option>
                        <option className='text-center' value='DIA'>DIA</option>
                        <option className='text-center' value='Comodín'>Comodín</option>
                        <option className='text-center' value='Carrefour'>Carrefour</option>
                    </Form.Select>
                    <Form.Text className="text-danger">
                        {errors.comercio?.message}
                    </Form.Text>
                </Form.Group>
            </Row>
            <div className='text-center'>
            <Button type="submit" className='mb-4'>Agregar producto</Button>
            </div>
        </Form>
    );
}

export default Formulario;