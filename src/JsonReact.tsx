import * as React from 'react';

export type ComponentJson = {
  type: string,
  props?: PropsJson,
  events?: EventJson[],
  children?: ComponentJson | ComponentJson []
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

export const createJsonCompoent = (json: ComponentJson | ComponentJson[] | undefined, ctx: JsonReact): React.ReactElement<any>[] | undefined => {
  if (!json) return;
  const { components, events } = ctx;
  if (!Array.isArray(json)) {
    json = [json];
  }
  const items = json;
  if (items && items.length > 0) {
    return (
      items.map((item, index) => {
        const { type, props, events: es, children } = item;
        const childNode = createJsonCompoent(children, ctx);
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
          return React.createElement(Cls, { ...props, ...eventProps, key: index }, childNode);
        } else {
          return (
            childNode ? <Cls key={index} {...props} {...eventProps}>{childNode}</Cls> : <Cls key={index} {...props} {...eventProps} />
          )
        }
      })
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
