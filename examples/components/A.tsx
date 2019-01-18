import * as React from 'react';

const ACLICK = 'ACLICK';

export const Cls = ({ emitter, style }: any) => {
  return (
    <div onClick={() => emitter.emit(ACLICK) } style={style}>
      Click me!
    </div>
  )
}

export const eventKeys = {
  ACLICK: {
    key: ACLICK,
    desc: 'click event'
  }
}

export const name = 'A';