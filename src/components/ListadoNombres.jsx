import React, {useState} from "react";
import uniqid from 'uniqid'

const ListadoNombres = () => {

    const [nombre, setNombre] = useState('')
    const [listaNombre, setListaNombre] = useState([])
    const [editar, setEditar] = useState(false)
    const [id, setId] = useState('')
    const [error, setError] = useState(null)

    const addNombre = (event) => {
        
        event.preventDefault()
        const nuevoNombre = {
            id:uniqid(),
            name: nombre
        }
        if(!nombre.trim()){
            setError("El Campo esta vacio")
            return
        }
        else{setListaNombre([...listaNombre,nuevoNombre])
        setNombre('')
        setError(null)
}
        
    }

        const deleteNombre =(id)=>{
            const nuevoArray = listaNombre.filter(item => item.id !== id)
            setListaNombre(nuevoArray)
        }

        const edit = (item) =>{
            setEditar(true)
            setNombre(item.name)
            setId(item.id)
        }

        const editarNombre = (e) =>{
            e.preventDefault()
            const nuevoArray = listaNombre.map(item =>
                item.id === id ? {id:id, name:nombre} : item)
                setListaNombre(nuevoArray)
                setEditar(false)
        }



    return(
        <div>
            <h2 className="text-center">App Crud Basica</h2>
            <div className="row">
                <div className="col">
                    <h2 className="text-center">Listado Nombres</h2>
                    <ul className="list-group">
                      {
                          listaNombre.map(item => 
                            <li key={item.id} className="list-group-item">
                                {item.name}
                               <button className="btn btn-danger float-end"
                                onClick={ () => {deleteNombre(item.id)}}>
                                    Borrar
                                </button>
                                <button className="btn btn-info float-end"
                                onClick={ () => {edit(item)}}>
                                    Editar
                                </button>
                                
                            </li> 
                            )
                      }
                    </ul>
                </div>
                <div className="col">
                    <h2 className="text-center">Formularo para añadir nombres</h2>
                        <form onSubmit={editar ? editarNombre : addNombre}className="form-group">
                                <input
                                placeholder="Ingrese el nombre"
                                className="form-control mb-3"
                                type="text"
                                onChange={(e) => {setNombre(e.target.value)}}
                                value={nombre}
                                />
                
                                <input className="form-control btn btn-info btn-block"
                                type="submit" value={editar ? "EDITAR NOMBRE" : "REGISTRAR NOMBRE"}/>

                        </form>
                        {

                            error != null ? (
                                <div className="mt-2 alert alert-danger">{error}</div>
                            ):
                                (<div>     </div>)

                        }
                </div>
 </div>
        </div>
    )
}

export default ListadoNombres;