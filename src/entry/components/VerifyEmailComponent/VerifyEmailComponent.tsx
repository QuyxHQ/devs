import { useState } from "react";
import { maskEmail } from "../../../utils/helpers";
import { useAppStore } from "../../context/AppProvider";
import { api } from "../../../utils/class/api.class";
import { FormGroup, LoadingContentOnButton } from "..";

const VerifyEmailComponent = ({ close }: { close: (value: boolean) => void }) => {
  const { userInfo } = useAppStore();

  const [otp, setOTP] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOTPSendLoading, setIsOTPSendingLoading] = useState<boolean>(false);
  const [isOTPSent, setIsOTPSent] = useState<boolean>(false);

  async function verify(e: any) {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    const resp = await api.verifyOTP({ otp });
    if (resp) window.location.reload();

    setIsLoading(false);
  }

  async function resendOTP() {
    if (isOTPSendLoading) return;

    setIsOTPSendingLoading(true);
    const resp = await api.resendOTP();
    if (resp) setIsOTPSent(true);

    setIsOTPSendingLoading(false);
  }

  return (
    <div>
      {isOTPSent ? (
        <div className="pre-verify">
          <h3>Verify OTP</h3>
          <p>
            a 6-digit OTP code has been sent to your email:&nbsp;
            <strong>{maskEmail(userInfo?.email!)}</strong>
          </p>

          <FormGroup
            setter={setOTP}
            getter={otp}
            label="OTP Code"
            className="mb-4"
            inputType="number"
            placeholder="e.g. 123456"
            required
          />

          <div className="col-12">
            <div className="row g-2">
              <div className="col-6">
                <button className="btn border" type="button" onClick={() => close(false)}>
                  Cancel
                </button>
              </div>

              <div className="col-6">
                <button className="btn" disabled={isLoading} onClick={verify}>
                  {isLoading ? <LoadingContentOnButton /> : "Verify"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="pre-verify">
          <h3>Verify Email Address</h3>
          <p>
            Howdy! {userInfo?.firstName}, by clicking on the "Continue" button, an OTP
            code will be sent to <strong>{maskEmail(userInfo?.email!)}</strong>
          </p>

          <div className="col-12">
            <div className="row g-2">
              <div className="col-6">
                <button className="btn border" type="button" onClick={() => close(false)}>
                  Cancel
                </button>
              </div>

              <div className="col-6">
                <button className="btn" disabled={isOTPSendLoading} onClick={resendOTP}>
                  {isOTPSendLoading ? <LoadingContentOnButton /> : "Continue"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmailComponent;
