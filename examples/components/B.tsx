import * as React from 'react';

const BCLICKED = 'BCLICKED';

export const name = 'B';

export const Cls = ({ style, data }: any) => {
  return (
    <div style={style}>
      clicked { data || 0 }
    </div>
  )
}

export const reducer = (state = 0, action: any) => {
  switch(action.type) {
    case BCLICKED:
      return state + 1;
    default:
      return state;
  }
}


export const actionKeys = {
  BCLICKED: {
    key: BCLICKED,
    desc: 'clicked reducer action'
  }
}
