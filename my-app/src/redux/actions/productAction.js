
import axios from 'axios';

import * as actionTypes from '../constants/productConstant.js';

const URL = 'http://localhost:8000';

export const getProducts = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`${URL}/products`);
        // let response = await axios.get(`${URL}/products`);//
        // console.log(response);//
        dispatch({type:actionTypes.GET_PRODUCTS_SUCCESS, payload: data });

    } catch (error) {
        dispatch({type: actionTypes.GET_PRODUCTS_FAIL, payload: error.message });
        // console.log('Error while calling getProducts api', error.message);//
    }
};

export const getProductDetails = (id) => async (dispatch) => {
    
    try {        
        dispatch({ type:actionTypes.GET_PRODUCT_DETAILS_REQUEST });
        const { data } = await axios.get(`${URL}/product/${id}`);
        console.log('data',data);

        dispatch({ type:actionTypes.GET_PRODUCT_DETAILS_SUCCESS, payload: data });
        
    } catch (error) {
        dispatch({ type:actionTypes.GET_PRODUCT_DETAILS_FAIL, payload: error.response}); 

    }

};


