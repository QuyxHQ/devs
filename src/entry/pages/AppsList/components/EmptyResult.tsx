import React, { useState } from "react";
import { EmptyResultIcon, Modal } from "../../..";
import { RegisterApp } from ".";

const EmptyResult = () => {
  const [displayModal, setDisplayModal] = useState<boolean>(false);

  return (
    <>
      <Modal
        setDisplayModal={setDisplayModal}
        displayModal={displayModal}
        children={<RegisterApp close={setDisplayModal} />}
      />

      <div className="error-div py-1 mb-5">
        <EmptyResultIcon width={265} height={265} />
        <h3>Empty Result</h3>

        <p>
          Register your first Quyx app?&nbsp;
          <a href="#" target="_blank">
            Learn more
          </a>
        </p>

        <button className="btn blue" onClick={() => setDisplayModal(true)}>
          Register App
        </button>
      </div>
    </>
  );
};

export default React.memo(EmptyResult);
