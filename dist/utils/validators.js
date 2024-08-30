"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBase64 = isBase64;
function isBase64(str) {
    //Aqui verificará se a string é base64
    const base64Pattern = /^([A-Za-z0-9+\/=]{4}){1,}([A-Za-z0-9+\/=]{2}==|[A-Za-z0-9+\/=]{3}=)?$/;
    return base64Pattern.test(str);
}
