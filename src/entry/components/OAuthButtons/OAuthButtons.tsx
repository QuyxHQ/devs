import { useState } from "react";
import settings from "../../../utils/settings";
import { FcGoogle } from "react-icons/fc";
import { RxGithubLogo } from "react-icons/rx";
import { LoadingContentOnButton } from "..";

const OAuthButtons = ({ redirect_to }: { redirect_to: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function oauthRedirect(path: string) {
    if (isLoading) return;
    setIsLoading(true);

    setTimeout(() => {
      window.location.href = `${settings.ENDPOINT_URL}${path}?path=${redirect_to}`;
    }, 500);
  }

  return (
    <>
      <div className="d-flex align-items-center or my-4">
        <hr />
        <span>or</span>
        <hr />
      </div>

      <button
        className="oauth-btn mb-2"
        type="button"
        onClick={() => oauthRedirect("/dev/oauth/init/google")}
        disabled={isLoading}
      >
        {isLoading ? (
          <LoadingContentOnButton text="..." color="#000" />
        ) : (
          <>
            <FcGoogle size={18} />
            <span>Continue with Google</span>
          </>
        )}
      </button>

      <button
        className="oauth-btn"
        type="button"
        onClick={() => oauthRedirect("/dev/oauth/init/github")}
        disabled={isLoading}
      >
        {isLoading ? (
          <LoadingContentOnButton text="..." color="#000" />
        ) : (
          <>
            <RxGithubLogo size={18} />
            <span>Continue with GitHub</span>
          </>
        )}
      </button>
    </>
  );
};

export default OAuthButtons;
