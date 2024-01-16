import { useState } from 'react';
import axios from "axios"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {

  const [nombre, setNombre] = useState("")
  const [edad, setEdad] = useState(0)
  const [pais, setPais] = useState("")
  const [cargo, setCargo] = useState("")
  const [anios, setAnios] = useState(0)
  const [id, setId] = useState(0)
  
  const [editar, setEditar] = useState(false)

  const [empleadoList, setEmpleados] = useState([])

  const add = () => {
    axios.post("http://localhost:3001/create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
    }).then(() => {
      getEmpleados()
      limpiar()
      alert("empleado registrado")
    })
  }

  const getEmpleados = () => {
    axios.get("http://localhost:3001/empleados").then((res) => {
      setEmpleados(res.data)
    })
  }

  const editarEmpleado = (val) => {
    console.log('editar');
    setEditar(true)

    setNombre(val.nombre)
    setEdad(val.edad)
    setPais(val.pais)
    setCargo(val.cargo)
    setAnios(val.anios)
    setId(val.id)
  }

  const limpiar = () => {
    setNombre("")
    setEdad("")
    setPais("")
    setCargo("")
    setAnios("")
    setId("")
    setEditar(false)
  }

  const update = () => {
    axios.put("http://localhost:3001/update", {
      id: id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
    }).then(() => {
      getEmpleados()
      limpiar()
      alert('actualizar')
    })
  }

  const deleteEmpleado = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}` , {
      id: id
    }).then(() => {
      getEmpleados()
      limpiar()
      alert('eliminado')
    })
  }

  
  return (
    <div className="container">
      <div className="App">

      </div>

      <div className="card text-center">
        <div className="card-header">
          GESTION DE EMPLEADOS
        </div>
        <div className="card-body">

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Nombre: </span>
          <input
            onChange={(e) => {
              setNombre(e.target.value)
            }}
            type="text" className="form-control" value={nombre} placeholder="Ingrese nombre" aria-label="Username" aria-describedby="basic-addon1" />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Edad: </span>
          <input
            onChange={(e) => {
              setEdad(e.target.value)
            }}
            type="number" className="form-control" value={edad} placeholder="Ingrese edad" aria-label="Username" aria-describedby="basic-addon1" />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">País: </span>
          <input
            onChange={(e) => {
              setPais(e.target.value)
            }}
            type="text" className="form-control" value={pais} placeholder="Ingrese pais" aria-label="Username" aria-describedby="basic-addon1" />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Cargo: </span>
          <input
            onChange={(e) => {
              setCargo(e.target.value)
            }}
            type="text" className="form-control" value={cargo} placeholder="Ingrese cargo" aria-label="Username" aria-describedby="basic-addon1" />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Años: </span>
          <input
            onChange={(e) => {
              setAnios(e.target.value)
            }}
            type="number" className="form-control" value={anios} placeholder="Ingrese años" aria-label="Username" aria-describedby="basic-addon1" />
        </div>
          
        </div>
        <div className="card-footer text-body-secondary">
            {
              editar ?
                <div>
                  <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
                  <button className='btn btn-info m-2' onClick={limpiar}>Cancelar</button>
                </div>
              :
                <button className='btn btn-success' onClick={add}>Editar</button>
            }

          
          <button className='btn btn-success' onClick={getEmpleados}>listar</button>
        </div>
      </div>

      <table className="table table-striped">
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Nombre</th>
                <th scope='col'>Edad</th>
                <th scope='col'>Pais</th>
                <th scope='col'>Cargo</th>
                <th scope='col'>Años experiencias</th>
                <th scope='col'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                empleadoList.map((val, key) => {
                  console.log(val, key)
                  return <tr key={val.id}>
                      <th scope='row'>{val.id}</th>
                      <td>{val.nombre}</td>
                      <td>{val.edad}</td>
                      <td>{val.pais}</td>
                      <td>{val.cargo}</td>
                      <td>{val.anios}</td>
                      <td>
                        <div className="btn-group" role="group" aria-label="Basic example">
                          <button type="button" 
                            onClick={(() => {
                              editarEmpleado(val)
                            })}
                            className="btn btn-info">Editar</button>
                          <button type="button"
                            onClick={(() => {
                              deleteEmpleado(val.id)
                            })}
                            className="btn btn-danger">Eliminar</button>
                        </div>
                      </td>
                      
                    </tr>

                })
              }
          </tbody>
      </table>

    </div>
  );
}

export default App;
