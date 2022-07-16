import { useEffect } from 'react';
import { useHistory } from 'react-router';

import QuoteForm from '../components/quotes/QuoteForm';
import useHttp from '../hooks/use-http';
import {addQuote} from '../lib/api';

const NewQuotes = ()=>{
    const {sendRequest, status}=useHttp(addQuote);
    const history = useHistory();
    useEffect(() => {
        if(status==='completed'){
            history.push('/quotes'); //go back allow
        }
    }, [status, history])
    const addQuoteHandler = quoteData =>{
        
       
        sendRequest(quoteData);
       // history.replace();
    }
    return <QuoteForm  isLoading={status==="pending"} onAddQuote={addQuoteHandler} />
};

export default NewQuotes;