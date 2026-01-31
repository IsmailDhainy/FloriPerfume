import { UserRole } from "../enums/auth";

export default class PATHS {
  //dashboard
  static readonly SIGNUP = "/signup";
  static readonly FORGOT_PASSWORD = "/forgot-password";
  static readonly RESET_PASSWORD = "/reset-password";
  static readonly TRACK_ORDER = "/track-order";
  static readonly PROFILE = "/profile";

  static readonly DASHBOARD_ROOT = "/dashboard";

  static readonly USERS = `${PATHS.DASHBOARD_ROOT}/user`;
  static readonly CREATE_USER_FORM = `${PATHS.DASHBOARD_ROOT}/user-form`;
  static readonly EdIT_USER_FORM = `${PATHS.DASHBOARD_ROOT}/user/:id`;

  static readonly CLIENTS = `${PATHS.DASHBOARD_ROOT}/clients`;
  static readonly CLIENTS_ORDERS = `${PATHS.DASHBOARD_ROOT}/clients/orders/:id`;

  static readonly CATEGORIES = `${PATHS.DASHBOARD_ROOT}/category`;

  static readonly CREATE_CATEGORY_FORM = `${PATHS.DASHBOARD_ROOT}/category-form`;
  static readonly CATEGORY_DETAILS = `${PATHS.DASHBOARD_ROOT}/category/:id`;

  static readonly CURRENCIES = `${PATHS.DASHBOARD_ROOT}/currency`;
  static readonly CURRENCY_DETAILS = `${PATHS.DASHBOARD_ROOT}/currency/:id`;
  static readonly CREATE_CURRENCY = `${PATHS.DASHBOARD_ROOT}/currency-form`;

  static readonly CONTACT = `${PATHS.DASHBOARD_ROOT}/contact`;
  static readonly CONTACT_DETAILS = `${PATHS.DASHBOARD_ROOT}/contact/:id`;

  static readonly PRODUCTS = `${PATHS.DASHBOARD_ROOT}/product`;
  static readonly PRODUCT_DETAILS = `${PATHS.DASHBOARD_ROOT}/product/:id`;
  static readonly CREATE_PRODUCT = `${PATHS.DASHBOARD_ROOT}/product-form`;

  static readonly ORDERS = `${PATHS.DASHBOARD_ROOT}/order`;
  static readonly ORDER_DETAILS = `${PATHS.DASHBOARD_ROOT}/order/:id`;

  static readonly BRANDS = `${PATHS.DASHBOARD_ROOT}/brand`;
  static readonly BRAND_DETAILS = `${PATHS.DASHBOARD_ROOT}/brand/:id`;
  static readonly CREATE_BRAND = `${PATHS.DASHBOARD_ROOT}/brand-form`;

  static readonly SLIDERS = `${PATHS.DASHBOARD_ROOT}/slider`;
  static readonly SLIDER_DETAILS = `${PATHS.DASHBOARD_ROOT}/slider/:id`;
  static readonly CREATE_SLIDER = `${PATHS.DASHBOARD_ROOT}/slider-form`;

  static readonly EDIT_SETTINGS = `${PATHS.DASHBOARD_ROOT}/settings/edit`;

  // Designed Website Routes
  static readonly HOME = "/";
  static readonly ALLPRODUCTS = "/all-products";
  static readonly ALLCATEGORIES = "/all-categories";
  static readonly PRODUCTDETAIL = "/product-detail/:id";
  static readonly ORDERDETAIL = "/order-detail/:id";
  static readonly CART = "/cart";
  static readonly CHECKOUT = "/checkout";
  static readonly WHISLIST = "/whislist";
  static readonly MYACCOUNT = "/my-account";
  static readonly MYORDER = "/my-order";
  static readonly MYADDRESS = "/my-address";
  static readonly CLIENTLOGIN = "/login";
  static readonly CLIENTREGISTER = "/register";
  static readonly TERMSANDCONDITION = "/terms-condition";
  static readonly PRIVACYPOLICY = "/privacy-policy";
  static readonly CONTACTFORM = "/contact";
}
export type PathsKeys = keyof typeof PATHS;
export type PathsValues = (typeof PATHS)[PathsKeys];
export const roleDefaultRootRoutes: Record<UserRole, string> = {
  ADMIN: PATHS.CLIENTLOGIN,
  SUPER_ADMIN: PATHS.CLIENTLOGIN,
  CLIENT: PATHS.CLIENTLOGIN,
};
