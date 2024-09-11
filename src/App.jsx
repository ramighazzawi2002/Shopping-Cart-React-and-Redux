import { Provider } from "react-redux";
import store from "./store/store.jsx";
import ProductList from "./productList.jsx";
import Cart from "./cart.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<ProductList />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
          </Routes>
        </Provider>
      </Router>
    </>
  );
}

export default App;
