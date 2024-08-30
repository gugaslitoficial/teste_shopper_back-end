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
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const validators_1 = require("../utils/validators"); //Aqui é dá minha função de validação!
const router = express_1.default.Router();
//Aqui eu vou criar uma função de validação:
function validateRequestBody(body) {
    //Aqui irei criar uma validação dos campos:
    if (typeof body.image !== 'string' ||
        !(0, validators_1.isBase64)(body.image) ||
        typeof body.customer_code !== 'string' ||
        isNaN(Date.parse(body.measure_datetime)) ||
        !['WATER', 'GAS'].includes(body.measure_type)) {
        return false;
    }
    return true;
}
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { image, customer_code, measure_datetime, measure_type } = req.body;
    //Aqui irei validar os campos de requisição:
    if (!validateRequestBody(req.body)) {
        return res.status(400).json({
            error_code: 'INVALID_DATA',
            error_description: 'Dados fornecidos são inválidos',
        });
    }
    //Agora vou verificar se há uma leitura do mês atual - Apenas como teste:
    //Substituindo pelo código real para verificar no banco de dados
    const exists = false;
    if (exists) {
        return res.status(409).json({
            error_code: 'DOUBLE_REPORT',
            error_description: 'Leitura do mês já realizada',
        });
    }
    try {
        //Integrando com a API Gemini do Google
        const response = yield axios_1.default.post('https://api.gemini.com/vision', { image, api_key: "AIzaSyBmJjMXwbfoEaQAWOuUz0Jm5-CUIcD5qXA" });
        const { image_url, measure_value, measure_uuid } = response.data;
        //Aqui será enviada a resposta:
        return res.status(200).json({
            image_url,
            measure_value,
            measure_uuid,
        });
    }
    catch (error) {
        console.error('Erro em integrar a API Gemini do Google:', error);
        return res.status(500).json({
            error_code: 'INTERNAL_SERVER_ERROR',
            error_description: 'Erro interno ao processar sua imagem',
        });
    }
}));
exports.default = router;
