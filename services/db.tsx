import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";
import PouchDBAdapterMemory from "pouchdb-adapter-memory";
import type { Type1 } from "./db-types";

PouchDB.plugin(PouchDBAdapterMemory);
PouchDB.plugin(PouchDBFind);

const db = new PouchDB<Type1>("http://admin:admin@localhost:5984/dbname");

export const createSamples = async () => {
    await db.bulkDocs([
        {
            name: "jack",
            age: 23,
        },
        {
            name: "jimmy",
            age: 24,
        },
        {
            name: "smith",
            age: 22,
        },
    ]);
    return {
        success: true,
    }
}

export const getAll = async () => {
    return await db.allDocs({include_docs: true});
}

export default db;