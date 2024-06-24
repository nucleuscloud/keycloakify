// Copy pasted from: https://github.com/InseeFrLab/keycloakify/blob/main/src/login/Template.tsx

import { usePrepareTemplate } from "keycloakify/lib/usePrepareTemplate";
import { type TemplateProps } from "keycloakify/login/TemplateProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import { clsx } from "keycloakify/tools/clsx";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect, useState } from "react";
import type { I18n } from "./i18n";
import type { KcContext } from "./kcContext";

export default function Template(props: TemplateProps<KcContext, I18n>) {
  const {
    displayInfo = false,
    displayMessage = true,
    displayRequiredFields = false,
    displayWide = false,
    showAnotherWayIfPresent = true,
    showUsernameNode = null,
    infoNode = null,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
    children,
  } = props;

  const { getClassName } = useGetClassName({ doUseDefaultCss, classes });

  const { msg } = i18n;

  const { auth, url, message, isAppInitiatedAction } = kcContext;

  useEffect(() => {
    posthog.init(kcContext.properties.POSTHOG_KEY ?? "fake-key", {
      api_host: kcContext.properties.POSTHOG_HOST,
    });
  }, [kcContext?.properties?.POSTHOG_KEY, kcContext?.properties?.POSTHOG_HOST]);

  const { isReady } = usePrepareTemplate({
    doFetchDefaultThemeResources: doUseDefaultCss,
    styles: [
      `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly.min.css`,
      `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly-additions.min.css`,
      `${url.resourcesCommonPath}/lib/zocial/zocial.css`,
      `${url.resourcesPath}/css/login.css`,
    ],
    htmlClassName: getClassName("kcHtmlClass"),
    bodyClassName: getClassName("kcBodyClass"),
  });

  useState(() => {
    document.title = i18n.msgStr("loginTitle", kcContext.realm.displayName);
  });

  if (!isReady) {
    return null;
  }

  return (
    <PostHogProvider client={posthog}>
      <div className={getClassName("kcLoginClass")}>
        <div
          className={clsx(
            getClassName("kcFormCardClass"),
            displayWide && getClassName("kcFormCardAccountClass")
          )}
        >
          <header className={getClassName("kcFormHeaderClass")}>
            {!(
              auth !== undefined &&
              auth.showUsername &&
              !auth.showResetCredentials
            ) ? (
              displayRequiredFields ? (
                <div className={getClassName("kcContentWrapperClass")}>
                  <div
                    className={clsx(
                      getClassName("kcLabelWrapperClass"),
                      "subtitle"
                    )}
                  >
                    <span className="subtitle">
                      <span className="required">*</span>
                      {msg("requiredFields")}
                    </span>
                  </div>
                  <div className="headerLogo">
                    <img
                      src="https://assets.nucleuscloud.com/neosync/app/logo_and_text_light_mode.svg"
                      alt="Neosync logo"
                      width={204}
                      height={40}
                    />
                  </div>
                </div>
              ) : (
                <div className="headerLogo">
                  <img
                    src="https://assets.nucleuscloud.com/neosync/app/logo_and_text_light_mode.svg"
                    alt="Neosync logo"
                    width={204}
                    height={40}
                  />
                </div>
              )
            ) : displayRequiredFields ? (
              <div className={getClassName("kcContentWrapperClass")}>
                <div
                  className={clsx(
                    getClassName("kcLabelWrapperClass"),
                    "subtitle"
                  )}
                >
                  <span className="subtitle">
                    <span className="required">*</span> {msg("requiredFields")}
                  </span>
                </div>
                <div className="col-md-10">
                  {showUsernameNode}
                  <div className={getClassName("kcFormGroupClass")}>
                    <div id="kc-username">
                      <label id="kc-attempted-username">
                        {auth?.attemptedUsername}
                      </label>
                      <a id="reset-login" href={url.loginRestartFlowUrl}>
                        <div className="kc-login-tooltip">
                          <i className={getClassName("kcResetFlowIcon")}></i>
                          <span className="kc-tooltip-text">
                            {msg("restartLoginTooltip")}
                          </span>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {showUsernameNode}
                <div className={getClassName("kcFormGroupClass")}>
                  <div id="kc-username">
                    <label id="kc-attempted-username">
                      {auth?.attemptedUsername}
                    </label>
                    <a id="reset-login" href={url.loginRestartFlowUrl}>
                      <div className="kc-login-tooltip">
                        <i className={getClassName("kcResetFlowIcon")}></i>
                        <span className="kc-tooltip-text">
                          {msg("restartLoginTooltip")}
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </>
            )}
          </header>
          <div id="kc-content">
            <div id="kc-content-wrapper" className="kcContentWrapper">
              {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
              {auth !== undefined &&
                auth.showTryAnotherWayLink &&
                showAnotherWayIfPresent && (
                  <form
                    id="kc-select-try-another-way-form"
                    action={url.loginAction}
                    method="post"
                    className={clsx(
                      displayWide && getClassName("kcContentWrapperClass")
                    )}
                  >
                    <div
                      className={clsx(
                        displayWide && [
                          getClassName("kcFormSocialAccountContentClass"),
                          getClassName("kcFormSocialAccountClass"),
                        ]
                      )}
                    >
                      <div className={getClassName("kcFormGroupClass")}>
                        <input type="hidden" name="tryAnotherWay" value="on" />
                        <a
                          href="#"
                          id="try-another-way"
                          onClick={() => {
                            document.forms[
                              "kc-select-try-another-way-form" as never
                            ].submit();
                            return false;
                          }}
                        >
                          {msg("doTryAnotherWay")}
                        </a>
                      </div>
                    </div>
                  </form>
                )}
              {displayMessage &&
                message !== undefined &&
                (message.type !== "warning" || !isAppInitiatedAction) && (
                  <div className={clsx("alert", `alert-${message.type}`)}>
                    {message.type === "success" && (
                      <span
                        className={getClassName("kcFeedbackSuccessIcon")}
                      ></span>
                    )}
                    {message.type === "warning" && (
                      <span
                        className={getClassName("kcFeedbackWarningIcon")}
                      ></span>
                    )}
                    {message.type === "error" && (
                      <span
                        className={getClassName("kcFeedbackErrorIcon")}
                      ></span>
                    )}
                    {message.type === "info" && (
                      <span
                        className={getClassName("kcFeedbackInfoIcon")}
                      ></span>
                    )}
                    <span
                      className="kc-feedback-text"
                      dangerouslySetInnerHTML={{
                        __html: message.summary,
                      }}
                    />
                  </div>
                )}
              {children}
              {displayInfo && (
                <div id="kc-info" className={getClassName("kcSignUpClass")}>
                  <div
                    id="kc-info-wrapper"
                    className={getClassName("kcInfoAreaWrapperClass")}
                  >
                    {infoNode}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="sideImageContent">
          <div>
            <div className="loginPageText">
              Deliver a better developer experience.
            </div>
            <div className="loginPageSubText">
              Anonymization. Synthetic Data. Subsetting. Orchestration.
            </div>
          </div>
          <img
            src="https://assets.nucleuscloud.com/neosync/app/dark-app.svg"
            alt="Neosync logo"
            style={{
              width: "90%",
              maxWidth: "100%",
              height: "auto",
              borderRadius: "10px",
              borderColor: "#686868",
              borderWidth: "2px",
              borderStyle: "solid",
            }}
          />
        </div>
      </div>
    </PostHogProvider>
  );
}
