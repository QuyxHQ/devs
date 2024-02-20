import { useEffect, useState } from "react";
import { api } from "../../../utils/class/api.class";
import { useParams } from "react-router-dom";
import {
  AnchorLink,
  BugIcon,
  FormGroup,
  Loader,
  LoadingContentOnButton,
  Logo,
} from "../..";

const ResetPassword = () => {
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false);

  const { hash } = useParams() as { hash: string };

  useEffect(() => {
    (async function () {
      setIsLoading(true);

      const resp = await api.verifyResetPasswordHash({ hash });
      if (!resp.status) setError(resp.message);

      setIsLoading(false);
    })();
  }, [hash]);

  async function resetPassword() {
    if (!isBtnLoading) return;

    setIsBtnLoading(true);
    await api.resetPassword({ hash, password });
    setIsBtnLoading(false);
  }

  return (
    <section className="form-body d-flex flex-column align-items-center">
      <Logo width={50} height={50} />

      <form className="form-container py-5 px-4" onSubmit={resetPassword}>
        <div className="mb-4">
          <h1>Reset Password</h1>
          <p className="intro">Get to change your password instantly</p>
        </div>

        {isLoading ? (
          <div className="d-flex align-items-center justify-content-center py-4">
            <Loader width={30} height={30} fill="#aaa" />
          </div>
        ) : error ? (
          <div
            className="d-flex flex-column pt-4 pb-2 align-items-center justify-content-center"
            style={{ gap: "1.3rem" }}
          >
            <BugIcon width={60} height={60} />
            <p
              className="title-case mb-2"
              style={{
                width: "65%",
                textAlign: "center",
                lineHeight: "170%",
                fontSize: "0.9rem",
                color: "#888",
              }}
            >
              {error}
            </p>

            <AnchorLink to="/">
              <button type="button" className="btn">
                Head back home
              </button>
            </AnchorLink>
          </div>
        ) : (
          <>
            <FormGroup
              className="mb-4"
              getter={password}
              setter={setPassword}
              label="Password (new)"
              inputType="password"
              placeholder="e.g. ********"
              isPasswordField
              required
            />

            <button className="btn" type="submit" disabled={isBtnLoading}>
              {isBtnLoading ? <LoadingContentOnButton /> : "Reset Password"}
            </button>
          </>
        )}
      </form>
    </section>
  );
};

export default ResetPassword;
