import { RootAction } from 'actions';

declare module 'typesafe-actions' {
  interface Types {
    RootAction: RootAction;
  }
}
