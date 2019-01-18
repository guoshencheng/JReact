import * as ReactDOM from 'react-dom';

import JsonReact from '../src';
import * as A from './components/A';
import * as B from './components/B';

JsonReact.RegisterComponent(A);
JsonReact.RegisterComponent(B);

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
      event: A.eventKeys.ACLICK.key,
      reducer: B.actionKeys.BCLICKED.key,
    }]
  }, {
    type: 'B',
  }]),
  document.getElementById('root')
);
