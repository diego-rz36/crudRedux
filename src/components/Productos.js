import React, {Fragment, useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import { obtenerPorductosAction } from '../actions/productoActions'
import Producto from './Producto';

const Productos = () => {

    const dispatch = useDispatch();


    useEffect(()=> {
        const cargarProductos = () => dispatch(obtenerPorductosAction());
        cargarProductos();
    }, []);

    const productos = useSelector(state => state.productos.productos);
    const error = useSelector( state => state.productos.error);    
    const cargando = useSelector( state => state.productos.loading);
    return (
        <Fragment>
            <h2 className="text-center my-5">Listado de Productos</h2>

            {error ? <p className="alert alert-danger font-weight-bold text-center mt-4">Hubo un error.</p> :null}
            {cargando ? <p className="text-center">Cargando...</p> :null}

            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th className="col">Nombre</th>
                        <th className="col">Precio</th>
                        <th className="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.length === 0 ? 'No hay productos' :
                        productos.map(producto => (
                            <Producto
                                key={producto.id}
                                producto={producto}
                            />
                        ))
                    }
                </tbody>
            </table>
        </Fragment>
    );
}

export default Productos;