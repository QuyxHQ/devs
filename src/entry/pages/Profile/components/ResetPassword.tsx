import { useState } from "react";
import { FormGroup, LoadingContentOnButton } from "../../..";
import { api } from "../../../../utils/class/api.class";
import { TOAST_STATUS, customToast } from "../../../../utils/toast.utils";

const ResetPassword = ({ close }: { close: (value: boolean) => void }) => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function resetPassword(e: any) {
    e.preventDefault();
    if (isLoading) return;

    if (confirmNewPassword != newPassword) {
      customToast({
        type: TOAST_STATUS.ERROR,
        message: "Passwords don't match",
      });

      return;
    }

    setIsLoading(true);
    const resp = await api.changePassword({ oldPassword, newPassword });
    if (resp) {
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");

      close(false);
    }

    setIsLoading(false);
  }

  return (
    <div>
      <h2 className="title mb-4 text-center py-2">Reset Password</h2>

      <form action="#" method="post" onSubmit={resetPassword}>
        <FormGroup
          setter={setOldPassword}
          getter={oldPassword}
          label="Old password"
          inputType="password"
          required
          isPasswordField
          placeholder="Current password"
          className="mb-4"
        />

        <div className="col-12 mb-4">
          <div className="row g-4">
            <div className="col-12 col-sm-6">
              <FormGroup
                setter={setNewPassword}
                getter={newPassword}
                label="New password"
                inputType="password"
                required
                isPasswordField
                placeholder="Preferred new password"
              />
            </div>

            <div className="col-12 col-sm-6">
              <FormGroup
                setter={setConfirmNewPassword}
                getter={confirmNewPassword}
                label="Confirm new password"
                inputType="password"
                required
                isPasswordField
                placeholder="Confirm new password"
              />
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="row g-2">
            <div className="col-6 col-sm-3 col-md-2">
              <button className="btn border" type="button" onClick={() => close(false)}>
                Cancel
              </button>
            </div>

            <div className="d-none col-sm-6 col-md-7 d-sm-block" />

            <div className="col-6 col-sm-3">
              <button className="btn" disabled={isLoading}>
                {isLoading ? <LoadingContentOnButton /> : "Proceed"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
