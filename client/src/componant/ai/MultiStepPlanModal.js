//client/src/componant/ai/MultiStepPlanModal.js

import { useState } from "react";
import DateRangeStep from "./DateRangeStep";
import AIPlaceModal from "./AIPlaceModal";
import WhoWithStep from "./WhoWithStep";
import TravelstyleStep from "./TravelStyleStep";
import PreferTravelPlan from "./PreferTravelPlan";

export default function MultiStepPlanModal({open, onClose, place, onComplete}) {
    const [step, setStep] = useState(1);
    const [selectedValues, setSelectedValues] = useState({
        place: null,
        date: null,
        companion: null
    });
    const [dateRange, setDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const handleNext = (value) => {
        
        console.log("hadleNext received value:", value);
        if (step === 1) {
            const updatedValues = {
                ...selectedValues,
                place: place
            };
            setSelectedValues(updatedValues);
            console.log("step - 1 : 장소 ", updatedValues);
            setStep(2);

            
        } else if (step === 2) {
            const updatedValues = {
                ...selectedValues,
                date : {
                    startDate: dateRange.startDate,
                    endDate: dateRange.endDate
                }
            };
            setSelectedValues(updatedValues);
            console.log("step - 2 : 기간 ", updatedValues);
            setStep(3);
            
        } else if (step === 3) {
           
            const updatedValues = {
                ...selectedValues,
                companion: value
            };
            setSelectedValues(updatedValues);
            console.log("step - 3 : 동행자 ", updatedValues);
            setStep(4);
            
        }else if (step === 4) {

            const updatedValues = {
                ...selectedValues,
                style: value
            };
            setSelectedValues(updatedValues);
            console.log("step - 4 : 여행 스타일 ", updatedValues);
            setStep(5);
        }else if(step === 5) {

            const updatedValues = {
                ...selectedValues,
                prefer: value
            };
            setSelectedValues(updatedValues);
            console.log("step - 5 : 선호 여행 일정 ", updatedValues);
            onComplete(updatedValues);
            onClose();
        }
    };

    const handleBack = () => {
        setStep(prev => prev - 1);
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
                        onClose={onClose}
                    />
                )}
                {step === 3 && (
                    <WhoWithStep 
                    onNext={handleNext}
                    onBack={handleBack}
                    onClose={onClose}
                    />
                )}
                {step === 4 && (
                    <TravelstyleStep
                    onNext={handleNext}
                    onBack={handleBack}
                    onClose={onClose}
                    />
                )}
                  {step === 5 && (
                    <PreferTravelPlan
                    onNext={handleNext}
                    onBack={handleBack}
                    onClose={onClose}
                    />
                )}
                
        </div>
    );
}