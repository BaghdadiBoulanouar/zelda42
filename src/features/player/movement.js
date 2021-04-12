import store from '../../config/store'
import { MAP_WIDTH, MAP_HEIGHT, SPRITE_SIZE } from '../../config/constants'

export default function handleMovement(player) {

  function getNewPosition(oldPos, direction) {
    switch(direction) {
      case 'WEST':
        return [ oldPos[0]-SPRITE_SIZE, oldPos[1] ]
      case 'EAST':
        return [ oldPos[0]+SPRITE_SIZE, oldPos[1] ]
      case 'NORTH':
        return [ oldPos[0], oldPos[1]-SPRITE_SIZE ]
      case 'SOUTH':
        return [ oldPos[0], oldPos[1]+SPRITE_SIZE ]
    }
  }

  function getSpriteDirection(direction) {
    switch(direction) {
      case 'WEST':
        return `0px 0px`
      case 'SOUTH':
        return `0px 45px`
      case 'NORTH':
        return `0px 90px`
      case 'EAST':
        return `0px 135px`
    }
  }

  function dispatchMove(direction, newPos) {
    store.dispatch({
      type: 'MOVE_PLAYER',
      payload: {
        position: newPos,
        direction,
        spriteLocation: getSpriteDirection(direction),
      }
    })
  }

  function observeLimit(oldPos, newPos) {
    return (newPos[0] >= 0 && newPos[0] <= MAP_WIDTH - SPRITE_SIZE) &&
    (newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT - SPRITE_SIZE)
  }

  function observeImpassable(oldPos, newPos) {
    const tiles = store.getState().map.tiles
    const y = newPos[1] / SPRITE_SIZE
    const x = newPos[0] / SPRITE_SIZE
    const nextTile = tiles[y][x]
    return nextTile < 5
  }

  function directionMove(direction) {
    const oldPos = store.getState().player.position
    const newPos = getNewPosition(oldPos, direction)

    if(observeLimit(oldPos, newPos) && observeImpassable(oldPos, newPos))
      dispatchMove(direction, newPos)
  }

  function handleKeyDown(e) {
    e.preventDefault()

    switch (e.keyCode) {
      case 37:
        return directionMove('WEST')

      case 38:
        return directionMove('NORTH')

      case 39:
        return directionMove('EAST')

      case 40:
        return directionMove('SOUTH')
    
      default:
        console.log(e.keyCode)
      }
  }

  window.addEventListener('keydown', (e) => {
    handleKeyDown(e)
  })

  return player
}