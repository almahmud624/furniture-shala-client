import "./App.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./Routes/routes";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useContext } from "react";
import { DataStoreContext } from "./Context/DataProvider";
import Loader from "./Component/Loader";
const stripePromise = loadStripe(`${process.env.REACT_APP_stripe_pk}`);

function App() {
  const { isLoading } = useContext(DataStoreContext);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Elements stripe={stripePromise}>
          <RouterProvider router={routes} />
        </Elements>
      )}
    </>
  );
}

export default App;
