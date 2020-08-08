import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    OBTENER_PRODUCTO_ELIMINADO_EXITO,
    OBTENER_PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    OBTENER_PRODUCTO_EDITADO_EXITO,
    OBTENER_PRODUCTO_EDITADO_ERROR
} from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

export function crearNuevoProductoAction(producto){
    return async (dispatch) => {
        dispatch(agregarProducto());

        try{
            //Insertar API
            await clienteAxios.post('/productos', producto);

            //Actualiza state
            dispatch(agregarProductoExito(producto));

            Swal.fire(
                'Correcto',
                'El producto se agrego correctamente',
                'success'
            );
        } catch(error){
            console.log(error);
            //Cambia el state si hay error
            dispatch(agregarProductoError(true));
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            });
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})

const agregarProductoExito = producto =>({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

const agregarProductoError = estado =>({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})


export function obtenerPorductosAction() {
    return async (dispatch) => {
        dispatch(descargarProductos());
        try {
            const respuesta  = await clienteAxios.get('/productos');
            dispatch(descargarProductosExitosa(respuesta.data));
        }catch(error){
            dispatch(descargarProductosError());
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
});
const descargarProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
});
const descargarProductosError = productos => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
});

export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id))
        try {
            await clienteAxios.delete(`/productos/${id}`);            
            dispatch(eliminarProductoExito());
            Swal.fire(
                'ELiminado!',
                'El producto se elimino correctamente.',
                'success'
              )
        }catch(error){
            dispatch(eliminarProductoError());
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = () => ({
    type: OBTENER_PRODUCTO_ELIMINADO_EXITO
})

const eliminarProductoError = () =>({
    type: OBTENER_PRODUCTO_ELIMINADO_ERROR,
    payload: true
})

export function obtenerProductoEditar(producto) {
    return (dispatch) => {        
        dispatch(obtenerProductoEditarAction(producto));
    }
}

const obtenerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})
export function editarProductoAction(producto) {
    return async (dispatch) => {
        dispatch( editarProducto());
        try {
            const resultado = await clienteAxios.put(`/productos/${producto.id}`,producto);
            dispatch(editarProductoExito(producto));
        }catch(error){
            dispatch(editarProductoError());
        }
    }
}

const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO
})

const editarProductoExito = producto => ({
    type: OBTENER_PRODUCTO_EDITADO_EXITO,
    payload: producto
})
const editarProductoError = () => ({
    type: OBTENER_PRODUCTO_EDITADO_ERROR
})
