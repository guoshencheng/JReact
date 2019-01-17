import { Reducer } from 'react';

export type MaybeArray<T> = T | T[]

export type ComponentJson = {
  key?: string,
  data?: string,
  type: string,
  props?: PropsJson,
  events?: EventJson[],
  children?: MaybeArray<ComponentJson>
} | string

export type EventJson = {
  event: string,
  reducer: string,
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

export type DescribableKey = {
  key: string,
  desc?: string,
}

export type JRComponent = {
  name?: string,
  reducer?: Reducer<any, any>,
  Cls: React.ComponentType<any>,
  actionKeys?: StringMap<DescribableKey>,
  eventKeys?: StringMap<DescribableKey>
}