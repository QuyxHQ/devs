import { useState } from "react";
import { AnchorLink, FormGroup, LoadingContentOnButton, Logo } from "../..";
import { api } from "../../../utils/class/api.class";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function forgotPassword(e: any) {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    await api.forgotPassword({ email });
    setIsLoading(false);
  }

  return (
    <section className="form-body d-flex flex-column align-items-center">
      <Logo width={50} height={50} />

      <form className="form-container py-5 px-4" onSubmit={forgotPassword}>
        <div className="mb-4">
          <h1>Forgot Password?</h1>
          <p className="intro">
            Provide your registered email address so we can send you a password reset link
          </p>
        </div>

        <FormGroup
          className="mb-4"
          getter={email}
          setter={setEmail}
          label="Email address"
          inputType="email"
          placeholder="e.g. user@domain.ltd"
          required
        />

        <button className="btn" type="submit" disabled={isLoading}>
          {isLoading ? <LoadingContentOnButton /> : "Reset Password"}
        </button>
      </form>

      <div className="extra">
        <p>Remembered password?</p>
        <AnchorLink to="/login">
          <span>Login &raquo;</span>
        </AnchorLink>
      </div>
    </section>
  );
};

export default ForgotPassword;
