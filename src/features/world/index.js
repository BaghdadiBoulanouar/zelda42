import React from 'react'
import Map from '../maps'
import Player from '../player'

import { tiles } from '../../data/maps/1'
import store from '../../config/store'

function World(props) {
  store.dispatch({ type: 'ADD_TILES', payload: {
    tiles,
  }})
  return (
    <div
      style={{
        position: 'relative',
        width: '900px',
        height: '450px',
        //margin: '20px auto'
      }}
    >
      <Map tiles={tiles} />
      <Player />
    </div>
  )
}

export default World