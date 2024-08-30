import express, {Request, Response} from 'express';
import axios from 'axios';
import { isBase64 } from '../utils/validators';

const router = express.Router();

//Aqui eu vou criar uma função de validação:
function validateRequestBody(body: any) {
    //Aqui irei criar uma validação dos campos:
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
            const response = await axios.post('https://api.gemini.com/vision', { image, api_key: "AIzaSyBmJjMXwbfoEaQAWOuUz0Jm5-CUIcD5qXA" });
            const { image_url, measure_value, measure_uuid } = response.data;

            //Aqui será enviada a resposta:
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
