
import paytmchecksum from '../paytm/PaytmChecksum.js';
import { paytmParams, paytmMerchantkey } from '../index.js';


export const addPaymentGateway = async (request,response ) => {
    try {
        let PaytmCheckum = await paytmchecksum.generateSignature(paytmParams, paytmMerchantkey);

        let params = {
         ...paytmParams, 'CHECKSUMHASH': paytmchecksum   
        }

        response.status(200).json(params);
    }catch(error) {
        response.status(500).json({ errror: error.message })

    }

}