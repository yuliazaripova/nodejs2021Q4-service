import { v4 as uuidv4 } from 'uuid';
import { omitPassword } from '../../common/utils';
import users from './users.db';
import tasks from '../tasks/tasks.db';
import { IUser, IUserResponse } from '../../models/UserDTO';

export function getAll(): Promise<IUserResponse[] | undefined> {
  return new Promise((resolve) => {
    const _users = users.map(i => omitPassword(i));
    if (_users) {
      resolve(_users);
    }
    
  });
}

export const findById = (id: string): Promise<IUserResponse | undefined> => 
  // const user = users.find((_user) => _user.id === id);
  // return omitPassword(user);
   new Promise((resolve) => {
    const user = users.find((_user) => _user.id === id);
    const _user = user && omitPassword(user)
    resolve(_user);
  })


export function createUser(user: IUser): Promise<IUserResponse> {
  return new Promise((resolve) => {
    const newUser = { ...user, id: uuidv4() };
    users.push(newUser);
    resolve(omitPassword(newUser));
  });
}

export function updateUser(id: string, user: IUser): Promise<IUserResponse> {
  return new Promise((resolve) => {
    const index = users.findIndex((_user) => _user.id === id);
    users[index] = { ...user, id };

    resolve(omitPassword(users[index]));
  });
}

export function deleteUser(id: string): Promise<void> {
  return new Promise((resolve) => {
    const index = users.findIndex((i) => i.id === id);
  
    if (index > -1) {
      users.splice(index, 1);
    }
    tasks.forEach((task, ind) => {
      if (tasks[ind].userId === id) {
        tasks[ind].userId = null;
      } 
    })
    resolve();
  });
}

