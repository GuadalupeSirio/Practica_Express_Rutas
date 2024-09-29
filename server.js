const express = require('express')
const app = express()
const HOSTNAME = '127.0.0.1';
const PORT = 3000;

const { infoLenguajes } = require('./src/lenguajesFrontBack');
let miJson = JSON.stringify(infoLenguajes);

//console.log(infoLenguajes.frontend[1])

console.log(typeof infoLenguajes)
console.log(typeof miJson)
//console.log(miJson)

//console.log(infoLenguajes)


//GET que accede a la raiz
app.get('/', (req, res) => {
    res.send('<h1>Hola Mundo! Bienvenido al server con express!</h1>')
})

app.get('/api', (req, res) => {
    console.log("entrando a api")
    res.send('<h1> ENTRANDO EN /API</h1>')
})

app.get('/api/lenguajes/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.end(JSON.stringify(infoLenguajes));
})

app.get('/api/lenguajes/frontend', (req, res) => {
    //res.send(infoLenguajes.frontend);
    res.send(JSON.stringify(infoLenguajes.frontend));
})

app.get('/api/lenguajes/frontend/:lenguaje', (req, res) => {
    const lenguaje = req.params.lenguaje.toLocaleLowerCase();
    console.log(` el lenguaje que recibe por parametro es: ${lenguaje}`)
    const filtrado = infoLenguajes.frontend.filter(
        //(lenguajes) => { lenguajes.nombre === lenguaje }
        lenguajes => lenguajes.nombre.toLocaleLowerCase() === lenguaje
    )

    if(filtrado.length === 0){
        return res.status(404).send(`No se encontró el curso con lenguaje: ${lenguaje}`)
    }

    res.status(200).send(filtrado);

})
//-------------Punto 1 --------------------------
app.get('/api/lenguajes/backend', (req, res) => {
    //res.send(infoLenguajes.backend);
    res.send(JSON.stringify(infoLenguajes.backend));
})
//-------------Punto 2 --------------------------
app.get('/api/lenguajes/backend/:lenguaje', (req, res) => {
    const lenguaje = req.params.lenguaje.toLocaleLowerCase();
    console.log(` el lenguaje que recibe por parametro es: ${lenguaje}`)
    const filtrado = infoLenguajes.backend.filter(
        //(lenguajes) => { lenguajes.nombre === lenguaje }
        lenguajes => lenguajes.nombre.toLocaleLowerCase() === lenguaje
    )
    if(filtrado.length === 0){
        return res.status(404).send(`No se encontró el curso con lenguaje: ${lenguaje}`)
    }
    res.status(200).send(filtrado);
})
//-------------Punto 3 --------------------------
app.get('/api/lenguajes/backend/turno/:horario', (req, res) => {
    const horario = req.params.horario.toLocaleLowerCase();
    console.log(` el turno que recibe por parametro es: ${horario}`)
    const filtrado = infoLenguajes.backend.filter(
        lenguajes => lenguajes.turno.toLocaleLowerCase() === horario
    )
    if(filtrado.length === 0){
        return res.status(404).send(`No se encontró el curso con turno: ${horario}`)
    }
    res.status(200).send(filtrado);
})
//-------------Punto 4 --------------------------
app.get('/api/lenguajes/frontend/turno/:horario', (req, res) => {
    const horario = req.params.horario.toLocaleLowerCase();
    console.log(` el turno que recibe por parametro es: ${horario}`)
    const filtrado = infoLenguajes.frontend.filter(
        lenguajes => lenguajes.turno.toLocaleLowerCase() === horario
    )
    if(filtrado.length === 0){
        return res.status(404).send(`No se encontró el curso con turno: ${horario}`)
    }
    res.status(200).send(filtrado);
})
//-------------Punto 5 --------------------------
app.get('/api/lenguajes/backend/cantidadAlumnos/:cant', (req, res) => {
    const cant = parseInt(req.params.cant)
    console.log(` el turno que recibe por parametro es: ${cant}`)
    const filtrado = infoLenguajes.backend.filter(
        lenguajes => lenguajes.cantidadAlumnos >= cant
    )
    if(filtrado.length === 0){
        return res.status(404).send(`No se encontró el curso con turno: ${cant}`)
    }
    res.status(200).send(filtrado);
})
//-------------Punto 6 --------------------------
app.get('/api/lenguajes/frontend/cantidadAlumnos/:cant', (req, res) => {
    const cant = parseInt(req.params.cant)
    console.log(` el turno que recibe por parametro es: ${cant}`)
    const filtrado = infoLenguajes.frontend.filter(
        lenguajes => lenguajes.cantidadAlumnos >= cant
    )
    if(filtrado.length === 0){
        return res.status(404).send(`No se encontró el curso con turno: ${cant}`)
    }
    res.status(200).send(filtrado);
})
//-------------Punto 7 --------------------------
app.get('/api/lenguajes/cantidadAlumnos/:cant', (req, res) => {
    const cant = parseInt(req.params.cant)
    console.log(` el turno que recibe por parametro es: ${cant}`)
    const filtradoFrontend = infoLenguajes.frontend.filter(
        lenguajes => lenguajes.cantidadAlumnos >= cant
    )
    const filtradoBackend = infoLenguajes.backend.filter(
        lenguajes => lenguajes.cantidadAlumnos >= cant
    )

    const filtrado = filtradoFrontend.concat(filtradoBackend)

    if(filtrado.length === 0){
        return res.status(404).send(`No se encontró el curso con turno: ${cant}`)
    }
    res.status(200).send(filtrado);
})

app.listen(PORT, HOSTNAME, () => {
    console.log(`El servidor está corriendo en http://${HOSTNAME}:${PORT}/`);
});
