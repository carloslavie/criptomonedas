import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Error from './Error';
import useMoneda from '../hooks/useMoneda'
import useCriptomoneda from '../hooks/useCriptomoneda'
import axios from 'axios';

const Boton = styled.input`
    margin-top:20px;
    font-weight: bold;
    font-size:20px;
    padding:10px;
    background-color:#66a2fe;
    border:none;
    width:100%;
    border-radius:10px;
    color:#fff;
    transition: background-color .3s, ease; 

        &:hover{
            background-color:#326ac0;
            cursor: pointer;
        }
`;

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {

    //State de listado de criptomonedas
    const [ listadocritpo, guardarCriptomonedas ] = useState([]);

    const MONEDAS = [
        {codigo:'USD', nombre:'Dolar de Estados Unidos'},
        {codigo:'MXN', nombre:'Peso Mexicano'},
        {codigo:'EUR', nombre:'Euro'},
        {codigo:'GBP', nombre:'Libra Esterlina'},
        {codigo:'COD', nombre:'Peso Colombiano'},
        {codigo:'ARS', nombre:'Peso Argentino'},
    ]
    const [ moneda, SelectMonedas ] = useMoneda('Elige tu moneda', '', MONEDAS);

    const [ criptomoneda, SelectCripto ] = useCriptomoneda('Elige tu critpomoneda','', listadocritpo);

    const [ error, guardarError ] = useState(false);

    useEffect(() => {
        const consultarAPI = async ()=>{
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);

            guardarCriptomonedas(resultado.data.Data);
        }
        consultarAPI();
    }, [])

    //Validaciones
    const cotizarMoneda = e =>{
        e.preventDefault();
    
    if(moneda === "" || criptomoneda === ""){
        guardarError(true);
        return;
    }
    guardarError(false);
    guardarMoneda(moneda);
    guardarCriptomoneda(criptomoneda);
}

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            { error ? <Error mensaje='Todos los campos son obligatorios'/> : null}
            
            <SelectMonedas />

            <SelectCripto />
            <Boton
                type= "submit"
                value= "calcular"
            />

        </form>
     );
}
 
export default Formulario;