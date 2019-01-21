import JsonReact from '../src';
import * as ReactDOMServer from 'react-dom/server';
import * as trenderer from 'react-test-renderer';

import * as A from '../examples/components/A';
import * as B from '../examples/components/B';

JsonReact.RegisterComponent(A);
JsonReact.RegisterComponent(B);

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
    const tree = trenderer.create(el).toJSON();
    expect(tree).toMatchSnapshot();
  })
  it('render div success', () => {
    const renderer = new JsonReact();
    const el = renderer.render({
      type: 'div',
      props: { style: { left: 20 } }
    })
    const tree = trenderer.create(el).toJSON();
    expect(tree).toMatchSnapshot();
  }) 
})

describe('render custom component', () => {
  const renderer = new JsonReact();
  const el = renderer.render([{
    type: 'div',
    props: { style: { left: 20 } },
    children: [
      'WelCome ',
      'To ',
      'JsonReact'
    ]
  }, {
    type: 'A',
    props: { style: { color: 'white', background: 'red' } },
    events: [{
      event: A.eventKeys.ACLICK.key,
      reducer: B.actionKeys.BCLICKED.key,
    }]
  }, {
    type: 'B',
  }]);
  it('success render custom component', () => {
    const tree = trenderer.create(el).toJSON();
    expect(tree).toMatchSnapshot();
  })
  it('change rendere result when dispatch event', () => {
    renderer.store.dispatch({
      type: B.actionKeys.BCLICKED.key
    })
    const tree = trenderer.create(el).toJSON();
    expect(tree).toMatchSnapshot();
  })
})