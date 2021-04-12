import { createStore, combineReducers } from 'redux'
import mapReducer from '../features/maps/reducer'
import playerReducer from '../features/player/reducer'

const rootReducer = combineReducers({
  player : playerReducer,
  map : mapReducer,
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store