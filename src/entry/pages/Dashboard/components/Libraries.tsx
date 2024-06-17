import { TbBrandTypescript, TbBrandReact, TbArrowRight, TbTools } from 'react-icons/tb';
import settings from '../../../../utils/settings';

const Libraries = () => {
    const libraries = [
        {
            name: '@quyx/sdk',
            platform: 'TypeScript',
            isComingSoon: false,
            icon: <TbBrandTypescript stroke="dodgerblue" size={65} strokeWidth={1} />,
            text: "A wrapper round all Quyx's functionalities, provides developers with ready-to-use & straightforward APIs",
            url: `${settings.DOCS_URL}/library/sdk`,
        },
        {
            name: '@quyx/ui-react',
            platform: 'React',
            isComingSoon: false,
            icon: <TbBrandReact stroke="#61DAFB" size={65} strokeWidth={1} />,
            text: 'A javascript library used to interact with Quyx from the client side in your react application',
            url: `${settings.DOCS_URL}/library/react`,
        },
    ];

    return (
        <div className="libs mb-5">
            <h3>
                <TbTools strokeWidth={1.5} /> <span>Libraries</span>
            </h3>

            <div className="col-12">
                <div className="row g-4 g-lg-3 g-xl-4">
                    {libraries.map((lib, index) => (
                        <div key={`lib-${index}`} className="col-12 col-md-6">
                            <div className="single-lib d-flex justify-content-between">
                                <div className="d-flex flex-column justify-content-between">
                                    <div>
                                        <h4>{lib.name}</h4>
                                        {lib.isComingSoon ? (
                                            <span className="pill">coming soon</span>
                                        ) : null}

                                        <p className="text mb-3">{lib.text}</p>
                                    </div>

                                    <p>
                                        <a href={lib.url} target="_blank">
                                            <span>Check docs</span>
                                            <TbArrowRight />
                                        </a>
                                    </p>
                                </div>

                                <div>{lib.icon}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Libraries;
