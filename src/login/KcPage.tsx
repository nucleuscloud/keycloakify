import type { ClassKey } from "keycloakify/login";
import DefaultPage from "keycloakify/login/DefaultPage";
import { Suspense, lazy } from "react";
import { useI18n } from "./i18n";
import "./KcApp.css";
import type { KcContext } from "./KcContext";
import Template from "./Template";
const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);

const doMakeUserConfirmPassword = true;

const Login = lazy(() => import("./pages/Login"));

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    case "login.ftl":
                        return (
                            <Login
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    default:
                        return (
                            <DefaultPage
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={true}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                }
            })()}
        </Suspense>
    );
}

const classes = {
    kcHtmlClass: "my-root-class",
    kcHeaderWrapperClass: "my-color"
} satisfies { [key in ClassKey]?: string };
