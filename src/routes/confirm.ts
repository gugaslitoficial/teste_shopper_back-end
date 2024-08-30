import express, { Request, Response } from 'express';
import { getMeasure, updateMeasure, checkIfConfirmed } from '../models/measure';

const router = express.Router();

function validateRequestBody(body: any) {
    return (
        typeof body.measure_uuid === 'string' &&
        Number.isInteger(body.confirmed_value) &&
        body.confirmed_value >= 0
    );
}

router.patch('/', async (req: Request, res: Response) => {
    const { measure_uuid, confirmed_value } = req.body;

    console.log('Dados foram recebidos', req.body);

    if (!validateRequestBody(req.body)) {
        return res.status(400).json({
            error_code: 'INVALID_DATA',
            error_description: 'Os dados que você forneceu estão inválidos',
        });
    }

    try {
        const measure = await getMeasure(measure_uuid);
        if (!measure) {
            return res.status(404).json({
                error_code: 'MEASURE_NOT_FOUND',
                error_description: 'A leitura não foi encontrada',
            });
        }

        const alreadyConfirmed = await checkIfConfirmed(measure_uuid);
        if (alreadyConfirmed) {
            return res.status(409).json({
                error_code: 'CONFIRMATION_DUPLICATE',
                error_description: 'A leitura já foi confirmada',
            });
        }

        await updateMeasure(measure_uuid, confirmed_value);

        return res.status(200).json({
            success: true,
        });
    } catch (error) {
        console.error('Foi identificado um erro ao processar a confirmação:', error);
        return res.status(500).json({
            error_code: 'INTERNAL_ERROR',
            error_description: 'Erro ao processar a confirmação',
        });
    }
});

export default router;