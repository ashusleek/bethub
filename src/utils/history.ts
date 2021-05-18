import { createBrowserHistory } from 'history';
import queryString from 'query-string';
const history = createBrowserHistory();

export const buyerSearch = query => {
  const mode = history.location.pathname.includes('search') ? 'replace' : 'push';
  history[mode]({
    pathname: '/buyer/opportunity/search',
    search: '?' + queryString.stringify(query)
  });
};

export default history;
