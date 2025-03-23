import { Provider } from "react-redux";
import "./App.scss";
import PortfolioOverview from "./pages/PortfolioOverview";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <PortfolioOverview />
    </Provider>
  );
}

export default App;
