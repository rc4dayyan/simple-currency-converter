import React, { useState, useContext, useEffect, useCallback } from 'react';
import { GeneralContext } from '../contexts/GeneralContext';
import NumberFormat from 'react-number-format';
import {
    Container, 
    Grid, 
    Icon, 
    Segment, 
    Dropdown, 
    Button, 
    Header} from 'semantic-ui-react';
import { isMobile } from "react-device-detect";
import { CurrencyOptions } from './CurrencyOptions';

const CurrencyConverter = () => {

    const [ country ] = useState(CurrencyOptions);

    const { exchangeRate, searchExchangeRate } = useContext(GeneralContext);

    const [ fromCurrency, setFromCurrency ] = useState('USD');

    const [ toCurrency, setToCurrency ] = useState('IDR');

    const [ fromValue, setFromValue ] = useState(1);

    const [ toValue, setToValue ] = useState(1);

    const changeFromCurrency = (from) => {
        setFromCurrency(from);
        searchExchangeRate(from, toCurrency);
    }

    const changeToCurrency = (to) => {
        setToCurrency(to);
        searchExchangeRate(fromCurrency, to);
    }

    const nilaiExchange = useCallback(
        (rate = fromValue) => {
        let nilai = 0;
        nilai = rate*exchangeRate;

        return nilai;
    }, [exchangeRate, fromValue])

    const getSymbol = (currency) => {
        let cur = country.find(el => {  
            let nilai = '';
            if(el.value === currency)  {
                nilai = el;
            }
            return nilai
        });
        return (cur !== '-') ? cur.symbol : '';
    }

    const switchCurrency = () => {
        let temp = fromCurrency;
        setFromCurrency(toCurrency);
        setToCurrency(temp);
        searchExchangeRate(toCurrency, fromCurrency);
    }

    useEffect(() => {
        setToValue(nilaiExchange());
    },[exchangeRate, nilaiExchange])

    return (
        <Container>
            <Segment placeholder>
                <Header as='h2'>
                    <Header.Content>
                        Currency Converter
                    <Header.Subheader>{new Date().toLocaleString()}</Header.Subheader>
                    </Header.Content>
                </Header>
                <Grid verticalAlign='middle'>
                    <Grid.Row>
                        <Grid.Column width={ isMobile ? 16 : 7 }>
                            <div className="label">
                                <p>From:</p>
                            </div>
                            <div>
                                <Dropdown
                                    placeholder='Select Country'
                                    fluid
                                    search
                                    selection
                                    value={fromCurrency}
                                    onChange={(e, data)=>{return changeFromCurrency(data.value)}}
                                    options={country}
                                />
                            </div>
                            <div className="text-exchange">
                                <h1>
                                    <span className="cur-symbol">{getSymbol(fromCurrency)}</span>
                                    <input type="text" placeholder='0' value={fromValue} onChange={e => {
                                        const amount = e.target.value;
                                        setFromValue(amount);
                                        setToValue(nilaiExchange(amount));
                                    }} className="no-border" style={{width:'60%'}} />
                                </h1>
                            </div>
                            
                        </Grid.Column>
                        
                        <Grid.Column width={ isMobile ? 16 : 2 }>
                            <Button circular className="huge" color='twitter' icon={<Icon name='exchange' />} onClick={switchCurrency} />
                        </Grid.Column>
                        
                        <Grid.Column width={ isMobile ? 16 : 7 }>
                            <div className="label">
                                <p>To:</p>
                            </div>
                            <div>
                                <Dropdown
                                    placeholder='Select Country'
                                    fluid
                                    search
                                    selection
                                    value={toCurrency}
                                    onChange={(e, data)=>{return changeToCurrency(data.value)}}
                                    options={country}
                                />              
                            </div>
                            <div className="text-exchange">
                                <h1>
                                    <span className="cur-symbol">{getSymbol(toCurrency)}</span>
                                    <NumberFormat value={toValue.toFixed(2)} displayType={'text'} thousandSeparator={true} />
                                </h1>
                            </div>
                            
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </Container>
    );
}
 
export default CurrencyConverter;