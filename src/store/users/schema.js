import { Schema, arrayOf } from 'normalizr';

export const user = new Schema('users');
export const arrayOfUsers = arrayOf(user);
