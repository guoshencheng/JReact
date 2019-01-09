import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { JsonReact } from '../src/index';

describe('check json to nodes success', () => {
  const jsonReact = new JsonReact();
  it('null json to nodes success', () => {
    const tree = jsonReact.jsonToNodes()
    expect(tree).toBeUndefined();
  })
  it('array json to nodes success', () => {
    const tree = jsonReact.jsonToNodes([{
      type: 'div',
      props: { style: { left: 20 } }
    }, {
      type: 'div',
      props: { style: { left: 50 } }
    }])
    expect(tree).toBeDefined();
    expect(tree.length).toBe(2);
    expect(tree[0].data.json).toEqual({
      type: 'div',
      props: { style: { left: 20 } }
    })
  })

  it('single json to nodes success', () => {
    var data = {
      type: 'div',
      props: { style: { left: 20 } },
      children: [{
        type: 'div',
        props: { style: { left: 50 } }
      }, {
        type: 'div',
        props: { style: { left: 60 } }
      }]
    }
    const tree = jsonReact.jsonToNodes(data)
    expect(tree).toBeDefined();
    expect(tree.data.json).toEqual(data);
    expect(tree.children[0].data.json).toEqual(data.children[0]);
    expect(tree.children[1].data.json).toEqual(data.children[1]);
  })
});

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
    }, {
      type: 'div',
      props: { style: { left: 50 } }
    }])
    expect(el).toBeDefined();
    expect(ReactDOMServer.renderToString(
      <React.Fragment>
      {el}
      </React.Fragment>
    )).toBe(ReactDOMServer.renderToString(
      <React.Fragment>
        <div style={{left: 20}} />
        <div style={{left: 50}} />
      </React.Fragment>
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
    expect(ReactDOMServer.renderToString(el)).toBe(ReactDOMServer.renderToString(
      <div 
        style={{left: 20}} 
        className='parent'
      >
        <div className='child' />
      </div>
    ))
  })

  it('render custom component success', () => {
    const Custom = (props: any) => (
      <div className='custom-component' { ...props }>
        <label>title</label>
        <input type='text'/>
      </div>
    );
    JsonReact.RegisterComponent('Custom', {
      Cls: Custom
    })
    const el = jsonReact.createJsonComp({
      type: 'Custom',
      props: {
        style:{left: 20}
      }
    })
    expect(ReactDOMServer.renderToString(el)).toBe(ReactDOMServer.renderToString(
      <div className='custom-component'
        style={{left: 20}}
      >
        <label>title</label>
        <input type='text'/>
      </div>
    ))
  })
  it('render custom component success with data', () => {
    const Custom = ({ data, ...args }: { data: any, [key: string]: any }) => (
      <div className='custom-component' {...args}>
        <label>{data.title}</label>
        <input type='text'/>
      </div>
    );
    JsonReact.RegisterComponent('Custom', {
      Cls: Custom,
    })
    const el = jsonReact.createJsonComp({
      type: 'Custom',
      props: {
        style:{left: 20}
      },
      data: {
        title: 'custom component'
      },
    })
    expect(ReactDOMServer.renderToString(el)).toBe(ReactDOMServer.renderToString(
      <div className='custom-component'
        style={{left: 20}}
      >
        <label>custom component</label>
        <input type='text'/>
      </div>
    ))
  })
});

describe('check event handler', () => {
  
})


