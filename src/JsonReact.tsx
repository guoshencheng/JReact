import * as React from 'react';
import { Fragment } from 'react';

export type ComponentJson = {
  type: string,
  props?: PropsJson,
  events?: EventJson[],
}

export type EventJson = {
  key: string,
  type: string,
}

export type PropsJson = {
  [key: string]: any,
}

export type StringMap<T> = {
  [key: string]: T
}

export type JsonReactEventHandler = (key: string, data: any) => void;

export type JsonReactEvent = {
  originEventKey: string,
  handler: JsonReactEventHandler
} 

export type JsonReactComponent = {
  Cls: React.ComponentType<any> | 'input' | keyof React.ReactHTML | keyof React.ReactSVG,
}

export const createJsonCompoent = (json: ComponentJson | ComponentJson[], ctx: JsonReact): React.ReactElement<any> | undefined => {
  const { components, events } = ctx;
  if (!Array.isArray(json)) {
    json = [json];
  }
  const items = json;
  if (items && items.length > 0) {
    return (
      <Fragment>
      {
        items.map((item, index) => {
          const { type, props, events: es } = item;
          const eventProps = es ? es.filter(e => !!events[e.type]).reduce((pre, cur) => {
            const ev = events[cur.type];
            pre[ev.originEventKey] = ev.handler;
            return pre;
          }, {} as { [key: string]: JsonReactEventHandler }) : {};
          const component = components[type];
          let Cls;
          if (!component) {
            Cls = type as keyof React.ReactHTML;
          } else {
            Cls = component.Cls;
          }
          if (typeof Cls === 'string') {
            let children;
            if (props) {
              children = props.children;
            }
            return React.createElement(Cls, { ...props, ...eventProps, key: index }, children);
          } else {
            return (
              <Cls key={index} {...props} {...eventProps} />
            )
          }
        })
      }
      </Fragment>
    )
  }
}

export class JsonReact {

  components: StringMap<JsonReactComponent>
  events: StringMap<JsonReactEvent>

  constructor() {
    this.components = {};
    this.events = {};
  }

  component = (key: string, jsonReactComp: JsonReactComponent) => {
    this.components[key] = jsonReactComp;
  }

  event = (key: string, event: JsonReactEvent) => {
    this.events[key] = event;
  }

  renderToReactNode(json: ComponentJson) {
    return createJsonCompoent(json, this);
  }
}
