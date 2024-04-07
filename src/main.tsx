import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { kcContext as kcAccountThemeContext } from "./account/kcContext";
import { kcContext as kcLoginThemeContext } from "./login/kcContext";
import PHProvider from "./PosthogProvider";

const KcLoginThemeApp = lazy(() => import("./login/KcApp"));
const KcAccountThemeApp = lazy(() => import("./account/KcApp"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense>
      <PHProvider>
        {(() => {
          if (kcLoginThemeContext !== undefined) {
            return <KcLoginThemeApp kcContext={kcLoginThemeContext} />;
          }

          if (kcAccountThemeContext !== undefined) {
            return <KcAccountThemeApp kcContext={kcAccountThemeContext} />;
          }

          throw new Error(
            "This app is a Keycloak theme" +
              "It isn't meant to be deployed outside of Keycloak"
          );
        })()}
      </PHProvider>
    </Suspense>
  </StrictMode>
);
