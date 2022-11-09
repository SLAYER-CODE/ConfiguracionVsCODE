import {gql} from '@apollo/client';
import {buildClientSchema, buildSchema} from 'graphql';

export const LOAD_SESSIONS = gql`
  query LOAD_SESSIONS {
    Sessiones {
      picture
      email
      lastname
      Name
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
  mutation ADD_USER($createSessionsMyval: UsersInput!) {
    createSessions(myval: $createSessionsMyval) {
      email
      birthday
      random_code
      photo
    }
  }
`;

export const COMPROBATION_SESSIONS = gql`
  query COMPROBATION_SESSIONS($token: String!) {
    comprobationUser(token: $token)
  }
`;

export const GET_CATEGORIES = gql`
  query GET_CATEGORIES {
    Categories {
      category_id
      category_name
    }
  }
`;

export const ADD_PRODUCTO = gql`
  mutation ADD_PRODUCTO($createproduct: ProductsInput!) {
    createproduct(myval: $createproduct) {
      product_id
    }
  }
`;

export const GET_PRODUCTO = gql`
  query GET_PRODUCTO {
    Products {
      brand
      description
      old_price
      product_id
      product_name
      quantity
    }
  }
`;
