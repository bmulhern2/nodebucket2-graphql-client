import { ApolloClient, InMemoryCache } from '@apollo/client';

let graphqlUri = 'https://nodebucket2-api.herokuapp.com/graphql';

const client = new ApolloClient({ 
    uri: graphqlUri, 
    cache: new InMemoryCache(), 
});

export default client;
