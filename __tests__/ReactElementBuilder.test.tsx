import * as React from 'react';
import * as renderer from 'react-test-renderer';
import ReactElementBuilder from '../src/ReactElementBuilder';

describe('check json react render success', () =>  {
  it('render null return undefined', () => {
    const el = ReactElementBuilder.build();
    expect(el).toBeUndefined();
  })
  it('render a array type of json', () => {
    const el = ReactElementBuilder.build([{
      type: 'div',
      props: { style: { left: 20 } }
    }, {
      type: 'div',
      props: { style: { left: 50 } }
    }])
    const tree = renderer.create(
      <React.Fragment>
      {el}
      </React.Fragment>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })
  it('render div success', () => {
    const el = ReactElementBuilder.build({
      type: 'div',
      props: { style: { left: 20 } }
    })
    const tree = renderer.create(
      el
    ).toJSON();
    expect(tree).toMatchSnapshot();
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
    const tree = renderer.create(el).toJSON();
    expect(tree).toMatchSnapshot();
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
    const tree = renderer.create(el).toJSON();
    expect(tree).toMatchSnapshot();
  })
});

describe('check event handler', () => {
  
})


