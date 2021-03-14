import axios from 'axios';
import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import { store } from 'providers/redux';
import actions from 'actions';
import * as ROUTES from '../constants/routes';

/**
 * Feathers rest client configuration
 */

const app = feathers();

const hostUrl = process.env.NODE_ENV === 'development'
  ? `http://${process.env.HOST}:${process.env.PORT}`
  : process.env.HOST;

const restClient = rest(hostUrl);

const api = axios.create({
});

api.interceptors.request.use((req) => {
  req.headers.authorization = store.getState().auth.accessToken;
  return req;
});

api.interceptors.response.use(null, (err) => {
  if (err.response.data.code === 401) store.dispatch(actions.auth.signout());
  return Promise.reject(err);
});

app.configure(restClient.axios(api));

export const authenticationService = app.service(ROUTES.API_LOGIN);
export const transactionsService = app.service(ROUTES.API_TRANSACTIONS);
export const clientsService = app.service(ROUTES.API_CLIENTS);
export const usersService = app.service(ROUTES.API_USERS);
export const agentsService = app.service(ROUTES.API_AGENTS);
export const productsService = app.service(ROUTES.API_PRODUCTS);
export const requestResetService = app.service(ROUTES.API_REQUEST_RESET);
export const salesService = app.service(ROUTES.API_SALES);
export const resetPasswordService = (token: string) => app.service(`${ROUTES.API_RESET}/${token}`);
