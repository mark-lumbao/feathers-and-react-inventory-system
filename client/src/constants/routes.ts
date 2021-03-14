/**
 * Public Routes
 * prefix: /
 */
export const HOME = '/';
export const LOGIN = '/login';
export const REQUEST_RESET_PASSWORD = '/request-reset-password';
export const RESET = '/reset/:token';

/**
 * Authenticated Dashboard Routes
 * prefix: /dashboard/
 */
export const AUTH_DASHBOARD = '/dashboard';
export const AUTH_DASHBOARD_PRODUCTS = '/dashboard/products';
export const AUTH_DASHBOARD_CLIENTS = '/dashboard/clients';
export const AUTH_DASHBOARD_USERS = '/dashboard/users';
export const AUTH_DASHBOARD_AGENTS = '/dashboard/agents';
export const AUTH_DASHBOARD_SALES = '/dashboard/sales';

/**
 * Authenticated Add Record Form Routes
 * prefix: /dashboard/add-{record-type}
 */
export const FORM_ADD_TRANSACTION = '/dashboard/add-transaction';
export const FORM_ADD_CLIENT = '/dashboard/add-client';
export const FORM_ADD_PRODUCT = '/dashboard/add-product';
export const FORM_ADD_USER = '/dashboard/add-user';
export const FORM_ADD_AGENT = '/dashboard/add-agent';

/**
 * Authenticated UPDATE Record Form Routes
 * prefix: /dashboard/update-{record-type}
 */
export const FORM_UPDATE_TRANSACTION = '/dashboard/update-transaction/:id';
export const FORM_UPDATE_CLIENT = '/dashboard/update-client/:id';
export const FORM_UPDATE_PRODUCT = '/dashboard/update-product/:id';
export const FORM_UPDATE_USER = '/dashboard/update-user/:id';
export const FORM_UPDATE_AGENT = '/dashboard/update-agent/:id';

/**
 * Transaction Preview Route
 */
export const PREVIEW_TRANSACTION = '/dashboard/transaction/:id';

/**
 * API ROUTES
 * prefix: /api/
 */
export const API_LOGIN = '/api/authentication';
export const API_USERS = '/api/users';
export const API_AGENTS = '/api/agents';
export const API_TRANSACTIONS = '/api/transactions';
export const API_PRODUCTS = '/api/products';
export const API_CLIENTS = '/api/clients';
export const API_REQUEST_RESET = 'api/request-password-reset';
export const API_RESET = 'api/reset-password';
export const API_SALES = 'api/monthly-sales';
