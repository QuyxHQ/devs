import { useState } from "react";
import { AnchorLink, FormGroup, LoadingContentOnButton, Logo, OAuthButtons } from "../..";
import { api } from "../../../utils/class/api.class";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function register(e: any) {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    const resp = await api.register({
      email,
      password,
      firstName,
      lastName,
      company,
    });

    if (resp) window.location.href = "/verify";

    setIsLoading(false);
  }

  return (
    <section className="form-body d-flex flex-column align-items-center">
      <Logo width={50} height={50} />

      <form className="form-container py-5 px-4" onSubmit={register}>
        <h1 className="mb-4 pb-2">Get Started</h1>
        <div className="row">
          <div className="col-6">
            <FormGroup
              className="mb-4"
              getter={firstName}
              setter={setFirstName}
              label="First name"
              inputType="text"
              placeholder="e.g. John"
              required
            />
          </div>

          <div className="col-6">
            <FormGroup
              className="mb-4"
              getter={lastName}
              setter={setLastName}
              label="Last name"
              inputType="text"
              placeholder="e.g. Doe"
              required
            />
          </div>
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

        <FormGroup
          className="mb-4"
          getter={company}
          setter={setCompany}
          label="Company"
          inputType="text"
          placeholder="e.g. QuyxHQ"
          required
        />

        <FormGroup
          className="mb-4"
          getter={password}
          setter={setPassword}
          label="Password"
          inputType="password"
          placeholder="********"
          isPasswordField
          required
        />

        <button className="btn" type="submit" disabled={isLoading}>
          {isLoading ? <LoadingContentOnButton /> : "Sign up"}
        </button>

        <OAuthButtons redirect_to="/get-started" />
      </form>

      <div className="extra">
        <p>Already own an account?</p>
        <AnchorLink to="/login">
          <span>Login &raquo;</span>
        </AnchorLink>
      </div>
    </section>
  );
};

export default Register;
