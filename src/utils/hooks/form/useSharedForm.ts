import React from 'react';
import { useForm } from 'react-hook-form';
import { globalHook } from './globalHook';
import { setErrors, setValues } from './formEnhancers';
// import useSharedWatch from './useSharedWatch';
import { FORM_ERROR } from './constants';
import Store from './store';

export const useSharedForm = (formName: any, init: any = {}) => {
  let hookForm: any = useForm();
  hookForm.setErrors = React.useMemo(() => setErrors(formName), [formName]);
  hookForm.setValues = React.useMemo(() => setValues(formName), [formName]);
  // hookForm.watch = React.useMemo(
  //   function Hook() {
  //     return useSharedWatch(hookForm.control);
  //   },
  //   [hookForm.control]
  // );

  if (Store.getHook(formName)) {
    hookForm = null;
    return Store.getHook(formName)(Store.getForm(formName));
  }
  Store.addForm(formName, hookForm);

  const GlobalHook = () => {
    const _hookForm: any = useForm(init);
    _hookForm.useWatchFieldsRef = hookForm.useWatchFieldsRef;
    _hookForm.useWatchRenderFunctionsRef = hookForm.useWatchRenderFunctionsRef;
    _hookForm.register({ name: FORM_ERROR });
    // _hookForm.watch = React.useMemo(
    //   function Hook() {
    //     return useSharedWatch(_hookForm.control);
    //   },
    //   [_hookForm.control]
    // );

    _hookForm.setErrors = hookForm.setErrors;
    _hookForm.setValues = hookForm.setValues;
    Store.addForm(formName, _hookForm);

    return _hookForm;
  };

  Store.addHook(formName, globalHook(GlobalHook));

  return Store.getHook(formName)(hookForm);
};
