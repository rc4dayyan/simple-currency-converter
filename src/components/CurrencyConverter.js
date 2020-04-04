import React, { useState, useContext, useEffect } from 'react';
import { GeneralContext } from '../contexts/GeneralContext';
import NumberFormat from 'react-number-format';
import { 
    Grid, 
    Icon, 
    Segment, 
    Dropdown, 
    Button, 
    Header,
    Input } from 'semantic-ui-react';
import { CurrencyOptions } from './CurrencyOptions';

const CurrencyConverter = () => {

    const [ country, setCountry ] = useState(CurrencyOptions);

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

    const nilaiExchange = (rate = fromValue) => {
        let nilai = 0;
        nilai = rate*exchangeRate;

        return nilai;
    }

    useEffect(() => {
        setToValue(nilaiExchange());
    },[exchangeRate])

    return (
        <Segment placeholder>
             <Header as='h2'>
                <Header.Content>
                    Currency Converter
                <Header.Subheader>{new Date().toLocaleString()}</Header.Subheader>
                </Header.Content>
            </Header>
            <Grid verticalAlign='middle'>
                <Grid.Row>
                    <Grid.Column width={7}>
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
                                <input type="text" placeholder='0' value={fromValue} onChange={e => {
                                    const amount = e.target.value;
                                    setFromValue(amount);
                                    setToValue(nilaiExchange(amount));
                                }} className="no-border" />
                            </h1>
                        </div>
                        
                    </Grid.Column>
                    
                    <Grid.Column width={2}>
                        <Button circular className="huge" color='twitter' icon={<Icon name='exchange' />} />
                    </Grid.Column>
                    
                    <Grid.Column width={7}>
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
                                <span>{country.key}</span>
                                <NumberFormat value={toValue} displayType={'text'} thousandSeparator={true} />
                            </h1>
                        </div>
                        
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            
        
        </Segment>
        
    );
}
 
export default CurrencyConverter;