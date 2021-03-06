import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client"
import {BrowserRouter as Router} from 'react-router-dom'

 const client = new ApolloClient({
   uri: "https://rickandmortyapi.com/graphql",
   cache: new InMemoryCache() 
 }) 

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
