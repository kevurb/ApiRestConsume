
import morgan from 'morgan'
import express from 'express'
import {join, dirname} from 'path'
import { fileURLToPath } from 'url';



//inizialitation
const app =  express();
const __dirname= dirname(fileURLToPath(import.meta.url))
console.log(dirname);

//config 
const PORT = process.env.PORT || 3000;
app.set('PORT',PORT)
//midwares
app.use(morgan('dev'))
//ruta
app.get('/',(req,res)=>{
    res.sendFile(join(__dirname,'index.html'))
    
})
app.use(express.static(__dirname))
app.listen(app.get('PORT'), ()=>{
    console.log('SE EJECUTA EN ',app.get('PORT'));
})