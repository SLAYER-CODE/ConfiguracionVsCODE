import {gql} from '@apollo/client';

export const LOAD_SESSIONS = gql`
  query {
    Sessiones {
      picture
      email
      lastname
      name
      password
      username
      random_code
      phone_id {
        phone_id
        phone_number
        country_code
      }
      shoppingCardt_id {
        shoppingCardt_id
      }

      wish_id {
        wish_id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation ($createSessionsMyval: UsersInput!) {
    createSessions(myval: $createSessionsMyval) {
      email
      lastname
      name
      password
      birthday
      random_code
      picture
      username
    }
  }
`;
export const COMPROBATION_SESSIONS = gql`
  query ($token: String!) {
    comprobationUser(token: $token)
  }
`;

export const GET_CATEGORIES = gql`
  query {
    Categories {
      category_id
      category_name
    }
  }
`;

export const ADD_PRODUCTO = gql`
  mutation ($createproduct: ProductsInput!) {
    createproduct(myval: $createproduct) {
      product_id
    }
  }
`;

export const GET_PRODUCTO = gql`
  query {
    Products {
      brand
      description
      old_price
      price
      product_id
      product_name
      quantity
    }
  }
`;
