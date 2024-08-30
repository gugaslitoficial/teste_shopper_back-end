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
//Aqui está a função para validar o tipo de medida:
function validateMeasureType(measureType) {
    const validTypes = ['WATER', 'GAS'];
    return measureType === undefined || validTypes.includes(measureType.toUpperCase());
}
//Aqui estará o Endpoint para listar as medidas:
router.get('/:customer_code/list', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customer_code } = req.params;
    const measure_type = req.query.measure_type;
    //Aqui vou validar o parâmetro measure_type:
    if (measure_type && !validateMeasureType(measure_type)) {
        return res.status(400).json({
            error_code: 'INVALID_TYPE',
            error_description: 'O tipo de medição não é permitida!',
        });
    }
    try {
        //Aqui irá obter as medidas do cliente com/sem o filtro:
        const measures = yield (0, measure_1.getMeasuresByCustomerCode)(customer_code, measure_type);
        if (measures.length === 0) {
            return res.status(404).json({
                error_code: 'MEASURES_NOT_FOUND',
                error_description: 'Nenhuma leitura conseguiu ser encontrada',
            });
        }
        // Formatar a resposta para corresponder à estrutura esperada:
        const formattedMeasures = measures.map((measure) => ({
            measure_uuid: measure.measure_uuid,
            measure_datetime: measure.measure_datetime,
            measure_type: measure.measure_type,
            has_confirmed: measure.has_confirmed === 1, // Assumindo que 1 é confirmado e 0 é não confirmado
            image_url: measure.image_url
        }));
        //Aqui será retornado as respotas com as medidas:
        return res.status(200).json({
            customer_code,
            measures: formattedMeasures,
        });
    }
    catch (error) {
        console.error('Erro ao tentar processar a sua solicitação:', error);
        return res.status(500).json({
            error_code: 'INTERNAL_SERVER_ERROR',
            error_description: 'Ocorreu um erro interno ao tentar processar a sua solicitação',
        });
    }
}));
exports.default = router;
