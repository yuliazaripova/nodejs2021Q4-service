import { ITask } from "../models/TaskDTO";
import { IUser, IUserResponse } from "../models/UserDTO";

export const omitPassword = (user: IUser): IUserResponse => {
    const { password, ..._user } = user
    return _user
}


export function mutationFilter(arr: ITask[], cb: (task: ITask) => boolean) {
  for (let l = arr.length - 1; l >= 0; l -= 1) {
    if (!cb(arr[l])) arr.splice(l, 1);
  }
}
