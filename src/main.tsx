import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { kcContext as kcAccountThemeContext } from "./account/kcContext";
import { kcContext as kcLoginThemeContext } from "./login/kcContext";

const KcLoginThemeApp = lazy(() => import("./login/KcApp"));
const KcAccountThemeApp = lazy(() => import("./account/KcApp"));

import { PostHogProvider } from "posthog-js/react";

const options = {
  api_host: "https://app.posthog.com",
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense>
      <PostHogProvider
        apiKey="phc_yc5YUhGheWJL8XSKlLQJ9DYOH5Fi1IQyi7RB1TD4eyAY"
        options={options}
      >
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
      </PostHogProvider>
    </Suspense>
  </StrictMode>
);
