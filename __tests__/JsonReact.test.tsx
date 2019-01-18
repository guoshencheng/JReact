import JsonReact from '../src';
import * as ReactDOMServer from 'react-dom/server';
import * as trenderer from 'react-test-renderer';

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
