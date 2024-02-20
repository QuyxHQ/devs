import { useAppStore } from "../../context/AppProvider";
import { useState } from "react";
import { AnchorLink, FormGroup, LoadingContentOnButton, Logo } from "../..";
import { api } from "../../../utils/class/api.class";
import { maskEmail } from "../../../utils/helpers";

const VerifyEmail = () => {
  const [otp, setOTP] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOTPSendLoading, setIsOTPSendingLoading] = useState<boolean>(false);

  const { userInfo } = useAppStore();

  async function verify(e: any) {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    const resp = await api.verifyOTP({ otp });
    if (resp) window.location.href = "/";

    setIsLoading(false);
  }

  async function resendOTP() {
    if (isOTPSendLoading) return;

    setIsOTPSendingLoading(true);
    await api.resendOTP();
    setIsOTPSendingLoading(false);
  }

  return (
    <section className="form-body d-flex flex-column align-items-center">
      <Logo width={50} height={50} />

      <form className="form-container py-5 px-4" onSubmit={verify}>
        <div className="mb-4">
          <h1>Verify Email</h1>
          <p className="intro">
            a 6-digit OTP code has been sent to your email:&nbsp;
            <strong>{maskEmail(userInfo?.email!)}</strong>
          </p>
        </div>

        <FormGroup
          className="mb-4"
          getter={otp}
          setter={setOTP}
          label="OTP Code"
          inputType="number"
          placeholder="e.g. 123456"
          required
        />

        <AnchorLink
          to="#"
          className="d-block mb-4 link-in-form"
          style={{ textAlign: "center" }}
          handleClick={resendOTP}
        >
          <p>{isOTPSendLoading ? "Resending.." : "Resend OTP"}</p>
        </AnchorLink>

        <button className="btn" type="submit" disabled={isLoading}>
          {isLoading ? <LoadingContentOnButton /> : "Continue"}
        </button>
      </form>

      <div className="extra">
        <p>Thinking of doing this later?</p>
        <AnchorLink to="/">
          <span>Skip &raquo;</span>
        </AnchorLink>
      </div>
    </section>
  );
};

export default VerifyEmail;
