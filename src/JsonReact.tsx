import * as React from 'react';
import Tree from './tools/tree';

import { ComponentJson, StringMap, JsonReactEventHandler, JREvent, JRComponent, MaybeArray } from './JsonReactTypes';

// 初始化
// 生成对应的数据tree，
// 数据tree生成element并记录到tree中
// 
// 更新
// 生成对应的数据tree
// 自上而下的比较数据
// 当前tree的value是否浅相等，是 ? 直接返回原来的element，否 ？返回新创建的element
// children中有key的应该找寻相应的节点进行比较
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
  element?: React.ReactElement<any>
}

export class JsonReact {

  static Components: StringMap<JRComponent> = {}
  static Events: StringMap<JREvent> = {}

  nodes: Tree<JsonReactTreeNodeData>

  jsonToNodes(json: ComponentJson[]): Tree<JsonReactTreeNodeData>[];
  jsonToNodes(json: ComponentJson): Tree<JsonReactTreeNodeData>;
  jsonToNodes(): undefined;
  jsonToNodes(json?: MaybeArray<ComponentJson>): MaybeArray<Tree<JsonReactTreeNodeData>> | undefined {
    if (!json) return;
    if (Array.isArray(json)) {
      return json.map(j => this.jsonToNodes(j));
    } else {
      const node = new Tree<JsonReactTreeNodeData>();
      const temp = { ...json };
      delete temp.children;
      node.data = {
        json: temp
      };
      if (json.children) {
        this.jsonToNodes(json.children as any).forEach(child => {
          node.insert(child)
        });
      }
      return node;
    }
  }

  compareAndRender(pre: MaybeArray<Tree<JsonReactTreeNodeData>> | undefined, next: MaybeArray<Tree<JsonReactTreeNodeData>> | undefined) {
    if (!pre) {
      if (!next) return;
      if (Array.isArray(next)) {
        return next.map(item => this.compareAndRender(pre, item));
      } else {
        const { json } = next.data;
        const { Components } = JsonReact;
        const { type, props, data } = json;
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
          return React.createElement(Cls, { ...props });
        } else {
          return (
            <Cls data={data} {...props} />
          )
        }
      }
    }
  }

  render(json: ComponentJson[]): React.ReactElement<any>[];
  render(json: ComponentJson): React.ReactElement<any>;
  render(): undefined;
  render(json?: MaybeArray<ComponentJson>): MaybeArray<React.ReactElement<any>> | undefined {
    const node = this.jsonToNodes(json as any);
  }

  private createJsonArrayComp(json: ComponentJson[]): React.ReactElement<any>[] {
    const ele = json.map((item, index) => (
      this.createSingleJsonComp(item, index)
    ));
    return ele;
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
