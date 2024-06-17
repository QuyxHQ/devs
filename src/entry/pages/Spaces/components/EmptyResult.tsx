import { useState } from 'react';
import { EmptyResultIcon, Modal } from '../../..';
import { CreateSpace } from '.';
import settings from '../../../../utils/settings';

const EmptyResult = () => {
    const [displayModal, setDisplayModal] = useState<boolean>(false);

    return (
        <>
            <Modal
                setDisplayModal={setDisplayModal}
                displayModal={displayModal}
                children={<CreateSpace close={setDisplayModal} />}
                size="md"
            />

            <div className="error-div py-1 mb-5">
                <EmptyResultIcon width={265} height={265} />
                <h3>Empty Result</h3>

                <p>
                    Create your first space?&nbsp;
                    <a href={`${settings.DOCS_URL}/space`} target="_blank">
                        Learn more
                    </a>
                </p>

                <button className="btn blue" onClick={() => setDisplayModal(true)}>
                    Create space
                </button>
            </div>
        </>
    );
};

export default EmptyResult;
