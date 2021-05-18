import getRoute from 'api/apiRoutes';
import { API } from 'api';

class UserApi extends API {
  userInfo = (): Promise<any> => {
    const route = getRoute('userInfo');
    return this.fetch(route);
  };

  getUsers = (filter): Promise<any> => {
    const route = getRoute('userList', { filter });
    return this.postRequest(route, filter);
  };

  createUser = (user): Promise<any> => {
    const route = getRoute('userAddUpdate');
    return this.postRequest(route, user);
  };

  updateUser = (user): Promise<any> => {
    const route = getRoute('userAddUpdate');
    return this.patchRequest(route, user);
  };

  deleteUser = (id: string): Promise<any> => {
    const route = getRoute('userGetDelete', { id });
    return this.deleteRequest(route);
  };

  changePassword = (userInfo): Promise<any> => {
    const route = getRoute('changePassword');
    return this.patchRequest(route, userInfo);
  };
}

export default new UserApi();
