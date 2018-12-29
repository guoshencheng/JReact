import * as React from 'react';

export type JsonReactEventHandler = (key: string, data: any) => void;

export type JsonReactEvent = {
  handler: JsonReactEventHandler
} 

export type JsonReactComponent = {
  Cls: React.ComponentType<any>
}

export type JsonReact = {
  components: {
    [key: string]: JsonReactComponent,
  },
  events: {
    [key: string]: JsonReactEvent,
  }
}