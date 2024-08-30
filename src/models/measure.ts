import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const dbPromise = open ({
    filename: './database.db',
    driver: sqlite3.Database,
});

export async function getMeasure(measure_uuid: string) {
    const db = await dbPromise;
    return db.get('SELECT * FROM measure WHERE measure_uuid = ?', measure_uuid);
}

export async function updateMeasure(measure_uuid: string, confirmed_value: number) {
    const db = await dbPromise;
    return db.run('UPDATE measure SET confirmed_value = ?, confirmed = 1 WHERE measure_uuid = ?', [confirmed_value, measure_uuid]);
}

export async function checkIfConfirmed(measure_uuid: string) {
    const db = await dbPromise;
    const measure = await db.get('SELECT confirmed FROM measure WHERE measure_uuid = ?', measure_uuid);
    return measure && measure.confirmed === 1;
}

export async function getMeasuresByCustomerCode(customer_code: string, measure_type?: string) {
    const db = await dbPromise;

    let query = 'SELECT * FROM measure WHERE customer_code = ?';
    const params = [customer_code];

    if (measure_type) {
        query += ' AND measure_type = ?';
        params.push(measure_type.toUpperCase());
    }

    return db.all(query, params);
}