import { useState } from "react";
import { DateRange } from "react-date-range";
import DateRangeStep from "./DateRangeStep";
import AIPlaceModal from "./AIPlaceModal";

export default function MultiStepPlanModal({open, onClose, place, onComplete}) {

    
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({});
    if(!open) return null;


    return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    
            {step === 1 && <AIPlaceModal
                onNext={() => setStep(2)}
                place={place}
                onClose={onClose}
                 />}

    </div>
    )

}