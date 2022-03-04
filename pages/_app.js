import "bootstrap/dist/css/bootstrap.min.css";
import { store } from "../store/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'


function LiveUpApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
      <ToastContainer />
    </>
  );
}

export default LiveUpApp;
