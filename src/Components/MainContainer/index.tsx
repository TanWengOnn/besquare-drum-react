import React from "react";
import { KeyConfig } from "../../Helpers/sounds";
import ScoreContainer from "../ScoreContainer";
import SequenceContainer from "../SequenceContainer";
import TargetContainer from "../TargetContainer";
import "./main-container.css";

//-----------------------------Generate Game Keys-----------------------------//
const generateTargetKeys = () => {
  const keys: string[] = [];
  while (keys.length < 50) {
    keys.push("a", "s", "d", "f", "g");
  }
  return keys;
};

const keys = generateTargetKeys();

//-----------------------------Main Container-----------------------------//
type MainContainerProps = {
  has_game_started: boolean;
};

const MainContainer = ({ has_game_started }: MainContainerProps) => {
  const [target_keys, setTargetKeys] = React.useState(keys.slice(0, 4)); // Getting the first four generated keys
  const [active_index, setActiveIndex] = React.useState(0);
  const [score, setScore] = React.useState(0);

  // Function: Move the key sequence
  const updateTargetKeys = () => {
    setTargetKeys(keys.slice(active_index, active_index + 4));
  };

  // Function: Game Logic
  const onKeyMatch = (keyConfig: KeyConfig) => {
    console.log("onKeyMatch", onKeyMatch);
    const target_key = target_keys[active_index];
    if (has_game_started) {
      if (target_key === keyConfig.key) {
        setScore(score + 1);
        setActiveIndex(active_index + 1);
        updateTargetKeys();
      } else {
        setScore(score - 1);
      }
    }
  };

  return (
    <div className="main-container">
      <ScoreContainer score={score} />
      <SequenceContainer
        active_index={active_index}
        target_keys={target_keys}
      />
      <TargetContainer onKeyMatch={onKeyMatch} />
    </div>
  );
};

export default MainContainer;
