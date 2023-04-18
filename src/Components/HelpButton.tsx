import { useContext } from "react";
import { PlataformContext } from "../Context/PlataformContext";
import Steps from "../Enums/Steps";
import "../styles/HelpButton.css"

const HelpButton: React.FC = () => {
    const {setStep} = useContext(PlataformContext);

    const handleHelp = () => {
        setStep(Steps.Help);
        console.log("New step: Help");
      }

    return (
        <button className="HelpButton" onClick={handleHelp}>?</button>
    );
}

export default HelpButton;