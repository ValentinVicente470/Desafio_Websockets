const { promises: fs } = require ('fs')

class Contenedor {
    constructor (archivo) {
        this.archivo = archivo
    }
    

    async save (dato) {
        try{ 
            const objs = await this.getall2()           

            const newObj = dato
            objs.push(newObj)

            fs.writeFile (this.archivo, JSON.stringify (objs, null, 2))
        }
        catch (err) {
            console.log ('error al escribir', err)
        }

    }

    async getall2() {
        try { 
            const objs = await fs.readFile(this.archivo, 'utf-8')
            return JSON.parse(objs)
        }
        catch (err) {
            return err
        }
    }

}


const archivo2 = new Contenedor ('./mensajes.txt')

module.exports = archivo2