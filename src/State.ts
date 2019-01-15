import { Reducer, Store, createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { StringMap } from './JsonReactTypes';
class State {
  static createStore(reducers: StringMap<Reducer<any, any>>): Store<any, any> {
    return createStore(combineReducers(reducers), applyMiddleware(thunk));
  }
}

export default State;