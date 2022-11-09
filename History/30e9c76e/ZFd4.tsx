import {gql} from '@apollo/client';
import {buildClientSchema, buildSchema} from 'graphql';

export const LOAD_SESSIONS = gql`
  query LoadSessions {
    Sessiones {
      photo
      email
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
  mutation AddUser($createSessionsMyval: UsersInput!) {
    createSessions(myval: $createSessionsMyval) {
      email
      birthday
      random_code
      photo
    }
  }
`;

export const COMPROBATION_SESSIONS = gql`
  query ComprobationSessions($token: String!) {
    comprobationUser(token: $token)
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    Categories {
      category_id
      category_name
    }
  }
`;

export const ADD_PRODUCTO = gql`
  mutation AddProducto($createproduct: ProductsInput!) {
    createproduct(myval: $createproduct) {
      product_id
    }
  }
`;

export const GET_PRODUCTO = gql`
  query Get_Producto {
    Products {
      brand
      description
      price
      old_price
      product_id
      product_name
      quantity
    }
  }
`;
