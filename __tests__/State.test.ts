import State from '../src/State';

describe('create store sucess', () => {
  it('create store success', () => {
    const store = State.createStore({
      a: (state = { key: 1 }, action) => {
        switch(action.type) {
          case 'up':
            return { ...state, key: state.key + 1 };
          default: 
            return state;
        }
      }
    })
    expect(store.getState().a.key).toBe(1);
    store.dispatch({
      type: 'up',
    })
    expect(store.getState().a.key).toBe(2);
  })

  it('create store dispatch async action success', () => {
    const store = State.createStore({
      a: (state = { key: 1 }, action) => {
        switch(action.type) {
          case 'up':
            return { ...state, key: state.key + 1 };
          case 'down':
            return { ...state, key: state.key - 1 };
          default: 
            return state;
        }
      }
    })
    const action = (dispatch: any, getState: any) => {
      const { key } = getState().a;
      if (key > 1) {
        dispatch({
          type: 'down',
        })
      } else {
        dispatch({
          type: 'up',
        })
      }
    }
    expect(store.getState().a.key).toBe(1);
    store.dispatch(action);
    expect(store.getState().a.key).toBe(2);
    store.dispatch(action);
    expect(store.getState().a.key).toBe(1);
  })
})
