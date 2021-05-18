import React, { FC } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import { useSelector } from 'react-redux';

interface ILoaderProps {
  children: any;
  type?: any;
  block?: boolean;
}

interface IReduxLoaderProps {
  children: any;
  type: any;
}

const getType = type => {
  return type.STARTED.replace('_STARTED', '');
};

const ReduxLoader: FC<IReduxLoaderProps> = ({ children, type }) => {
  const loadingState: string[] = [];

  type.forEach(t => {
    loadingState.push(getType(t));
  });
  const loader = useSelector((state: any) => state.app.loader);
  const getLoading = () => {
    for (const loading of loadingState) {
      if (loader[loading]) return true;
    }
    return false;
  };
  return (
    <LoadingOverlay active={!!getLoading()} spinner>
      {children}
    </LoadingOverlay>
  );
};

const Loader: FC<ILoaderProps> = ({ children, type, block }) => (
  <>
    {type ? (
      <ReduxLoader type={type}>{children}</ReduxLoader>
    ) : (
      <LoadingOverlay active={block} spinner>
        {children}
      </LoadingOverlay>
    )}
  </>
);

export default Loader;
