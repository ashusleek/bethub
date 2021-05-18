import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { bindActionCreators } from 'redux';
import { deleteNewsAction, getNewsAction, createNewsAction, updateNewsAction } from 'state/actions/news';
import NewsTable from 'components/Dashboard/Admin/NewsTable';
import News from 'components/Dashboard/News';
import AddEditNews from 'components/Dashboard/Admin/Forms/AddEditNews';
import { setReduxKey } from 'state/actions/app';

/* -------------------------------------------------------------------------- */
/*                               Admin/NewsTable                              */
/* -------------------------------------------------------------------------- */

/* -------------------------------- NewsTable ------------------------------- */

const newsTableProps = state => ({
  news: state.news,
  showNewsModal: state.app.common.showNewsModal
});

function newsTableDispatch(dispatch: Dispatch) {
  return bindActionCreators(
    {
      getNewsAction: getNewsAction.STARTED,
      deleteNewsAction: deleteNewsAction.STARTED,
      setReduxKey
    },
    dispatch
  );
}
export const NewsTableContainer = connect(newsTableProps, newsTableDispatch)(NewsTable);

/* ------------------------------- NewsAddEdit ------------------------------ */

function newsAddEditDispatch(dispatch: Dispatch) {
  return bindActionCreators(
    {
      createNewsAction: createNewsAction.STARTED,
      updateNewsAction: updateNewsAction.STARTED
    },
    dispatch
  );
}
export const NewsAddEditContainer = connect(null, newsAddEditDispatch)(AddEditNews);

/* -------------------------------------------------------------------------- */
/*                                 News/Index                                 */
/* -------------------------------------------------------------------------- */

const newsProps = state => ({
  news: state.news
});

function newsDispatch(dispatch: Dispatch) {
  return bindActionCreators(
    {
      getNewsAction: getNewsAction.STARTED
    },
    dispatch
  );
}
export const NewsContainer = connect(newsProps, newsDispatch)(News);
