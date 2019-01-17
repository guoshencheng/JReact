import * as React from 'react';
import * as ReactDOM from 'react-dom';

import JsonReact from '../src';

const ACLICK = 'ACLICK';

const A = ({ emitter, style }: any) => {
  return (
    <div onClick={() => emitter.emit(ACLICK) } style={style}>
      Click me!
    </div>
  )
}

const AJRComp = {
  name: 'A',
  Cls: A,
  eventKeys: {
    ACLICK: {
      key: ACLICK,
      desc: 'click event'
    }
  }
}

JsonReact.RegisterComponent(AJRComp);

// ===================

const BCLICKED = 'BCLICKED';

const B = ({ style, data }: any) => {
  return (
    <div style={style}>
      clicked { data || 0 }
    </div>
  )
}

const BReducer = (state = 0, action: any) => {
  switch(action.type) {
    case BCLICKED:
      return state + 1;
    default:
      return state;
  }
}

const BJRComp = {
  reducer: BReducer,
  name: 'B',
  Cls: B,
  actionKeys: {
    BCLICKED: {
      key: BCLICKED,
      desc: 'clicked reducer action'
    }
  }
}

JsonReact.RegisterComponent(BJRComp);

const renderer = new JsonReact();

ReactDOM.render(
  renderer.render([{
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
      event: ACLICK,
      reducer: BCLICKED,
    }]
  }, {
    type: 'B',
  }]),
  document.getElementById('root')
);
