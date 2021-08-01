import '../styles/globals.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

let graphqlUri = 'https://nodebucket2-api.herokuapp.com/graphql';

const client = new ApolloClient({ uri: graphqlUri });

export default function MyApp({ Component, pageProps }) {
  return (
  <ApolloProvider client={client}>
    <div>
      <Component {...pageProps} />
    </div>
  </ApolloProvider>
  );
}