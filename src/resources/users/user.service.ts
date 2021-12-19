import { v4 as uuidv4 } from 'uuid';
import { omitPassword } from '../../common/utils';
import users from './users.db';
import tasks from '../tasks/tasks.db';
import { IUser, IUserResponse } from '../../models/UserDTO';

/**
 * Returns all users array
 * @returns Promise with all users array without passwords
 */
export function getAll(): Promise<IUserResponse[]> {
  return new Promise((resolve) => {
    const _users = users.map(i => omitPassword(i));
    resolve(_users);
  });
}

/**
 * Find the user by id
 * @param id string with user id
 * @returns Promise<undefind> if user was not found or Promise with found user without password
 */
export const findById = (id: string): Promise<IUserResponse | undefined> => 
   new Promise((resolve) => {
    const user = users.find((_user) => _user.id === id);
    const _user = user && omitPassword(user)
    resolve(_user);
  })

/**
 * Create new user
 * @param user IUser object with user data
 * @returns Promise with created user without password
 */
export function createUser(user: IUser): Promise<IUserResponse> {
  return new Promise((resolve) => {
    const newUser = { ...user, id: uuidv4() };
    users.push(newUser);
    resolve(omitPassword(newUser));
  });
}

/**
 * Update the user by id
 * @param id string with user id
 * @param user IUser object with board data
 * @returns Promise with updated user without password
 */
export function updateUser(id: string, user: IUser): Promise<IUserResponse> {
  return new Promise((resolve) => {
    const index = users.findIndex((_user) => _user.id === id);
    users[index] = { ...user, id };

    resolve(omitPassword(users[index]));
  });
}

/**
 * Delete the user by id and all user's tasks
 * @param id string with user id
 * @returns Promise<void>
 */
export function deleteUser(id: string): Promise<void> {
  return new Promise((resolve) => {
    const index = users.findIndex((i) => i.id === id);
  
    if (index > -1) {
      users.splice(index, 1);
    }
    tasks.forEach((_task, ind) => {
      if (tasks[ind].userId === id) {
        tasks[ind].userId = null;
      } 
    })
    resolve();
  });
}

