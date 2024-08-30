import express, { Request, Response } from 'express';
import { getMeasuresByCustomerCode } from '../models/measure';

const router = express.Router();

//Aqui está a função para validar o tipo de medida:
function validateMeasureType(measureType: any): measureType is string {
    const validTypes = ['WATER', 'GAS' ];
    return measureType === undefined || validTypes.includes(measureType.toUpperCase());
}

//Aqui estará o Endpoint para listar as medidas:
router.get('/:customer_code/list', async (req: Request, res: Response) => {
    const { customer_code } = req.params;
    const measure_type = req.query.measure_type as string | undefined;

    //Aqui vou validar o parâmetro measure_type:
    if (measure_type && !validateMeasureType(measure_type)) {
        return res.status(400).json({
            error_code: 'INVALID_TYPE',
            error_description: 'O tipo de medição não é permitida!',
        });
    }   

    try {
        //Aqui irá obter as medidas do cliente com/sem o filtro:
        const measures = await getMeasuresByCustomerCode(customer_code, measure_type);

        if (measures.length === 0) {
            return res.status(404).json({
                error_code: 'MEASURES_NOT_FOUND',
                error_description: 'Nenhuma leitura conseguiu ser encontrada',
            });
        }

        // Aqui estou formatando a resposta para corresponder à estrutura esperada:
        const formattedMeasures = measures.map((measure) => ({
            measure_uuid: measure.measure_uuid,
            measure_datetime: measure.measure_datetime,
            measure_type: measure.measure_type,
            has_confirmed: measure.has_confirmed === 1, // Irei assumir que 1 é confirmado e 0 é não confirmado
            image_url: measure.image_url
        }));

        //Aqui será retornado as respotas com as medidas:
        return res.status(200).json({
            customer_code,
            measures: formattedMeasures, 
        });
    } catch (error) {
        console.error('Erro ao tentar processar a sua solicitação:', error);
        return res.status(500).json({
            error_code: 'INTERNAL_SERVER_ERROR',
            error_description: 'Ocorreu um erro interno ao tentar processar a sua solicitação',
        });
    }
});

export default router;