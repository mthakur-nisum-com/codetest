import { createStore} from 'redux';
import reducers from '../reducers/appReducer';


export const store = createStore(reducers);