import * as React from 'react';
import ReactElementBuilder from './ReactElementBuilder';
import { JRComponent, StringMap, ComponentJson, MaybeArray } from './JsonReactTypes';
import Logger from './Logger';
import { Reducer, Store } from 'redux';
import State from './State';
import { Provider } from 'react-redux';

export default class JsonReact {

  static Logger = Logger

  static reducers: StringMap<Reducer<any, any>> = {}

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
    this.store = State.createStore(JsonReact.reducers);
  }

  render(json: MaybeArray<ComponentJson | string> | undefined) {
    return (
      <Provider store={this.store}>
        {ReactElementBuilder.build(json as any)}
      </Provider>
    )
  }

}