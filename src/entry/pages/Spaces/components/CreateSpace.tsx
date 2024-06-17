import { useState } from 'react';
import { FormGroup, LoadingContentOnButton } from '../../..';
import { api } from '../../../../utils/class/api.class';
import { useAppStore } from '../../../context/AppProvider';

const CreateSpace = ({ close }: { close: (val: boolean) => void }) => {
    const { refresh } = useAppStore();

    const [name, setName] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function create(e: any) {
        e.preventDefault();
        if (isLoading) return;

        setIsLoading(true);

        const resp = await api.createSpace({ name, url: url || undefined });

        if (resp) {
            refresh(); //# internal refresh
            close(false); //# close the modal
        }

        setIsLoading(false);
    }

    return (
        <div className="register-app">
            <h2 className="title">Create new space</h2>

            <form className="row g-3" action="#" method="post" onSubmit={create}>
                <div className="col-12 mb-2">
                    <div>
                        <FormGroup
                            setter={setName}
                            getter={name}
                            label="App name *"
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
                            placeholder="e.g. https://domain.ltd"
                        />
                    </div>
                </div>

                <div className="col-12">
                    <div className="row g-2">
                        <div className="col-5">
                            <button
                                className="btn border"
                                type="button"
                                onClick={() => close(false)}
                            >
                                Cancel
                            </button>
                        </div>

                        <div className="col-7">
                            <button className="btn" disabled={isLoading}>
                                {isLoading ? <LoadingContentOnButton /> : 'Proceed'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateSpace;
