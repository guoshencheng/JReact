import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import ReactElementBuilder from '../src/ReactElementBuilder';

describe('check json react render success', () =>  {
  it('render null return undefined', () => {
    const el = ReactElementBuilder.build();
    if (el) {
      expect(el).toBeUndefined();
    }
  })
  it('render a array type of json', () => {
    const el = ReactElementBuilder.build([{
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
    const el = ReactElementBuilder.build({
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
    const el = ReactElementBuilder.build({
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
    ReactElementBuilder.RegisterComponent('Custom', {
      Cls: Custom
    })
    const el = ReactElementBuilder.build({
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
    const Custom = ({ ...args }: { [key: string]: any }) => (
      <div className='custom-component' {...args}>
        <input type='text'/>
      </div>
    );
    ReactElementBuilder.RegisterComponent('Custom', {
      Cls: Custom,
    })
    const el = ReactElementBuilder.build({
      type: 'Custom',
      props: {
        style:{left: 20}
      },
    })
    expect(ReactDOMServer.renderToString(el)).toBe(ReactDOMServer.renderToString(
      <div className='custom-component'
        style={{left: 20}}
      >
        <input type='text'/>
      </div>
    ))
  })
});

describe('check event handler', () => {
  
})


