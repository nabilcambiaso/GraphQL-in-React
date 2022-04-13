import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import DisplayData from './DisplayData';

function App() {

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:4000/graphql'
  })

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header >
          <h1>
            Users list
          </h1>
          <DisplayData></DisplayData>
        </header>

      </div>
    </ApolloProvider>
  );
}

export default App;
