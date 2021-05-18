import { connect } from 'react-redux';

// import Dashboard from "components/Dashboard";
// import EditOrderModal from "components/Dashboard/EditRecord";
// import Labels from "components/Dashboard/Labels";
// import OpenOrders from "components/Dashboard/OpenOrders";
// import AddCredentialModal from "components/Dashboard/OpenOrders/AddCredentialModal";
// import AddPostmenKeyModal from "components/Dashboard/OpenOrders/AddPostmenKeyModal";
// import AddShipperModal from "components/Dashboard/OpenOrders/AddShipperModal";
// import OrderList from "components/Dashboard/OpenOrders/OrderList";
// import SelectPostmenKey from "components/Dashboard/SelectPostmenKey";
// import { connect } from "react-redux";
// import { bindActionCreators, Dispatch } from "redux";
// import {
//   createCredentialAction,
//   createLabelsAction,
//   createPostmenKeyAction,
//   createShipperAction,
//   deleteCredentialsAction,
//   deletePostmenKeyAction,
//   deleteShipperAction,
//   editOrderAction,
//   getCredentialsAction,
//   getLabelsAction,
//   getOrdersAction,
//   getPostmenKeysAction,
//   getShippersAction,
//   setPostmenKey,
//   setReduxKey,
// } from "state/actions/app";
// import { logoutAction } from "state/actions/auth";

// /* -------------------------------------------------------------------------- */
// /*                                  Dashboard                                 */
// /* -------------------------------------------------------------------------- */

// const dasboardProps = (state) => ({
//   selectedTab: state.app.common.selectedTab,
// });

// function dashboardDispatch(dispatch: Dispatch) {
//   return bindActionCreators(
//     {
//       logoutAction,
//       setReduxKey,
//     },
//     dispatch
//   );
// }
// export const DashboardContainer = connect(
//   dasboardProps,
//   dashboardDispatch
// )(Dashboard);

// /* -------------------------------------------------------------------------- */
// /*                           Dashboard / OpenOrders                           */
// /* -------------------------------------------------------------------------- */

// /* --------------------------- OpenOrders (Index) --------------------------- */

// const openOrdersProps = (state: any) => ({
//   shippers: state.app.common.shippers,
//   orders: state.app.common.orders,
//   credentials: state.app.common.credentials,
//   postmenKey: state.app.common.postmenKey,
//   postmenKeys: state.app.common.postmenKeys,
//   labels: state.app.common.label.labels,
//   shipper: state.app.common.shipper,
//   credential: state.app.common.credential,
// });

// function openOrdersDispatch(dispatch: Dispatch) {
//   return bindActionCreators(
//     {
//       getOrdersAction: getOrdersAction.STARTED,
//       getShippersAction: getShippersAction.STARTED,
//       getLabelsAction: getLabelsAction.STARTED,
//       deleteShipperAction: deleteShipperAction.STARTED,
//       getCredentialsAction: getCredentialsAction.STARTED,
//       deleteCredentialsAction: deleteCredentialsAction.STARTED,
//       getPostmenKeysAction: getPostmenKeysAction.STARTED,
//       deletePostmenKeyAction: deletePostmenKeyAction.STARTED,
//       setReduxKey,
//     },
//     dispatch
//   );
// }
// export const OpenOrdersContainer = connect(
//   openOrdersProps,
//   openOrdersDispatch
// )(OpenOrders);

// /* ---------------------------- SelectPostmenKey ---------------------------- */

// const selectPostmenKeyProps = (state: any) => ({
//   postmenKey: state.app.common.postmenKey,
//   postmenKeys: state.app.common.postmenKeys,
// });

// function selectPostmenKeyDispatch(dispatch: Dispatch) {
//   return bindActionCreators(
//     {
//       getPostmenKeysAction: getPostmenKeysAction.STARTED,
//       deletePostmenKeyAction: deletePostmenKeyAction.STARTED,
//       setPostmenKey,
//       setReduxKey,
//     },
//     dispatch
//   );
// }
// export const SelectPostmenKeyContainer = connect(
//   selectPostmenKeyProps,
//   selectPostmenKeyDispatch
// )(SelectPostmenKey);

// /* ---------------------------- OrderList (Index) --------------------------- */

// const orderListProps = (state: any) => ({
//   orders: state.app.common.orders,
// });

// function orderListDispatch(dispatch: Dispatch) {
//   return bindActionCreators(
//     {
//       createLabelsAction: createLabelsAction.STARTED,
//     },
//     dispatch
//   );
// }
// export const OrderListContainer = connect(
//   orderListProps,
//   orderListDispatch
// )(OrderList);

// /* --------------------------- AddCredentialModal --------------------------- */

// const addCredentialProps = (state: any) => ({
//   showCredentialModel: state.app.common.showCredentialModel,
// });

// function addCredentialDispatch(dispatch: Dispatch) {
//   return bindActionCreators(
//     {
//       createCredentialAction: createCredentialAction.STARTED,
//       setReduxKey,
//     },
//     dispatch
//   );
// }
// export const AddCredentialContainer = connect(
//   addCredentialProps,
//   addCredentialDispatch
// )(AddCredentialModal);

// /* ----------------------------- AddShipperModal ---------------------------- */

// const addShipperProps = (state: any) => ({
//   showShipperModel: state.app.common.showShipperModel,
// });

// function addShipperDispatch(dispatch: Dispatch) {
//   return bindActionCreators(
//     {
//       createShipperAction: createShipperAction.STARTED,
//       setReduxKey,
//     },
//     dispatch
//   );
// }
// export const AddShipperContainer = connect(
//   addShipperProps,
//   addShipperDispatch
// )(AddShipperModal);

// /* --------------------------- AddPostmenKeyModel --------------------------- */

// const addPostmenkeyProps = (state: any) => ({
//   showPostmenKeyModel: state.app.common.showPostmenKeyModel,
// });

// function addPostmenKeyDispatch(dispatch: Dispatch) {
//   return bindActionCreators(
//     {
//       createPostmenKeyAction: createPostmenKeyAction.STARTED,
//       setReduxKey,
//     },
//     dispatch
//   );
// }
// export const AddPostmenKeyModalContainer = connect(
//   addPostmenkeyProps,
//   addPostmenKeyDispatch
// )(AddPostmenKeyModal);

// /* -------------------------------- EditOrder ------------------------------- */

// // const editOrderProps = () => ({});

// function editOrderDispatch(dispatch: Dispatch) {
//   return bindActionCreators(
//     {
//       editOrderAction,
//     },
//     dispatch
//   );
// }
// export const EditOrderContainer = connect(
//   null,
//   editOrderDispatch
// )(EditOrderModal);

// /* ----------------------------- Labels (Index) ----------------------------- */

// const labelsProps = (state: any) => ({
//   next_token: state.app.common.label.next_token,
//   labels: state.app.common.label.labels,
//   postmenKey: state.app.common.postmenKey,
// });

// function labelsDispatch(dispatch: Dispatch) {
//   return bindActionCreators(
//     {
//       getLabelsAction: getLabelsAction.STARTED,
//     },
//     dispatch
//   );
// }
// export const LabelsContainer = connect(labelsProps, labelsDispatch)(Labels);
