import * as React from 'react';
import { EventEmitter } from 'fbemitter';
import ReactElementBuilder from './ReactElementBuilder';
import { JRComponent, StringMap, ComponentJson, MaybeArray } from './JsonReactTypes';
import Logger from './Logger';
import { Reducer, Store } from 'redux';
import State from './State';
import { Provider } from 'react-redux';

export const DataMapReducerActions = {
  UPDATE: '$$DATAMAP_REDUCER_ACTION_$$UPDATE',
  CLEAN: '$$DATAMAP_REDUCER_ACTION_$$CLEAN',
}

const defaultState = {};

export const DataMapReducer = (state = defaultState, action: any) => {
  switch(action.type) {
    case DataMapReducerActions.UPDATE:
      return { ...state, [action.key]: action.value }
    case DataMapReducerActions.CLEAN:
      return defaultState;
    default:
      return state;
  }
}

export default class JsonReact extends EventEmitter {

  static Logger = Logger

  static reducers: StringMap<Reducer<any, any>> = {
    '$datamap': DataMapReducer
  }

  static RegisterComponent(jrComp: JRComponent, name?: string) {
    name = name || jrComp.name;
    if (!name) {
      this.Logger.warn(`register component should provide a name!`, jrComp);
      return;
    }
    if (jrComp.Cls) {
      if (jrComp.reducer) {
        JsonReact.reducers[name] = jrComp.reducer;
      }
      ReactElementBuilder.RegisterComponent(name, jrComp);
    }
  }

  store: Store<any, any>

  constructor() {
    super();
    this.store = State.createStore(JsonReact.reducers);
  }

  render(json?: MaybeArray<ComponentJson | string> | undefined) {
    this.removeAllListeners();
    ReactElementBuilder.emitter = this;
    const el = (
      <Provider store={this.store}>
        {ReactElementBuilder.build(json as any)}
      </Provider>
    )
    delete ReactElementBuilder.emitter;
    return el;
  }
}
