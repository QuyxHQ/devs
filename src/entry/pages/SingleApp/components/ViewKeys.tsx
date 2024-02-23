import { TbBulb } from "react-icons/tb";
import { FormGroup } from "../../..";

const ViewKeys = ({
  apiKey,
  clientID,
  close,
}: {
  apiKey: string;
  clientID: string;
  close: (value: boolean) => void;
}) => {
  return (
    <div className="keys">
      <h2 className="title">Quyx Access Keys</h2>

      <div className="col-12">
        <div className="row g-4">
          <div className="col-12 col-md-6">
            <FormGroup
              setter={() => {}}
              getter={apiKey}
              label="Api Key"
              readOnly
              inputType="text"
              className="mb-2"
            />

            <p className="mb-1 learn-more">
              <a href="#" target="_blank">
                Learn more
              </a>
            </p>
          </div>

          <div className="col-12 col-md-6">
            <FormGroup
              setter={() => {}}
              getter={clientID}
              label="Client ID"
              readOnly
              inputType="text"
              className="mb-2"
            />

            <p className="mb-1 learn-more">
              <a href="#" target="_blank">
                Learn more
              </a>
            </p>
          </div>

          <div className="col-12">
            <div className="docs">
              <h3>
                <TbBulb />
                <span>Know How</span>
              </h3>

              <p>
                For direct integration with our api you need to pass <code>{apiKey}</code>
                &nbsp; as an header: <code>quyx-api-key</code>, if working in the server
                side and pass <code>{clientID}</code> as an header:{" "}
                <code>quyx-client-id</code> for client side interaction
              </p>
            </div>
          </div>

          <div className="col-12">
            <button
              type="button"
              className="btn border"
              style={{ width: "100%", maxWidth: "8rem" }}
              onClick={() => close(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewKeys;
