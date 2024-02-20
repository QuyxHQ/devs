import { useState } from "react";
import { AnchorLink, FormGroup, LoadingContentOnButton, Logo } from "../..";
import { FcGoogle } from "react-icons/fc";
import { RxGithubLogo } from "react-icons/rx";
import { api } from "../../../utils/class/api.class";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function login(e: any) {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    const resp = await api.login({ email, password });
    if (resp) window.location.href = "/";

    setIsLoading(false);
  }

  return (
    <section className="form-body d-flex flex-column align-items-center">
      <Logo width={50} height={50} />

      <form className="form-container py-5 px-4" onSubmit={login}>
        <h1 className="mb-4 pb-2">Hodwy! Dev</h1>

        <FormGroup
          className="mb-4"
          getter={email}
          setter={setEmail}
          label="Email address"
          inputType="email"
          placeholder="e.g. user@domain.ltd"
          required
        />

        <FormGroup
          className="mb-3"
          getter={password}
          setter={setPassword}
          label="Password"
          inputType="password"
          placeholder="********"
          isPasswordField
          required
        />

        <AnchorLink to="/forgot-password" className="d-block mb-4 link-in-form pb-2">
          <p>Forgot Password?</p>
        </AnchorLink>

        <button className="btn" type="submit" disabled={isLoading}>
          {isLoading ? <LoadingContentOnButton /> : "Log in"}
        </button>

        <div className="d-flex align-items-center or my-4">
          <hr />
          <span>or</span>
          <hr />
        </div>

        <button className="oauth-btn mb-2" type="button" disabled>
          <FcGoogle size={18} />
          <span>Continue with Google</span>
        </button>

        <button className="oauth-btn" type="button" disabled>
          <RxGithubLogo size={18} />
          <span>Continue with GitHub</span>
        </button>
      </form>

      <div className="extra">
        <p>Don't have an account yet?</p>
        <AnchorLink to="/get-started">
          <span>Sign up &raquo;</span>
        </AnchorLink>
      </div>
    </section>
  );
};

export default Login;
