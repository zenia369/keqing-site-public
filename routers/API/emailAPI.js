import Router from 'express';
const router = Router();
import validator from "email-validator";
import Email from '../../service/SendEmailService.js'


router.post('/message', async (req, res) => {
    const {body} = req;
    try {
        if(validator.validate(`${body.email}`)) {
            const {st, check} = await Email.send(body)

            res.status(st).json({check})

        } else {
            res.status(201).json({check:false})
            console.warn('Erorr in send message');
        }
    } catch (error) {
        res.status(201).json({check:false})
        console.warn('Erorr in send message:', error);
    }
    
})


export default router;