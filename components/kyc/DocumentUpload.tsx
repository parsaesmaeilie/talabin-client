"use client";

import { useState } from "react";

interface DocumentUploadProps {
  label: string;
  description?: string;
  onFileSelect: (file: File | null) => void;
  preview?: string;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
  label,
  description,
  onFileSelect,
  preview,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(preview || null);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      onFileSelect(file);
    } else {
      alert("لطفا یک فایل تصویر انتخاب کنید");
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    onFileSelect(null);
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
        {label}
      </div>
      {description && (
        <div
          style={{
            fontSize: "12px",
            color: "var(--color-muted)",
            marginBottom: "12px",
          }}
        >
          {description}
        </div>
      )}

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        style={{
          position: "relative",
          border: `2px dashed ${dragActive ? "var(--color-primary)" : "rgba(0,0,0,0.2)"}`,
          borderRadius: "16px",
          padding: "32px 20px",
          textAlign: "center",
          background: dragActive ? "rgba(255, 200, 87, 0.05)" : "#FFFFFF",
          transition: "all 0.2s ease-out",
          cursor: "pointer",
        }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0,
            cursor: "pointer",
          }}
        />

        {!previewUrl ? (
          <>
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>📷</div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: 600,
                marginBottom: "4px",
              }}
            >
              کلیک کنید یا تصویر را بکشید
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "var(--color-muted)",
              }}
            >
              JPG، PNG یا HEIC تا ۵ مگابایت
            </div>
          </>
        ) : (
          <div>
            <div
              style={{
                position: "relative",
                maxWidth: "200px",
                margin: "0 auto 16px",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <img
                src={previewUrl}
                alt="Preview"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </div>
            <div
              style={{
                fontSize: "13px",
                fontWeight: 600,
                marginBottom: "8px",
                color: "#10B981",
              }}
            >
              ✓ تصویر آپلود شد
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              style={{
                padding: "8px 20px",
                background: "rgba(239, 68, 68, 0.1)",
                color: "#DC2626",
                border: "none",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              حذف تصویر
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
