import { randomUUID } from "node:crypto"
import { sql } from './db.js'

export class DatabasePostgres {
    async list(search) {
        let usuarios

        if (search) {
            usuarios = await sql`select * from usuarios where title ilike ${'%' + search + '%'}`
            return usuarios
        }
        
        usuarios = await sql`select * from usuarios`
        
        return usuarios
    }

    async create(usuario) {
        const userId = randomUUID()
        const {nome, idade, email} = usuario

        await sql`insert into usuarios (id, nome, idade, email) values (${userId}, ${nome}, ${idade}, ${email})`
    }

    async update(id, usuario) {
        const {title, description, duration} = usuario

        await sql`update usuarios set nome = ${nome}, idade = ${idade}, email = ${email} where id = ${id}`
    }
    
    async delete(id) {
        await sql`delete from usuarios where id = ${id}`
    }
}