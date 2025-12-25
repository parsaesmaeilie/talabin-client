interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
  steps,
}) => {
  const toPersianNumber = (num: number) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  return (
    <div style={{ marginBottom: "32px" }}>
      {/* Progress Bar */}
      <div
        style={{
          position: "relative",
          height: "4px",
          background: "rgba(0,0,0,0.1)",
          borderRadius: "999px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            height: "100%",
            width: `${(currentStep / totalSteps) * 100}%`,
            background: "linear-gradient(90deg, #FFC857 0%, #FFD666 100%)",
            borderRadius: "999px",
            transition: "width 0.3s ease-out",
          }}
        />
      </div>

      {/* Step Circles */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        {steps.map((stepLabel, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isPending = stepNumber > currentStep;

          return (
            <div
              key={index}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {/* Circle */}
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: isCompleted || isCurrent ? "var(--color-primary)" : "#E0E0E0",
                  color: isCompleted || isCurrent ? "#1C1C1C" : "#999",
                  fontWeight: 700,
                  fontSize: "16px",
                  transition: "all 0.3s ease-out",
                  transform: isCurrent ? "scale(1.1)" : "scale(1)",
                  boxShadow: isCurrent ? "0 4px 12px rgba(255, 200, 87, 0.4)" : "none",
                }}
              >
                {isCompleted ? "✓" : toPersianNumber(stepNumber)}
              </div>

              {/* Label */}
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: isCurrent ? 600 : 400,
                  color: isCurrent ? "#1C1C1C" : "var(--color-muted)",
                  textAlign: "center",
                  transition: "all 0.2s ease-out",
                }}
              >
                {stepLabel}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
