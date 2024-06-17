import { TbBulb } from 'react-icons/tb';
import { FormGroup } from '../../..';

type Props = {
    keys: { pk: string; sk: string };
    close: (value: boolean) => void;
};

const ViewKeys = ({ keys, close }: Props) => {
    return (
        <div className="keys">
            <h2 className="title">Quyx Access Keys</h2>

            <div className="col-12">
                <div className="row g-4">
                    <div className="col-12">
                        <FormGroup
                            setter={() => {}}
                            getter={keys.pk}
                            label="Public Key"
                            readOnly
                            inputType="text"
                            className="mb-2"
                        />
                    </div>

                    <div className="col-12">
                        <FormGroup
                            setter={() => {}}
                            getter={keys.sk}
                            label="Secret Key"
                            readOnly
                            inputType="text"
                            className="mb-2"
                        />
                    </div>

                    <div className="col-12">
                        <div className="docs">
                            <h3>
                                <TbBulb />
                                <span>Know how</span>
                            </h3>

                            <p>
                                For direct integration with our api you need to pass the space{' '}
                                <code>secret key</code> when working on the server side and{' '}
                                <code>public key</code> when working on the client side. Check out
                                documentation for better guidance
                            </p>
                        </div>
                    </div>

                    <div className="col-12">
                        <button
                            type="button"
                            className="btn border"
                            style={{ width: '100%', maxWidth: '8rem' }}
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
