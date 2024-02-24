import {
  TbBrandTypescript,
  TbBrandReact,
  TbBrandReactNative,
  TbBrandUnity,
  TbArrowRight,
  TbTools,
} from "react-icons/tb";

const Libraries = () => {
  const libraries = [
    {
      name: "quyx-ts",
      platform: "TypeScript",
      isComingSoon: false,
      icon: <TbBrandTypescript stroke="#1976D2" size={65} strokeWidth={1} />,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      url: "#",
    },
    {
      name: "quyx-react",
      platform: "React",
      isComingSoon: true,
      icon: <TbBrandReact stroke="#61DAFB" size={65} strokeWidth={1} />,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      url: "#",
    },
    {
      name: "quyx-react-native",
      platform: "React Native",
      isComingSoon: true,
      icon: <TbBrandReactNative stroke="#61DAFB" size={65} strokeWidth={1} />,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      url: "#",
    },
    {
      name: "#### ### #",
      platform: "Unity",
      isComingSoon: true,
      icon: <TbBrandUnity size={65} strokeWidth={1} stroke="#aaa" />,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      url: "#",
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

                    <p className="text">{lib.text}</p>

                    <p className="platform">
                      <strong>Platform:</strong>&nbsp;
                      <span>{lib.platform}</span>
                    </p>
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
