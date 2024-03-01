import {
  TbBrandTypescript,
  TbBrandReact,
  TbBrandReactNative,
  TbArrowRight,
  TbTools,
  TbBrandNodejs,
} from "react-icons/tb";
import settings from "../../../../utils/settings";

const Libraries = () => {
  const libraries = [
    {
      name: "@quyx/fetch",
      platform: "TypeScript",
      isComingSoon: false,
      icon: <TbBrandNodejs stroke="goldenrod" size={65} strokeWidth={1} />,
      text: "Class wrapper built around axios. Built to make communication with Quyx's endpoint easier and more simplified",
      url: `${settings.DOCS_URL}/sdks/fetch`,
    },
    {
      name: "@quyx/express",
      platform: "Express",
      isComingSoon: false,
      icon: <TbBrandTypescript stroke="dodgerblue" size={65} strokeWidth={1} />,
      text: "nodeJS library for express web applications. Works by us injecting our methods into express default `req` object",
      url: `${settings.DOCS_URL}/sdks/express`,
    },
    {
      name: "@quyx/react",
      platform: "React",
      isComingSoon: true,
      icon: <TbBrandReact stroke="#61DAFB" size={65} strokeWidth={1} />,
      text: "xxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxx",
      url: `${settings.DOCS_URL}/sdks/react`,
    },
    {
      name: "@quyx/react-native",
      platform: "React Native",
      isComingSoon: true,
      icon: <TbBrandReactNative stroke="#61DAFB" size={65} strokeWidth={1} />,
      text: "xxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxx",
      url: `${settings.DOCS_URL}/sdks/react-native`,
    },
  ];

  return (
    <div className="libs mb-5">
      <h3>
        <TbTools strokeWidth={1.5} /> <span>Our SDKs</span>
      </h3>

      <div className="col-12">
        <div className="row g-4 g-lg-3 g-xl-4">
          {libraries.map((lib, index) => (
            <div key={`lib-${index}`} className="col-12 col-md-6">
              <div className="single-lib d-flex justify-content-between">
                <div className="d-flex flex-column justify-content-between">
                  <div>
                    <h4>{lib.name}</h4>
                    {lib.isComingSoon ? <span className="pill">coming soon</span> : null}

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
