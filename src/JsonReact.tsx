import * as React from 'react';

export type ComponentJson = {
  data?: any,
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
  Cls: React.ComponentType<any>
}

export class JsonReact {

  components: StringMap<JsonReactComponent>
  events: StringMap<JsonReactEvent>

  constructor() {
    this.components = {};
    this.events = {};
  }

  createJsonArrayComp(json: ComponentJson[]): React.ReactElement<any>[] {
    return json.map((item, index) => (
      this.createSingleJsonComp(item, index)
    ));
  }

  createSingleJsonComp(json: ComponentJson, key?: any): React.ReactElement<any> {
    const { components, events } = this;
    const { type, props, events: es, children, data } = json;
    const childNode = this.createJsonComp(children as any);
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
      return React.createElement(Cls, { ...props, ...eventProps, key }, childNode);
    } else {
      return (
        childNode ? <Cls data={data} key={key} {...props} {...eventProps}>{childNode}</Cls> : <Cls data={data} key={key} {...props} {...eventProps} />
      )
    }
  }

  createJsonComp(json: ComponentJson[]): React.ReactElement<any>[];
  createJsonComp(json: ComponentJson): React.ReactElement<any>;
  createJsonComp(): undefined;
  createJsonComp(json?: ComponentJson | ComponentJson[]): React.ReactElement<any>[] | React.ReactElement<any> | undefined {
    if (!json) return;
    if (!Array.isArray(json)) {
      return this.createSingleJsonComp(json);
    }
    return this.createJsonArrayComp(json);
  }

  component = (key: string, jsonReactComp: JsonReactComponent) => {
    this.components[key] = jsonReactComp;
  }

  event = (key: string, event: JsonReactEvent) => {
    this.events[key] = event;
  }
}
