import { Provider } from 'react-redux'
import { store } from '../redux/store'
import GameArea from "../components/game-area";

export default function Home() {
  return (
    <Provider store={store}>
      <GameArea />
    </Provider>
  )
}
