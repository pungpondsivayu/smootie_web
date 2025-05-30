import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import Toast from "./components/global/Toast.tsx";

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <AppWrapper>
            <Toast />
            <App />
          </AppWrapper>
        </ThemeProvider>
      </PersistGate>
    </Provider>
);
