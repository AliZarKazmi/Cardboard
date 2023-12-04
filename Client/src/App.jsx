import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import IndexPage from "./Pages/IndexPage";
import Root from "./Component/Root";
import CardBoardPage from "./Pages/CardBoardPage/CardBoardPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ReelsPage from "./Pages/ReelsPage/ReelsPage";
import RollsPage from "./Pages/RollsPage/RollsPage";
import ProductDisplay from "./Pages/ProductDisplay";
import RequestQute from "./Pages/RequestQute";
import ProductDetails from "./Pages/ProductDetails";
import ShippingCart from "./Pages/ShoppingCart/ShippingCart";
import CheckoutPage from "./Pages/Checkout/Checkout";
import BoxModel from "./Pages/BoxModelPage";
import NewBoxModel from "./Pages/NewBoxModelPage";
import RollDisplay from "./Pages/RollDisplay";
import ReelDisplay from "./Pages/ReelDisplay";
import SignIn from "./Pages/SignInPage";
import LoginPage from "./Pages/LogInPage/LoginPage";
import ProfilePage from "./Pages/ProfilePage";

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<IndexPage />} />
      <Route path="/Cardboards" element={<CardBoardPage />} />
      <Route path="/Product-Details" element={<ProductDetails />} />
      <Route path="/Reels" element={<ReelsPage />} />
      <Route path="/Rolls" element={<RollsPage />} />
      <Route path="/ProductDisplay" element={<ProductDisplay />} />
      <Route path="/RequestQute" element={<RequestQute />} />
      <Route path="/Checkout" element={<CheckoutPage />} />
      <Route path="/ProductDisplay/:id" element={<ProductDisplay />} />
      <Route path="/RequestQute" element={<RequestQute />} />
      <Route path="/ShippingCart" element={<ShippingCart />} />
      <Route path="/CardboardManipulation" element={<BoxModel />} />
      <Route path="/CardboardManipulations" element={<NewBoxModel />} />
      <Route path="/RollDisplay/:id" element={<RollDisplay />} />
      <Route path="/ReelDisplay/:id" element={<ReelDisplay />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/Profile" element={<ProfilePage />} />
    </Route>
  )
);
function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
