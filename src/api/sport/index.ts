import getRoute from 'api/apiRoutes';
import { API } from 'api';

class SportApi extends API {
  getSports = (): Promise<any> => {
    const route = getRoute('getSports');
    return this.fetch(route);
  };

  getSportEvents = (sports: string[], region: string): Promise<any> => {
    const route = getRoute('getSportEvents');
    return this.postRequest(route, { sports, region });
  };
}

export default new SportApi();
