import React, { useState, useContext, useEffect } from 'react';
import { GeneralContext } from '../contexts/GeneralContext';
import NumberFormat from 'react-number-format';
import { 
    Grid, 
    Icon, 
    Segment, 
    Dropdown, 
    Button, 
    Header } from 'semantic-ui-react';
import { CurrencyOptions } from './CurrencyOptions';

const CurrencyConverter = () => {

    const [ country, setCountry ] = useState(CurrencyOptions);

    const { exchangeRate, searchExchangeRate } = useContext(GeneralContext);

    const [ rate, setRate ] = useState(1);

    const [ fromCurrency, setFromCurrency ] = useState('USD');

    const [ toCurrency, setToCurrency ] = useState('IDR');

    const changeFromCurrency = (from) => {
        setFromCurrency(from);
        searchExchangeRate(from, toCurrency);
    }

    const changeToCurrency = (to) => {
        setToCurrency(to);
        searchExchangeRate(fromCurrency, to);
    }

    const nilaiExchange = () => {
        let nilai = 0;
        nilai = rate*exchangeRate;

        return nilai;
    }

    useEffect(() => {
       console.log(country);
    })

    return (
        <Segment placeholder>
             <Header as='h2'>
                {/* <Icon name='dollar sign' /> */}
                <Header.Content>
                    Currency Converter
                <Header.Subheader>{new Date().toLocaleString()}</Header.Subheader>
                </Header.Content>
            </Header>
            <Grid verticalAlign='middle'>
                <Grid.Row>
                    <Grid.Column width={7}>
                        <div className="ui left aligned basic segment">From:</div>
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
                        
                        <h1><NumberFormat value={rate} displayType={'text'} thousandSeparator={true}/></h1>
                        
                    </Grid.Column>
                    
                    <Grid.Column width={2}>
                        <Button circular color='twitter' icon={<Icon disabled name='exchange' />} />
                    </Grid.Column>
                    
                    <Grid.Column width={7}>
                        <div className="ui left aligned basic segment">To:</div>
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
                        
                        <h1><NumberFormat value={nilaiExchange()} displayType={'text'} thousandSeparator={true} /></h1>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            
        
        </Segment>
        
    );
}
 
export default CurrencyConverter;