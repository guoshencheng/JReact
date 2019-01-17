import JsonReact from '../src';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';

describe('success render with json', () => {
  it('success render null as null', () => {
    const renderer = new JsonReact();
    const el = renderer.render();
    expect(
      ReactDOMServer.renderToString(el)
    ).toEqual('');
  });

  it('render a array type of json', () => {
    const renderer = new JsonReact();
    const el = renderer.render([{
      type: 'div',
      props: { style: { left: 20 } }
    }, {
      type: 'div',
      props: { style: { left: 50 } }
    }])
    expect(el).toBeDefined();
    expect(ReactDOMServer.renderToString(
      el
    )).toBe(ReactDOMServer.renderToString(
      <Provider store={renderer.store}>
        <div style={{left: 20}} />
        <div style={{left: 50}} />
      </Provider>
    ))
  })
  it('render div success', () => {
    const renderer = new JsonReact();
    const el = renderer.render({
      type: 'div',
      props: { style: { left: 20 } }
    })
    expect(el).toBeDefined();
    if (el) {
      expect(ReactDOMServer.renderToString(el)).toBe(ReactDOMServer.renderToString(
        <Provider store={renderer.store}>
            <div style={{left: 20}} />
        </Provider>
      ))
    }
  }) 
})
