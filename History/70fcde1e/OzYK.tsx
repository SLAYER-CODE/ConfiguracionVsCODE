

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LoadSessions
// ====================================================

export interface LoadSessions_Sessiones_phone_id {
  phone_id: string | null;
  phone_number: string | null;
  country_code: string;
}

export interface LoadSessions_Sessiones_shoppingCardt_id {
  shoppingCardt_id: string;
}

export interface LoadSessions_Sessiones_wish_id {
  wish_id: string;
}

export interface LoadSessions_Sessiones {
  photo: string;
  email: string;
  username: string | null;
  random_code: number | null;
  phone_id: LoadSessions_Sessiones_phone_id | null;
  shoppingCardt_id: LoadSessions_Sessiones_shoppingCardt_id | null;
  wish_id: LoadSessions_Sessiones_wish_id | null;
}

export interface LoadSessions {
  Sessiones: LoadSessions_Sessiones[];
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddUser
// ====================================================

export interface AddUser_createSessions {
  email: string;
  birthday: any;
  random_code: number | null;
  photo: string;
}

export interface AddUser {
  createSessions: AddUser_createSessions;
}

export interface AddUserVariables {
  createSessionsMyval: UsersInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ComprobationSessions
// ====================================================

export interface ComprobationSessions {
  comprobationUser: boolean;
}

export interface ComprobationSessionsVariables {
  token: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCategories
// ====================================================

export interface GetCategories_Categories {
  category_id: string;
  category_name: string;
}

export interface GetCategories {
  Categories: GetCategories_Categories[];
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddProducto
// ====================================================

export interface AddProducto_createproduct {
  product_id: string;
}

export interface AddProducto {
  createproduct: AddProducto_createproduct;
}

export interface AddProductoVariables {
  createproduct: ProductsInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Get_Producto
// ====================================================

export interface Get_Producto_Products {
  brand: string;
  description: string;
  old_price: number | null;
  product_id: string;
  product_name: string;
  quantity: number;
}

export interface Get_Producto {
  Products: Get_Producto_Products[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

// null
export interface UsersInput {
  user_id?: number | null;
  uid: string;
  email: string;
  birthday: any;
  photo?: string | null;
  random_code?: number | null;
  username?: string | null;
}

// null
export interface ProductsInput {
  product_name: string;
  old_price: number;
  price: number;
  description?: string | null;
  brand: string;
  quantity: number;
  category_products: CategoriesInput[];
}

// null
export interface CategoriesInput {
  id?: number | null;
  category_name: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================