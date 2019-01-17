import ReactDOM from 'react-dom';

import JsonReact from '../src';

const renderer = new JsonReact();

ReactDOM.render(
  renderer.render({
    type: 'div',
    props: { style: { left: 20 } },
    children: [
      'WelCome ',
      'To ',
      'JsonReact'
    ]
  }),
  document.getElementById('root')
);
