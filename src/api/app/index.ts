import { API } from 'api';
import getRoute from 'api/apiRoutes';

class AppApi extends API {
  getStats = (): Promise<any> => {
    const route = getRoute('getStats');
    return this.fetch(route);
  };
}

export default new AppApi();
