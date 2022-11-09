import { ApolloClient, InMemoryCache, createHttpLink, from, HttpLink } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { Alert } from 'react-native'
import { setContext } from '@apollo/client/link/context';
import auth from '@react-native-firebase/auth';

const errorLink = onError(({ graphQLErrors, networkError }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
    if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) => {
            console.log("Ubo un error de Grapql :" + message)
        })
    }
})


const httpLink = createHttpLink({
    uri: "https://documentworkservices.loca.lt/graphql"
});

const authLink = setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = await auth().currentUser?.getIdToken()
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});


// const link = from([
//     errorLink,
//     new HttpLink({ uri: "http://192.168.0.13:2016/graphql" })
// ])

export const appclient = new ApolloClient({
    cache: new InMemoryCache(),
    link:authLink.concat(httpLink),
});

