import { JsonReact, JsonReactEventHandler } from './JsonReact';

export type EventJson = {
  key: string,
  type: string,
}

export type PropsJson = {
  [key: string]: string,
}

export const createJsonCompoent = (json: ComponentJson | ComponentJson[], ctx: JsonReact): JSX.Element[] => {
  const { components, events } = ctx;
  if (!Array.isArray(json)) {
    json = [json];
  }
  return json.filter(item => !!components[item.type]).map(item => {
    const { type, props, events: es } = item;
    const eventProps = es.filter(e => !!events[e.type]).reduce((pre, cur) => {
      const ev = events[cur.type];
      pre[ev.originEventKey] = ev.handler;
      return pre;
    }, {} as { [key: string]: JsonReactEventHandler });
    const component = components[type];
    const { Cls } = component;
    return (
      <Cls {...props} {...eventProps} />
    )
  })
}
