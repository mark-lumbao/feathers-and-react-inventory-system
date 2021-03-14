import path from 'path';
import compress from 'compression';
import helmet from 'helmet';
import cors from 'cors';

import feathers from '@feathersjs/feathers';
import configuration from '@feathersjs/configuration';
import express from '@feathersjs/express';
import socketio from '@feathersjs/socketio';

import { Application } from './declarations';
import logger from './logger';
import middleware from './middleware';
import services from './services';
import appHooks from './app.hooks';
import channels from './channels';
import authentication from './authentication';
import mongoose from './mongoose';
import expressStaticGzip from 'express-static-gzip';
// Don't remove this comment. It's needed to format import lines nicely.

const app: Application = express(feathers());

const publicReactDir = path.join(process.cwd(), '/public/react');

console.log(publicReactDir);

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Host the public folder
app.use(expressStaticGzip(publicReactDir, {
  enableBrotli: true,
  orderPreference: ['br'],
}));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

app.configure(mongoose);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
app.get('*',
  (_req, res) =>
    res.sendFile(path.join(process.cwd(), '/public/react/index.html'))
);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger } as any));

app.hooks(appHooks);

export default app;
