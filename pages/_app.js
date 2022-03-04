import "bootstrap/dist/css/bootstrap.min.css";
import { store } from "../store/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Layout from "../components/layout";


function LiveUpApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
      <ToastContainer />
    </>
  );
}

export default LiveUpApp;
