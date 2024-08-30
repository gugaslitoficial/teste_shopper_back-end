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
const measure_1 = require("../models/measure");
const router = express_1.default.Router();
//Aqui irei colocar minha função de validação:
function validateRequestBody(body) {
    return (typeof body.measure_uuid === 'string' &&
        Number.isInteger(body.confirmed_value) &&
        body.confirmed_value >= 0);
}
router.patch('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { measure_uuid, confirmed_value } = req.body;
    console.log('Dados foram recebidos', req.body);
    //Aqui irei validar o corpo da requisição:
    if (!validateRequestBody(req.body)) {
        return res.status(400).json({
            error_code: 'INVALID_DATA',
            error_description: 'Os dados que você forneceu estão inválidos',
        });
    }
    try {
        //Aqui irei ver se o código de leitura realmente existe:
        const measure = yield (0, measure_1.getMeasure)(measure_uuid);
        if (!measure) {
            return res.status(404).json({
                error_code: 'MEASURE_NOT_FOUND',
                error_description: 'A leitura não foi encontrada',
            });
        }
        //Agora, aqui será para verificar se o código da leitura já foi confirmado:
        const alreadyConfirmed = yield (0, measure_1.checkIfConfirmed)(measure_uuid);
        if (alreadyConfirmed) {
            return res.status(409).json({
                error_code: 'CONFIRMATION_DUPLICATE',
                error_description: 'A leitura já foi confirmada',
            });
        }
        //Aqui irá atualizar o banco de dados com um novo valor:
        yield (0, measure_1.updateMeasure)(measure_uuid, confirmed_value);
        //Aqui irá enviar a resposta de sucesso, caso houver:
        return res.status(200).json({
            success: true,
        });
    }
    catch (error) {
        console.error('Foi identificado um erro ao processar a confirmação:', error);
        return res.status(500).json({
            error_code: 'INTERNAL_ERROR',
            error_description: 'Erro ao processar a confirmação',
        });
    }
}));
exports.default = router;
