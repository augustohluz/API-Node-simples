import {sql} from './db.js'

// sql`
// DROP TABLE IF EXISTS videos;
// `.then(() => {
//     console.log('tabela videos excluída')
// })

sql`
    CREATE TABLE usuarios (
        id TEXT PRIMARY KEY,
        nome TEXT,
        idade INTEGER,
        email TEXT
    );
`.then(() => {
    console.log('tabela videos criada')
})
