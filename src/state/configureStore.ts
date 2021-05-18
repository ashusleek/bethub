import prod from 'state/configureStore.prod';
import dev from 'state/configureStore.dev';

export default process.env.NODE_ENV === 'production' ? prod : dev;
