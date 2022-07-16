import { useParams, Route } from "react-router";
import { Link, useRouteMatch } from "react-router-dom";
import { useEffect } from "react";

import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";


const QuotesDetails = () => {
  const match = useRouteMatch();
  const params = useParams();
  const{quoteId} = params;
  const{sendRequest, status, data:loadedQuote, error}=useHttp(getSingleQuote, true);

  useEffect(()=>{
    sendRequest(quoteId);  
  }, [sendRequest,quoteId])
  if(status==="pending"){
    return <div className="centered">
      <LoadingSpinner/>
    </div>
  }
  if(error){
    return <div className="centered">
      <p>{error}</p>
    </div>
  }
  if(!loadedQuote.text){
    return <div className="centered">
      <p>No Quote  Found</p>
    </div>
  }



  return (
    <>
      <h1>Details Page</h1>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      
      <Route path={`${match.path}`} exact>

      <div className="centered">
        <Link className="btn--flat" to={`${match.url}/comments`}>
          Load Comments
        </Link>
      </div>
      </Route>

      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </>
  );
};

export default QuotesDetails;
