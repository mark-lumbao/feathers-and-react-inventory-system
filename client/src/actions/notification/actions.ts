import { action } from 'typesafe-actions';
import { OptionsObject } from 'notistack';
import * as TYPES from './types';

export interface notificationProps {
  message: string;
  options?: OptionsObject;
}

export type NotificationStateProps = notificationProps[];

export const addNotification = (payload: notificationProps) => action(
  TYPES.ADD_NOTIFICATION,
  payload,
);
