import React, { useState } from "react";
import { FormGroup, LoadingContentOnButton, TagsInput } from "../../..";
import { TbChevronDown, TbChevronUp } from "react-icons/tb";
import { api } from "../../../../utils/class/api.class";
import { useAppStore } from "../../../context/AppProvider";

const AppEditModal = ({
  close,
  data,
}: {
  data: QuyxApp;
  close: (value: boolean) => void;
}) => {
  const { refresh } = useAppStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [id, setId] = useState<string>(data._id);
  const [name, setName] = useState<string>(data.name);
  const [description, setDescription] = useState<string>(data.description);

  const [allowedDomains, setAllowedDomains] = useState<string>(
    data.allowedDomains ? data.allowedDomains.join(",") : ""
  );

  const [allowedBundleIDs, setAllowedBundleIDs] = useState<string>(
    data.allowedBundleIDs ? data.allowedBundleIDs.join(",") : ""
  );

  const [whitelistedAddresses, setWhitelistedAddresses] = useState<string>(
    data.whitelistedAddresses ? data.whitelistedAddresses.join(",") : ""
  );

  const [blacklistedAddresses, setBlacklistedAddresses] = useState<string>(
    data.blacklistedAddresses ? data.blacklistedAddresses.join(",") : ""
  );

  //# for accordion
  const [openedIndex, setOpenedIndex] = useState<number>(0);

  const accordion = [
    {
      title: "Allowed Domains",
      component: (
        <AllowedDomainsComponent setter={setAllowedDomains} getter={allowedDomains} />
      ),
    },
    {
      title: "Allowed Bundle IDs",
      component: (
        <AllowedBundleIdsComponent
          setter={setAllowedBundleIDs}
          getter={allowedBundleIDs}
        />
      ),
    },
    {
      title: "Addresses Access",
      component: (
        <AddressesAccessComponent
          whitelistGetter={whitelistedAddresses}
          whitelistSetter={setWhitelistedAddresses}
          blacklistGetter={blacklistedAddresses}
          blacklistSetter={setBlacklistedAddresses}
        />
      ),
    },
  ];

  async function updateApp() {
    if (isLoading) return;
    setIsLoading(true);

    const resp = await api.editApp({
      app: data._id,
      name,
      description,
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

  async function deleteApp() {
    if (isLoading) return;
    if (!confirm("Are you sure you want to delete this app?!")) return;
    setIsLoading(true);

    const resp = await api.deleteApp({ app: data._id });
    if (resp) {
      refresh(); //# internal refresh
      close(false); //# close the modal
    }

    setIsLoading(false);
  }

  return (
    <div className="app-details">
      <h2 className="title">App Details</h2>

      <div className="col-12 mb-4">
        <div className="row g-4">
          <div className="col-12 col-md-7">
            <FormGroup
              setter={setId}
              getter={id}
              label="App ID"
              readOnly
              inputType="text"
              className="mb-4"
            />

            <FormGroup
              setter={setName}
              getter={name}
              label="App name"
              inputType="text"
              required
              placeholder="e.g. SocialFi Integration"
            />
          </div>

          <div className="col-12 col-md-5">
            <div className="access-integrations ps-md-4">
              <FormGroup
                setter={setDescription}
                getter={description}
                label="Description"
                inputType="textarea"
                required
                placeholder="Short description of what this app is about"
                rows={6}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 mb-4">
        <div className="accordion mb-3">
          {accordion.map((item, index) => (
            <div className="single-accordion" key={`accordion-${index}`}>
              <div
                className={`accordion-header d-flex align-items-center justify-content-between ${
                  openedIndex == index ? "active" : ""
                }`}
                onClick={() => setOpenedIndex(index)}
              >
                <h4>{item.title}</h4>

                {openedIndex == index ? <TbChevronUp /> : <TbChevronDown />}
              </div>

              {openedIndex == index ? (
                <div className="accordion-item">{item.component}</div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="col-12">
        <div className="row g-2">
          <div className="col-6 col-sm-3 col-md-2">
            <button className="btn danger" disabled={isLoading} onClick={deleteApp}>
              {isLoading ? <LoadingContentOnButton text="..." /> : "Delete"}
            </button>
          </div>

          <div className="col-6 col-sm-3 col-md-2">
            <button className="btn border" type="button" onClick={() => close(false)}>
              Cancel
            </button>
          </div>

          <div className="col-sm-3 col-md-6 d-none d-sm-block" />

          <div className="col-12 col-sm-3 col-md-2">
            <button className="btn" disabled={isLoading} onClick={updateApp}>
              {isLoading ? <LoadingContentOnButton text="..." /> : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AllowedDomainsComponent = ({
  setter,
  getter,
}: {
  setter: React.Dispatch<React.SetStateAction<string>>;
  getter: string;
}) => {
  return (
    <>
      <TagsInput
        setter={setter}
        getter={getter}
        label="E.g. google.com, facebook.com, e.t.c."
        placeholder="e.g. domain.ltd"
        className="mb-3"
      />

      <p className="learn-more">
        <a href="#" target="_blank">
          Learn more
        </a>
      </p>
    </>
  );
};

const AllowedBundleIdsComponent = ({
  setter,
  getter,
}: {
  setter: React.Dispatch<React.SetStateAction<string>>;
  getter: string;
}) => {
  return (
    <>
      <TagsInput
        setter={setter}
        getter={getter}
        label="Apps Bundle IDs"
        placeholder="e.g. ltd.package.name"
        className="mb-3"
      />

      <p className="learn-more">
        <a href="#" target="_blank">
          Learn more
        </a>
      </p>
    </>
  );
};

const AddressesAccessComponent = ({
  whitelistGetter,
  whitelistSetter,
  blacklistGetter,
  blacklistSetter,
}: {
  whitelistSetter: React.Dispatch<React.SetStateAction<string>>;
  whitelistGetter: string;
  blacklistSetter: React.Dispatch<React.SetStateAction<string>>;
  blacklistGetter: string;
}) => {
  const [selected, setSelected] = useState<"b" | "w">("w");

  return (
    <div style={{ width: "100%" }}>
      <div className="d-flex align-items-center address-w-b">
        <div>
          <input
            type="radio"
            name="type"
            id="type-whitelist"
            defaultChecked
            value="w"
            onChange={(e) => setSelected(e.target.value as "b" | "w")}
          />
        </div>

        <div>
          <label className="pointer" htmlFor="type-whitelist">
            <h4>Whitelisted Addresses</h4>
          </label>

          {selected == "w" ? (
            <>
              <TagsInput
                setter={whitelistSetter}
                getter={whitelistGetter}
                label="Addresses"
                placeholder="e.g.  0x0........"
                className="mb-3 mt-2"
              />

              <p className="mb-4 learn-more">
                <a href="#" target="_blank">
                  Learn more
                </a>
              </p>
            </>
          ) : null}
        </div>
      </div>

      <div className="d-flex align-items-center address-w-b">
        <div>
          <input
            type="radio"
            name="type"
            id="type-blacklist"
            value="b"
            onChange={(e) => setSelected(e.target.value as "b" | "w")}
          />
        </div>

        <div>
          <label className="pointer" htmlFor="type-blacklist">
            <h4>Blacklisted Addresses</h4>
          </label>

          {selected == "b" ? (
            <>
              <TagsInput
                setter={blacklistSetter}
                getter={blacklistGetter}
                label="Addresses"
                placeholder="e.g.  0x0........"
                className="mb-3 mt-2"
              />

              <p className="learn-more">
                <a href="#" target="_blank">
                  Learn more
                </a>
              </p>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AppEditModal;
