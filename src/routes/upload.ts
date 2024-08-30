import express, {Request, Response} from 'express';
import axios from 'axios';
import { isBase64 } from '../utils/validators';

const router = express.Router();

function validateRequestBody(body: any) {
    if (
        typeof body.image !== 'string' ||
        !isBase64(body.image) ||
        typeof body.customer_code !== 'string' ||
        isNaN(Date.parse(body.measure_datetime)) ||
        !['WATER', 'GAS'].includes(body.measure_type)
    )   {
        return false;
        }
        return true;
    }

    router.post('/', async (req: Request, res: Response) => {
        const { image, customer_code, measure_datetime, measure_type } = req.body;

        if (!validateRequestBody(req.body)) {
            return res.status(400).json({
                error_code: 'INVALID_DATA',
                error_description: 'Dados fornecidos são inválidos',
            });
        }

        const exists = false;
        if (exists) {
            return res.status(409).json({
                error_code: 'DOUBLE_REPORT',
                error_description: 'Leitura do mês já realizada',
            });
        }

        try {
            const response = await axios.post('https://api.gemini.com/vision', { image, api_key: "<API_KEY_GEMINI>" });
            const { image_url, measure_value, measure_uuid } = response.data;

            return res.status(200).json({
                image_url,
                measure_value,
                measure_uuid,
            });
        } catch (error) {
            console.error('Erro em integrar a API Gemini do Google:', error);
            return res.status(500).json({
                error_code: 'INTERNAL_SERVER_ERROR',
                error_description: 'Erro interno ao processar sua imagem',
            });
        }
    });

    export default router;
