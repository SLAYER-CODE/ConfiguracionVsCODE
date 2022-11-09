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

export const ADD_RELATION_SERVICE = gql`
  mutation AddRelationService($myval:Int!){
    AgregateRelationService(service_id: $myval)
  }
`;



export const GET_LOCATION_SERVICES = gql`
  query Get_Location_Services {
    GpsServices {
      gpsService_id
      latitud
      longitud
      gps_relation {
        product_name
      }
    }
  }
`;

export const GET_SERVICE_LOCATION= gql`
query Get_Service_Location {
  Products {
    product_name
    price_unity
    gps_relation {
      latitud
      longitud
    }
  }
}
`;
export const GET_PRODUCTO = gql`
  query Get_Producto {
    Products {
      description
      old_price
      product_id
      product_name
      brands_products {
        brand_name
      }
      category_products {
        category_name
      }
      image_realation {
        image_name
        image_description
      }
      user_relation {
        email
      }
    }
  }
`;
export const GET_PRODUCTO_PROFILE = gql`
  query Get_Producto_Profile {
    ProductsProfile {
      description
      old_price
      product_id
      product_name
      price_unity
      brands_products {
        brand_name
      }
      category_products {
        category_name
      }
      image_realation {
        image_name
        image_description
      }
    }
  }
`;
