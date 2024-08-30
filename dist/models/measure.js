"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeasure = getMeasure;
exports.updateMeasure = updateMeasure;
exports.checkIfConfirmed = checkIfConfirmed;
exports.getMeasuresByCustomerCode = getMeasuresByCustomerCode;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const dbPromise = (0, sqlite_1.open)({
    filename: './database.db',
    driver: sqlite3_1.default.Database,
});
function getMeasure(measure_uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield dbPromise;
        return db.get('SELECT * FROM measure WHERE measure_uuid = ?', measure_uuid);
    });
}
function updateMeasure(measure_uuid, confirmed_value) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield dbPromise;
        return db.run('UPDATE measure SET confirmed_value = ?, confirmed = 1 WHERE measure_uuid = ?', [confirmed_value, measure_uuid]);
    });
}
function checkIfConfirmed(measure_uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield dbPromise;
        const measure = yield db.get('SELECT confirmed FROM measure WHERE measure_uuid = ?', measure_uuid);
        return measure && measure.confirmed === 1;
    });
}
function getMeasuresByCustomerCode(customer_code, measure_type) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield dbPromise;
        let query = 'SELECT * FROM measure WHERE customer_code = ?';
        const params = [customer_code];
        if (measure_type) {
            query += ' AND measure_type = ?';
            params.push(measure_type.toUpperCase());
        }
        return db.all(query, params);
    });
}
