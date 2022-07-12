import React from "react";
import { KeyConfig, keyConfigs } from "../../Helpers/sounds";
import "./target-container.css";

type TargetContainerProps = {
  onKeyMatch: (keyConfig: KeyConfig) => void;
};

const TargetContainer = ({ onKeyMatch }: TargetContainerProps) => {
  // what is this for?
  const [activeKey, setActiveKey] = React.useState<string>();

  // Only executes this function if "onKeyMatch" value changes
  React.useEffect(() => {
    const handleKeyDown = (ev: KeyboardEvent) => {
      const key = ev.key;

      const keyConfig = keyConfigs.find((item) => item.key === key);

      if (keyConfig) {
        onKeyMatch(keyConfig);
        // Why are we setting the pressed key as the active key
        setActiveKey(keyConfig.key);
        const audio = new Audio(keyConfig?.sound);
        audio.play();
        audio.onended = () => {
          // Why are we setting the pressed key as the active key (cont')
          setActiveKey(undefined);
        };
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // CleanUp
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onKeyMatch]);

  return (
    <div className="control container">
      {keyConfigs.map((item) => (
        <div
          key={item.id}
          className={`control card ${activeKey === item.key && "playing"}`}
        >
          <div className="label container">{item.key}</div>
          <div className="key container">{item.id.split("_").join(" ")}</div>
        </div>
      ))}
    </div>
  );
};

export default TargetContainer;
