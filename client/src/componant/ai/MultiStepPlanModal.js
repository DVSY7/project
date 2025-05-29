import { useState } from "react";
import { DateRange } from "react-date-range";
import DateRangeStep from "./DateRangeStep";
import AIPlaceModal from "./AIPlaceModal";

export default function MultiStepPlanModal({open, onClose, place, onComplete}) {
    const [step, setStep] = useState(1);
    // const [answers, setAnswers] = useState({});
    const [dateRange, setDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const handleNext = () => {
        if (step === 1) {
            setStep(2);
        } else if (step === 2) {
            onComplete({
                place,
                startDate: dateRange.startDate,
                endDate: dateRange.endDate
            });
            onClose();
            setStep(3);
        } else if (step == 3) {
            
        }
    };

    const handleBack = () => {
        setStep(step - 1);
    }

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
           
                {step === 1 && (
                    <AIPlaceModal 
                        place={place}
                        onClose={onClose}
                        onNext={handleNext}
                    />
                )}
                {step === 2 && (
                    <DateRangeStep
                        dateRange={dateRange}
                        setDateRange={setDateRange}
                        onNext={handleNext}
                        onBack={handleBack}
                    />
                )}
                
        </div>
    );
}