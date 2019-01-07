import * as React from 'react';
import Tree from './tools/tree';

export type MaybeArray<T> = T | T[]

export type ComponentJson = {
  data?: any,
  type: string,
  props?: PropsJson,
  events?: EventJson[],
  children?: MaybeArray<ComponentJson>
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

export type JREvent = {
  originEventKey: string,
  handler: JsonReactEventHandler
} 

export type JRComponent = {
  Cls: React.ComponentType<any>
}

export class JsonReactComponent extends React.Component<JsonReactComponentProps> {
  jsonReact: JsonReact
  constructor(props: any, context: any) {
    super(props, context);
    this.jsonReact = new JsonReact();
  }

  render() {
    const { json } = this.props;
    return this.jsonReact.createJsonComp(json as any);
  }
}

export type JsonReactComponentProps = {
  json?: MaybeArray<ComponentJson>
}

export type JsonReactTreeNodeData = {
  json: ComponentJson
  element: React.ReactElement<any>
}

export class JsonReact {

  static Components: StringMap<JRComponent> = {}
  static Events: StringMap<JREvent> = {}

  nodes: Tree<JsonReactTreeNodeData>

  private createJsonArrayComp(json: ComponentJson[]): React.ReactElement<any>[] {
    return json.map((item, index) => (
      this.createSingleJsonComp(item, index)
    ));
  }

  private createSingleJsonComp(json: ComponentJson, key?: any): React.ReactElement<any> {
    const { Components, Events } = JsonReact;
    const { type, props, events: es, children, data } = json;
    // create child node first
    const childNode = this.createJsonComp(children as any);
    // resolve event props
    const eventProps = es ? es.filter(e => !!Events[e.type]).reduce((pre, cur) => {
      const ev = Events[cur.type];
      pre[ev.originEventKey] = () => ev.handler(cur.key, data);
      return pre;
    }, {} as { [key: string]: JsonReactEventHandler }) : {};
    // try to get component by type
    const component = Components[type];
    let Cls;
    if (!component) {
      // use react origin html tag if component is not found
      Cls = type as keyof React.ReactHTML;
    } else {
      // use registed class or function
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
  createJsonComp(json?: MaybeArray<ComponentJson>): React.ReactElement<any>[] | React.ReactElement<any> | undefined {
    if (!json) return;
    if (!Array.isArray(json)) {
      return this.createSingleJsonComp(json);
    }
    return this.createJsonArrayComp(json);
  }

  static RegisterComponent = (key: string, jsonReactComp: JRComponent) => {
    JsonReact.Components[key] = jsonReactComp;
  }

  static RegisterEvent = (key: string, event: JREvent) => {
    JsonReact.Events[key] = event;
  }
}
