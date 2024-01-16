const express = require("express")
const app = express()
const mysql = require("mysql")
const cors = require("cors")


app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"12345678",
    database:"empleados_crud"
})

app.post("/create", (req, res) => {
    console.log(req)

    const nombre = req.body.nombre
    const edad = req.body.edad
    const pais = req.body.pais
    const cargo = req.body.cargo
    const anios = req.body.anios

    db.query(
        'INSERT INTO empleados(nombre,edad,pais,cargo,anios) VALUES(?,?,?,?,?)',
        [nombre, edad, pais, cargo, anios],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send("Empleado registrado con exito")
            }
        }
    )
});

app.get("/empleados", (req, res) => {

    db.query(
        'SELECT * FROM empleados',
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
});

app.put("/update", (req, res) => {

    console.log(req)
    const id = req.body.id
    const nombre = req.body.nombre
    const edad = req.body.edad
    const pais = req.body.pais
    const cargo = req.body.cargo
    const anios = req.body.anios

    db.query(
        'UPDATE empleados SET nombre=?,edad=?,pais=?,cargo=?,anios=? WHERE id=?',
        [nombre, edad, pais, cargo, anios, id],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send("Empleado actualizado con exito")
            }
        }
    )
});

app.delete("/delete/:id", (req, res) => {
    console.log(req)

    const id = req.params.id

    db.query(
        'DELETE FROM empleados WHERE id=?',
        id,
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send("Empleado eliminado con exito")
            }
        }
    )
});

app.listen(3001, () => {
    console.log("Corriengo en el puerto 3001")
})
