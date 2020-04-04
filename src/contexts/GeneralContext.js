import React, { createContext, useState, useEffect} from 'react';
import axios from 'axios';

export const GeneralContext = createContext();

const GeneralContextProvider = (props) => {

    const [ exchangeRate, setExchangeRate ] = useState(1);

    const [ apikey, setApikey ] = useState('e972a19b09ea90cf3ff34ec12359bd7b1');

    const searchExchangeRate = (fromnya='EUR', tonya='IDR') => {        
        if(fromnya === "IDR"){
            fromnya = tonya;
            tonya = fromnya;
        }
        axios.get('https://api.ichronoz.net/exchangeV2?curFrom='+fromnya+'&curTo='+tonya+'&api='+apikey)
            .then(res => {
                
                console.log('exchange:',res.data.rate);

                setExchangeRate(res.data.rate);

            })
            .catch(error => {
                console.log('Sorry! we are under maintenance [exchange rate]');
                
            });
    }

    useEffect(() => {
        searchExchangeRate();
    }, [])

    return (  
        <GeneralContext.Provider value={{ exchangeRate, searchExchangeRate }}>
            {props.children}
        </GeneralContext.Provider>
    );
}
 
export default GeneralContextProvider;