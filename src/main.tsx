import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import ScriptLoader from "$/components/shared/ScriptLoader.tsx";

import App from "./App.tsx";
import "./index.css";
import AuthProvider from "./providers/auth.provider.tsx";
import CurrencyProvider from "./providers/currency.provider.tsx";
import SettingsProvider from "./providers/settings.provider.tsx";
import "./styles/animations.css";
import "./styles/css/animate.css";
import "./styles/css/bootstrap-select.min.css";
import "./styles/css/bootstrap.min.css";
import "./styles/css/drift-basic.min.css";
import "./styles/css/image-compare-viewer.min.css";
import "./styles/css/jquery.fancybox.min.css";
import "./styles/css/photoswipe.css";
import "./styles/css/styles.css";
import "./styles/css/swiper-bundle.min.css";
import "./styles/fonts/font-icons.css";
import "./styles/fonts/fonts.css";
import "./styles/index.css";

// Tailwind entry (process Tailwind directives first)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      onSuccess() {},
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CurrencyProvider>
          <SettingsProvider>
            <BrowserRouter>
              <ScriptLoader />
              <App />
            </BrowserRouter>
          </SettingsProvider>
        </CurrencyProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
