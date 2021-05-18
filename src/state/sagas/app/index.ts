import { watcherCommon } from 'state/sagas/app/common';
import { watcherLoader } from 'state/sagas/app/loader';

export const app = [watcherCommon(), watcherLoader()];
