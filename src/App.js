import "./App.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./Routes/routes";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(`${process.env.REACT_APP_stripe_pk}`);
function App() {
  return (
    <>
      <Elements stripe={stripePromise}>
        <RouterProvider router={routes} />
      </Elements>
    </>
  );
}

export default App;
