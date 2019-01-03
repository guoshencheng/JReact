import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { JsonReact } from '../src/index';

describe('check json react render success', () =>  {
  const jsonReact = new JsonReact();
  it('render null return undefined', () => {
    const el = jsonReact.createJsonComp();
    if (el) {
      expect(el).toBeUndefined();
    }
  })
  it('render a array type of json', () => {
    const el = jsonReact.createJsonComp([{
      type: 'div',
      props: { style: { left: 20 } }
    }])
    expect(el).toBeDefined();
    expect(ReactDOMServer.renderToString(
      <React.Fragment>
      {el}
      </React.Fragment>
    )).toBe(ReactDOMServer.renderToString(
      <div style={{left: 20}} />
    ))
  })
  it('render div success', () => {
    const el = jsonReact.createJsonComp({
      type: 'div',
      props: { style: { left: 20 } }
    })
    expect(el).toBeDefined();
    if (el) {
      expect(ReactDOMServer.renderToString(el)).toBe(ReactDOMServer.renderToString(
        <div style={{left: 20}} />
      ))
    }
  }) 
  it('render div.parent>div.child success', () => {
    const el = jsonReact.createJsonComp({
      type: 'div',
      props: { style: { left: 20 }, className: 'parent' },
      children: {
        type: 'div',
        props: {
          className: 'child'
        }
      }
    })
    expect(el).toBeDefined();
    if (el) {
      expect(ReactDOMServer.renderToString(el)).toBe(ReactDOMServer.renderToString(
        <div 
          style={{left: 20}} 
          className='parent'
        >
          <div className='child' />
        </div>
      ))
    }
  })

  // it('render custom component success', () => {
  //   const el = jsonReact.renderToReactNode({
  //     type: 'div',
  //   })
  // })
});

