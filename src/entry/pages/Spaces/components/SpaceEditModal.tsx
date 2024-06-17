import { useEffect, useState } from 'react';
import { FormGroup, LoadingContentOnButton } from '../../..';
import { api } from '../../../../utils/class/api.class';
import { useAppStore } from '../../../context/AppProvider';

type Props = { data: Space; close: (value: boolean) => void };

const SpaceEditModal = ({ close, data: parsedData }: Props) => {
    const { refresh } = useAppStore();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [id, setId] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [did, setDid] = useState<string>('');
    const [url, setUrl] = useState<string>('');

    useEffect(() => {
        setId(parsedData._id);
        setName(parsedData.name);
        setDid(parsedData.did);
        setUrl(parsedData.url || '');
    }, [parsedData]);

    async function updateSpace(e: any) {
        e.preventDefault();

        if (isLoading) return;
        setIsLoading(true);

        const resp = await api.updateSpace({ did, name, url: url || undefined });

        if (resp) {
            refresh(); //# internal refresh
            close(false); //# close the modal
        }

        setIsLoading(false);
    }

    async function deleteSpace() {
        if (isLoading) return;
        if (!confirm('Are you sure you want to delete this space?!')) return;
        setIsLoading(true);

        const resp = await api.deleteSpace({ did });
        if (resp) {
            refresh(); //# internal refresh
            close(false); //# close the modal
        }

        setIsLoading(false);
    }

    return (
        <form className="app-details" action="#" onSubmit={updateSpace}>
            <h2 className="title">App Details</h2>

            <div className="col-12 mb-4">
                <div className="row g-4">
                    <div className="col-12">
                        <FormGroup
                            setter={setId}
                            getter={id}
                            label="App ID"
                            readOnly
                            inputType="text"
                            className="mb-4"
                        />

                        <FormGroup
                            setter={setDid}
                            getter={did}
                            label="DID"
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
                            className="mb-4"
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
            </div>

            <div className="col-12">
                <div className="row g-2">
                    <div className="col-5 col-sm-4">
                        <button
                            className="btn border"
                            disabled={isLoading}
                            type="button"
                            onClick={deleteSpace}
                        >
                            {isLoading ? <LoadingContentOnButton text="..." /> : 'Delete'}
                        </button>
                    </div>

                    <div className="col-7 col-sm-8">
                        <button className="btn" type="submit" disabled={isLoading}>
                            {isLoading ? <LoadingContentOnButton text="..." /> : 'Save'}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default SpaceEditModal;
