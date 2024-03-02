import React, { useState } from "react";
import { FormGroup, LoadingContentOnButton, TagsInput } from "../../..";
import { api } from "../../../../utils/class/api.class";
import { useAppStore } from "../../../context/AppProvider";

const RegisterApp = ({ close }: { close: (val: boolean) => void }) => {
  const { refresh } = useAppStore();

  const [name, setName] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [allowedDomains, setAllowedDomains] = useState<string>("");
  const [allowedBundleIDs, setAllowedBundleIDs] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function registerApp(e: any) {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    const resp = await api.addApp({
      name,
      url: url,
      description,
      webhook: null,
      whitelistedAddresses: null,
      blacklistedAddresses: null,
      allowedBundleIDs: allowedBundleIDs.length == 0 ? null : allowedBundleIDs.split(","),
      allowedDomains: allowedDomains.length == 0 ? null : allowedDomains.split(","),
    });

    if (resp) {
      refresh(); //# internal refresh
      close(false); //# close the modal
    }

    setIsLoading(false);
  }

  return (
    <div className="register-app">
      <h2 className="title">Register new app</h2>

      <form className="row g-4" action="#" method="post" onSubmit={registerApp}>
        <div className="col-12 col-md-6">
          <div>
            <FormGroup
              setter={setName}
              getter={name}
              label="App name"
              inputType="text"
              placeholder="e.g. SocialFi Integration"
              className="mb-4"
              required
            />

            <FormGroup
              setter={setUrl}
              getter={url}
              label="App URL"
              inputType="url"
              required
              placeholder="e.g. https://domain.ltd"
              className="mb-4"
            />

            <FormGroup
              setter={setDescription}
              getter={description}
              label="Description"
              inputType="textarea"
              placeholder="Short description of what this app is about"
              rows={5}
              required
            />
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="access-integrations ps-md-4">
            <h4 className="mb-4">Access Restrictions</h4>

            <TagsInput
              setter={setAllowedDomains}
              getter={allowedDomains}
              label="Allowed Domain (optional)"
              className="mb-2"
              placeholder="e.g. domain.ltd"
            />

            <p className="mb-4 learn-more">
              <a href="#" target="_blank">
                Learn more
              </a>
            </p>

            <TagsInput
              setter={setAllowedBundleIDs}
              getter={allowedBundleIDs}
              label="Allowed Bundle ID (optional)"
              className="mb-2"
            />

            <p className="mb-4 learn-more">
              <a href="#" target="_blank">
                Learn more
              </a>
            </p>

            <div className="col-12">
              <div className="row g-2">
                <div className="col-6">
                  <button
                    className="btn border"
                    type="button"
                    onClick={() => close(false)}
                  >
                    Cancel
                  </button>
                </div>

                <div className="col-6">
                  <button className="btn" disabled={isLoading}>
                    {isLoading ? <LoadingContentOnButton /> : "Proceed"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default React.memo(RegisterApp);
