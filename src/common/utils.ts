import { ITask } from "../models/TaskDTO";
import { IUser, IUserResponse } from "../models/UserDTO";

/**
 * Returns the object with the user data without password
 * @param user IUser object containing the user data
 * @returns IUserResponse object containing the user data without password field
 */

export const omitPassword = (user: IUser): IUserResponse => {
    const { password, ..._user } = user
    return _user
}

/**
 * Mutate original array with callback
 * @param arr array of ITask objects
 * @param cb function with ITask argument that will be apply to filter arr param
 * @returns undefined
 */

export function mutationFilter(arr: ITask[], cb: (task: ITask) => boolean) {
  for (let l = arr.length - 1; l >= 0; l -= 1) {
    if (!cb(arr[l])) arr.splice(l, 1);
  }
}
