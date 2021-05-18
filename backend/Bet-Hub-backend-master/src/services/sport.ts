import { Service, Inject } from 'typedi';
import _ from 'underscore';

import config from 'config';
import { axiosRequest } from 'helpers/common';
import { StatusCodes } from 'http-status-codes';

@Service()
export default class AuthService {
  constructor(@Inject('logger') private logger, @Inject('userModel') private userModel: Models.UserModel) {}

  public async GetSports(): Promise<{ sports: [] }> {
    try {
      this.logger.silly('Getting all sports');
      // const url = `https://sportsbook.fanduel.com/cache/psmg/UK/63747.3.json`,
      const url = `https://api.the-odds-api.com/v3/sports?apiKey=${config.sportApiKey}`,
        { data, status } = await axiosRequest({ url, method: 'GET' });
      return {
        sports: _.sortBy(data.data, function(o) {
          return o?.title;
        }),
      };
    } catch (e) {
      throw e;
    }
  }

  public async GetSportEvents(sports: string[], region: string): Promise<any> {
    try {
      this.logger.silly(`Getting events of ${sports} in region: ${region}`);
      const sports_urls = {},
        promises = [],
        structuredEvents: any = [],
        sitesToPick = ['fanduel', 'betmgm', 'draftkings', 'williamhill_us'];

      sports.forEach(sport => {
        sports_urls[sport] = [
          {
            route: `https://api.the-odds-api.com/v3/odds/?sport=${sport}&region=${region}&apiKey=${config.sportApiKey}&mkt=totals`,
            mkt: 'totals',
          },
          {
            route: `https://api.the-odds-api.com/v3/odds/?sport=${sport}&region=${region}&apiKey=${config.sportApiKey}&mkt=spreads`,
            mkt: 'spreads',
          },
        ];
      });

      Object.keys(sports_urls).forEach((sport: any) => {
        sports_urls[sport].forEach(url => {
          promises.push(
            new Promise(async (resolve, reject) => {
              let events = await axiosRequest({ url: url.route, method: 'GET' });
              if (events.status === StatusCodes.OK) {
                events.data.data.forEach(event => {
                  const foundIndex = structuredEvents.findIndex(ev => ev.id === event.id && ev.sport_key === event.sport_key);
                  if (foundIndex === -1) {
                    // if event doesn't exist
                    const event_params = _.pick(
                      event,
                      'id',
                      'home_team',
                      'commence_time',
                      'sites_count',
                      'sport_key',
                      'sport_nice',
                      'teams',
                    );
                    event.sites.forEach(site => {
                      if (sitesToPick.includes(site.site_key)) {
                        site.odds[url.mkt].points.forEach((point, index) => {
                          if (!event._teams?.[index]?.[url.mkt]?.[site.site_key]?.site_key) {
                            if (!event_params._teams) event_params._teams = {};
                            if (!event_params._teams[event.teams[index]]?.[url.mkt]) {
                              event_params._teams[event.teams[index]] = {
                                team_name: event.teams[index],
                                [url.mkt]: {
                                  [site.site_key]: {
                                    site_key: site.site_key,
                                    site_nice: site.site_nice,
                                    point,
                                  },
                                },
                              };
                            } else {
                              event_params._teams[event.teams[index]][url.mkt] = {
                                ...event_params._teams[event.teams[index]][url.mkt],
                                [site.site_key]: {
                                  site_key: site.site_key,
                                  site_nice: site.site_nice,
                                  point,
                                },
                              };
                            }
                          }
                        });
                      }
                    });
                    if (event_params._teams) {
                      structuredEvents.push(event_params);
                    }
                  } else {
                    event.sites.forEach(site => {
                      if (sitesToPick.includes(site.site_key)) {
                        site.odds[url.mkt].points.forEach((point, index) => {
                          if (!structuredEvents[foundIndex]._teams?.[event.teams[index]]?.[url.mkt]) {
                            if (!structuredEvents[foundIndex]._teams)
                              structuredEvents[foundIndex]._teams = { team_name: event.teams[index] };
                            if (!structuredEvents[foundIndex]._teams[event.teams[index]])
                              structuredEvents[foundIndex]._teams[event.teams[index]] = {};
                            structuredEvents[foundIndex]._teams[event.teams[index]][url.mkt] = {
                              [site.site_key]: {
                                site_key: site.site_key,
                                site_nice: site.site_nice,
                                point,
                              },
                            };
                          } else {
                            structuredEvents[foundIndex]._teams[event.teams[index]][url.mkt] = {
                              ...structuredEvents[foundIndex]._teams[event.teams[index]][url.mkt],
                              [site.site_key]: {
                                site_key: site.site_key,
                                site_nice: site.site_nice,
                                point,
                              },
                            };
                          }
                        });
                      }
                    });
                  }
                });
                resolve('Data fetched');
              } else reject(new Error('Request failed :('));
            }),
          );
        });
      });
      await Promise.all(promises);

      // sorting w.r.t entered sports
      let sortedEvents = [];
      sports.forEach(sport => {
        const filteredEvents = structuredEvents.filter(se => se.sport_key === sport);
        sortedEvents = [...sortedEvents, ...filteredEvents];
      });
      return sortedEvents;
    } catch (e) {
      throw e;
    }
  }
}
