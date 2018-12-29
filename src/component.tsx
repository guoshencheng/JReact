import { JsonReact } from './JsonReact';

export type EventJson = {
  key: string,
  type: string,
}

export type PropsJson = {
  [key: string]: string,
}

export type ComponentJson = {
  type: string,
  props: PropsJson,
  events: EventJson[],
}

export const createJsonCompoent = (json: ComponentJson | ComponentJson[], ctx: JsonReact): JSX.Element[] => {
  const { components } = ctx;
  if (!Array.isArray(json)) {
    json = [json];
  }
  return json.filter(item => !!components[item.type]).map(item => {
    const { type, props } = item;
    const component = components[type];
    const { Cls } = component;
    return (
      <Cls {...props} />
    )
  })
}
