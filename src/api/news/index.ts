import getRoute from 'api/apiRoutes';
import { API } from 'api';
import { News } from 'config/interfaces';

class NewsApi extends API {
  createNews = (news: News): Promise<any> => {
    const route = getRoute('newsAddUpdate');
    return this.postRequest(route, news);
  };

  getNews = (filter): Promise<any> => {
    const route = getRoute('newsList');
    return this.postRequest(route, filter);
  };

  updateNews = (news: News): Promise<any> => {
    const route = getRoute('newsAddUpdate');
    return this.patchRequest(route, news);
  };

  deleteNews = (id): Promise<any> => {
    const route = getRoute('newsGetDelete', { id });
    return this.deleteRequest(route);
  };
}

export default new NewsApi();
