import "./App.css";
import PhotoContainer from "./components/PhotoContainer";
import { Provider } from "react-redux";
import store from "./redux/store";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h2>JSON Photos:</h2>
        <PhotoContainer />
      </div>
    </Provider>
  );
}

export default App;
