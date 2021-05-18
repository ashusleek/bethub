export const app = {
  common: {}
};

export const company = {
  list: [],
  files: { list: [] },
  suggestions: { list: [] }
};

export const landing = {
  loading: false
};

export const auth = {
  userState: {},
  showChangePassword: false
};

export const user = {
  showEditInfo: false,
  showAdminInfo: false,
  current: {},
  list: [],
  stats: [],
  note: '',
  targetedUser: {
    user: {},
    note: []
  }
};

export const news = {
  list: []
};

export const sports = {
  list: [],
  activeSports: [],
  activeSportsEvents: [],
  activeEvents: {
    page: 0,
    limit: 5,
    list: []
  }
};
