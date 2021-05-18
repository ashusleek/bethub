import { companyWatcher } from 'state/sagas/company/company';
import { fileWatcher } from 'state/sagas/company/file';
import { suggestionWatcher } from 'state/sagas/company/suggestion';

export const company = [companyWatcher(), fileWatcher(), suggestionWatcher()];
