import TreeBuilder from '../src/TreeBuilder';

describe('build json into tree', () => {
  it('return null if json is null or undefined', function() {
    const t = TreeBuilder.build(null);
    expect(t).toBeUndefined();
  });
  it('build single json node into single tree', function() {
    const json = {
      type: 'div',
      data: { a: 1, b: 333 },
      props: { 
        style: {
          left: 20
        }
      }
    }
    const t = TreeBuilder.build(json);
    expect(t).toBeDefined();
    expect(t.data).toEqual(json);
  })
  it('build array json node into array tree', function() {
    const arrJson = [{
      type: 'div',
      data: { a: 1, b: 333 },
      props: { 
        style: {
          left: 20
        }
      }
    }, {
      type: 'span',
      data: { a: 1, b: 333 },
    }]
    const t = TreeBuilder.build(arrJson);
    expect(t.length).toBe(2);
    expect(t[0].data).toBe(arrJson[0])
    expect(t[1].data).toBe(arrJson[1])
  })
  it('build node with children success', function() {
    const json = {
      type: 'div',
      data: { a: 1, b: 333 },
      props: { 
        style: {
          left: 20
        }
      },
      children: [{
        type: 'div',
        data: { a: 1, b: 333 },
        props: { 
          style: {
            left: 20
          }
        }
      }, {
        type: 'span',
        data: { a: 1, b: 333 },
      }]
    }
    const t = TreeBuilder.build(json);
    expect(t).toBeDefined();
    const temp = { ...json };
    delete temp.children;
    expect(t.data).toEqual(temp);
    expect(t.children.length).toBe(2);
    expect(t.children[1].data).toBe(json.children[1]);
  })
})
