import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { JsonReact } from '../src/index';

describe('check json react render success', () =>  {
  const jsonReact = new JsonReact();
  jsonReact.component('div', {
    Cls: props => (
      <div {...props} />
    )
  });
  it('render div success', () => {
    const el =  jsonReact.renderToReactNode({
      type: 'div',
      props: {}
    })
    if (el) {
      console.log(ReactDOMServer.renderToString(el));
    }
  }) 
});

