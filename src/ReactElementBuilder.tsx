import * as React from 'react';
import { Connect } from 'react-redux';
import { MaybeArray, ComponentJson, StringMap, JRComponent, JREvent } from './JsonReactTypes';
import { EventEmitter } from 'fbemitter';
import { Store } from 'redux';

class ReactElementBuilder {

  static connect: Connect

  static Components: StringMap<JRComponent> = {}
  static Events: StringMap<JREvent> = {}

  static emitter?: EventEmitter;

  static store?: Store

  static RegisterComponent(name: string, jrComp: JRComponent) {
    ReactElementBuilder.Components[name] = jrComp;
  }

  static buildMulti(json: ComponentJson[]): (React.ReactElement<any> | string)[] {
    const ele = json.map((item, index) => (
      ReactElementBuilder.buildSingle(item, `${index}`)
    ));
    return ele;
  }

  static buildSingle(json: ComponentJson | string, key?: string): React.ReactElement<any> | string {
    if (typeof json === 'string') {
      return json;
    }
    const { Components } = ReactElementBuilder;
    const { type: t, props, children, data, events: es } = json;

    es && es.forEach(event => {
      if (ReactElementBuilder.emitter) {
        ReactElementBuilder.emitter.addListener(event.event, (data: any) => {
          if (ReactElementBuilder.store) {
            ReactElementBuilder.store.dispatch({
              type: event.reducer,
              data,
            });
          }
        })
      }
    });

    const childNode = ReactElementBuilder.build(children as any);
    // resolve event props
    const component = Components[t];
    let Cls;
    if (!component) {
      // use react origin html tag if component is not found
      Cls = t as keyof React.ReactHTML;
      return (
        <Cls key={key} {...props} >{ childNode }</Cls>
      )
    } else {
      // use registed class or function wraped with connect
      Cls = ReactElementBuilder.connect ? ReactElementBuilder.connect(data, dispatch => ({ dispatch }))(component.Cls) : component.Cls
      return (
        <Cls key={key} {...props} emitter={ReactElementBuilder.emitter} >{ childNode }</Cls>
      )
    }
  }

  static build(json: string): string;
  static build(json?: undefined): undefined;
  static build(json: ComponentJson[]) : React.ReactElement<any>[];
  static build(json: (ComponentJson | string)[]) : (React.ReactElement<any> | string)[];
  static build(json: ComponentJson): React.ReactElement<any>;
  static build(json?: MaybeArray<ComponentJson | string> | undefined): MaybeArray<React.ReactElement<any> | string> | undefined {
    if (!json) return json;
    if (!Array.isArray(json)) {
      return ReactElementBuilder.buildSingle(json);
    }
    return ReactElementBuilder.buildMulti(json);
  }
}

export default ReactElementBuilder;