import React from 'react'
import { connect } from 'react-redux'
import sprite from './sprite.png'
import handleMovement from './movement'

function Player(props){
  return(
    <div
      style={{
        position: 'absolute',
        top: props.position[1],
        left: props.position[0],
        backgroundImage: `url('${sprite}')`,
        backgroundPosition: props.spriteLocation,
        width: '45px',
        height: '45px'
      }}
    />
  )
}

function mapStateToProps(state) {
  return {
    ...state.player,
  }
}

export default connect(mapStateToProps) (handleMovement(Player))


