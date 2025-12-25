"use client";

import { useState, useRef } from "react";

interface SelfieCaptureProps {
  onCapture: (imageData: string | null) => void;
}

export const SelfieCapture: React.FC<SelfieCaptureProps> = ({ onCapture }) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        setCapturedImage(imageData);
        onCapture(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCapture = () => {
    fileInputRef.current?.click();
  };

  const handleRetake = () => {
    setCapturedImage(null);
    onCapture(null);
  };

  return (
    <div style={{ marginBottom: "24px" }}>
      <div
        style={{
          fontSize: "14px",
          fontWeight: 600,
          marginBottom: "8px",
        }}
      >
        تصویر سلفی (عکس از خود)
      </div>
      <div
        style={{
          fontSize: "12px",
          color: "var(--color-muted)",
          marginBottom: "16px",
        }}
      >
        لطفا یک سلفی واضح از خود بگیرید. صورت شما باید کاملا مشخص باشد.
      </div>

      <div
        style={{
          border: "2px dashed rgba(0,0,0,0.2)",
          borderRadius: "16px",
          padding: "32px 20px",
          textAlign: "center",
          background: "#FFFFFF",
        }}
      >
        {!capturedImage ? (
          <>
            <div
              style={{
                width: "120px",
                height: "120px",
                margin: "0 auto 20px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #F0F0F0 0%, #E0E0E0 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "48px",
              }}
            >
              🤳
            </div>

            <div
              style={{
                fontSize: "14px",
                fontWeight: 600,
                marginBottom: "8px",
              }}
            >
              سلفی خود را بگیرید
            </div>

            <div
              style={{
                fontSize: "12px",
                color: "var(--color-muted)",
                marginBottom: "20px",
              }}
            >
              • صورت خود را کاملا در فریم قرار دهید
              <br />
              • عینک آفتابی برندارید
              <br />
              • نور کافی داشته باشید
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="user"
              onChange={handleFileSelect}
              style={{ display: "none" }}
            />

            <button
              onClick={handleCapture}
              className="btn btn-primary"
              style={{
                padding: "12px 32px",
                fontSize: "14px",
                borderRadius: "12px",
              }}
            >
              {isCapturing ? "در حال دریافت..." : "گرفتن سلفی"}
            </button>
          </>
        ) : (
          <>
            <div
              style={{
                position: "relative",
                width: "200px",
                height: "200px",
                margin: "0 auto 20px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "4px solid var(--color-primary)",
              }}
            >
              <img
                src={capturedImage}
                alt="Selfie"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            <div
              style={{
                fontSize: "14px",
                fontWeight: 600,
                marginBottom: "4px",
                color: "#10B981",
              }}
            >
              ✓ سلفی دریافت شد
            </div>

            <div
              style={{
                fontSize: "12px",
                color: "var(--color-muted)",
                marginBottom: "20px",
              }}
            >
              در صورت نیاز می‌توانید دوباره عکس بگیرید
            </div>

            <button
              onClick={handleRetake}
              style={{
                padding: "10px 24px",
                background: "rgba(0,0,0,0.04)",
                border: "1px solid rgba(0,0,0,0.1)",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              گرفتن دوباره
            </button>
          </>
        )}
      </div>

      <div
        style={{
          marginTop: "16px",
          padding: "12px",
          background: "rgba(59, 130, 246, 0.1)",
          borderRadius: "12px",
          fontSize: "11px",
          color: "#1E40AF",
        }}
      >
        ⓘ تصویر سلفی برای تایید هویت شما و جلوگیری از سوء استفاده استفاده می‌شود.
      </div>
    </div>
  );
};
