import React, { createContext, useState, useEffect} from 'react';
import axios from 'axios';

export const GeneralContext = createContext();

const GeneralContextProvider = (props) => {

    const [ exchangeRate, setExchangeRate ] = useState(1);

    const searchExchangeRate = (fromnya='USD', tonya='IDR') => {        
        axios.get('https://api.exchangeratesapi.io/latest?base='+fromnya+'&symbols='+tonya)
            .then(res => {
                
                // console.log('exchange:',res.data.rates);
                setExchangeRate(res.data.rates[tonya]);

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