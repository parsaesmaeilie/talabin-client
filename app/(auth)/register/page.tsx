"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { authService } from "@/src/features/auth";

interface RegisterFormData {
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError("");

    try {
      // Call backend API
      const response = await authService.register({
        phone_number: data.phone,
        password: data.password,
        password_confirm: data.confirmPassword,
        first_name: data.firstName,
        last_name: data.lastName,
      });

      if (response.success) {
        // Show success message
        const successDiv = document.createElement("div");
        successDiv.className = "success-toast";
        successDiv.textContent = "✔ ثبت‌نام با موفقیت انجام شد!";
        successDiv.style.cssText = `
          position: fixed;
          top: 24px;
          right: 24px;
          left: 24px;
          background: #4ADE80;
          color: white;
          padding: 16px 24px;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          z-index: 9999;
          animation: slideIn 0.3s ease-out;
          font-weight: 600;
          text-align: center;
        `;
        document.body.appendChild(successDiv);

        // Add animation
        const style = document.createElement("style");
        style.textContent = `
          @keyframes slideIn {
            from {
              transform: translateY(-100px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          @keyframes slideOut {
            from {
              transform: translateY(0);
              opacity: 1;
            }
            to {
              transform: translateY(-100px);
              opacity: 0;
            }
          }
        `;
        document.head.appendChild(style);

        // Remove after 2 seconds with animation
        setTimeout(() => {
          successDiv.style.animation = "slideOut 0.3s ease-in";
          setTimeout(() => {
            document.body.removeChild(successDiv);

            // Redirect to verify page with smooth transition
            document.body.style.opacity = "1";
            document.body.style.transition = "opacity 0.3s ease-out";
            requestAnimationFrame(() => {
              document.body.style.opacity = "0";
              setTimeout(() => {
                router.push(`/verify?phone=${encodeURIComponent(data.phone)}&type=registration`);
              }, 300);
            });
          }, 300);
        }, 2000);
      } else {
        // Show error
        setError(response.error?.message || "خطا در ثبت‌نام. لطفا دوباره تلاش کنید.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("خطا در ارتباط با سرور. لطفا دوباره تلاش کنید.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in" style={{ background: "#FAFAFA" }}>
      <div
        className="w-full max-w-md card"
        style={{
          padding: "32px 24px",
          animation: "scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          background: "#FFFFFF"
        }}
      >
        {/* Support Icon */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "32px"
        }}>
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "rgba(0,0,0,0.04)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 8V13" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 16H12.01" stroke="#1C1C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ width: "40px" }} />
        </div>

        <h1
          style={{
            fontSize: "28px",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: "32px",
            color: "#1C1C1C"
          }}
        >
          ثبت‌نام
        </h1>

        <p
          style={{
            fontSize: "13px",
            color: "rgba(28,28,28,0.5)",
            textAlign: "right",
            marginBottom: "8px",
          }}
        >
          نام و نام‌خانوادگی
        </p>

        {error && (
          <div
            style={{
              background: "#FEE2E2",
              color: "#EF4444",
              padding: "12px 16px",
              borderRadius: "8px",
              marginBottom: "16px",
              fontSize: "13px",
              textAlign: "center",
              animation: "shake 0.4s ease-in-out",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              {...register("firstName", { required: "نام الزامی است" })}
              className="form-input"
              placeholder="سعید سعیدی"
              disabled={isLoading}
              style={{
                padding: "14px 16px",
                fontSize: "14px",
                border: "1.5px solid rgba(0,0,0,0.08)",
                borderRadius: "14px"
              }}
            />
            {errors.firstName && (
              <span style={{ fontSize: "11px", color: "#EF4444", marginTop: "6px", display: "block" }}>
                {errors.firstName.message}
              </span>
            )}
          </div>

          {/* Hidden lastName field for compatibility */}
          <input type="hidden" {...register("lastName")} value="" />

          <div className="form-group">
            <p style={{
              fontSize: "13px",
              color: "rgba(28,28,28,0.5)",
              textAlign: "right",
              marginBottom: "8px"
            }}>
              شماره تلفن
            </p>
            <div style={{ position: "relative" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{
                position: "absolute",
                right: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none"
              }}>
                <path d="M21.97 18.33C21.97 18.69 21.89 19.06 21.72 19.42C21.55 19.78 21.33 20.12 21.04 20.44C20.55 20.98 20.01 21.37 19.4 21.62C18.8 21.87 18.15 22 17.45 22C16.43 22 15.34 21.76 14.19 21.27C13.04 20.78 11.89 20.12 10.75 19.29C9.6 18.45 8.51 17.52 7.47 16.49C6.44 15.45 5.51 14.36 4.68 13.22C3.86 12.08 3.2 10.94 2.72 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C11.27 13.75 11.79 14.24 12.32 14.69C12.84 15.13 13.27 15.43 13.61 15.61C13.66 15.63 13.72 15.66 13.79 15.69C13.87 15.72 13.95 15.73 14.04 15.73C14.21 15.73 14.34 15.67 14.45 15.56L15.21 14.81C15.46 14.56 15.7 14.37 15.93 14.25C16.16 14.11 16.39 14.04 16.64 14.04C16.83 14.04 17.03 14.08 17.25 14.17C17.47 14.26 17.7 14.39 17.95 14.56L21.26 16.91C21.52 17.09 21.7 17.3 21.81 17.55C21.91 17.8 21.97 18.05 21.97 18.33Z" stroke="#6B7280" strokeWidth="1.5" strokeMiterlimit="10"/>
              </svg>
              <input
                {...register("phone", {
                  required: "شماره موبایل الزامی است",
                  pattern: {
                    value: /^09[0-9]{9}$/,
                    message: "شماره موبایل معتبر نیست"
                  },
                })}
                type="tel"
                className="form-input"
                placeholder="۰۹۱۲۵۸۱۴۶۵۵۳"
                dir="ltr"
                style={{
                  textAlign: "right",
                  padding: "14px 16px 14px 48px",
                  fontSize: "14px",
                  border: "1.5px solid rgba(0,0,0,0.08)",
                  borderRadius: "14px"
                }}
                disabled={isLoading}
              />
            </div>
            {errors.phone && (
              <span style={{ fontSize: "11px", color: "#EF4444", marginTop: "6px", display: "block" }}>
                {errors.phone.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <p style={{
              fontSize: "13px",
              color: "rgba(28,28,28,0.5)",
              textAlign: "right",
              marginBottom: "8px"
            }}>
              رمز عبور
            </p>
            <div style={{ position: "relative" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{
                position: "absolute",
                right: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none"
              }}>
                <path d="M6 10V8C6 4.69 7 2 12 2C17 2 18 4.69 18 8V10" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 18.5C13.3807 18.5 14.5 17.3807 14.5 16C14.5 14.6193 13.3807 13.5 12 13.5C10.6193 13.5 9.5 14.6193 9.5 16C9.5 17.3807 10.6193 18.5 12 18.5Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer"
              }}>
                <path d="M21.25 9.15C18.94 5.52 15.56 3.43 12 3.43C10.22 3.43 8.49 3.95 6.91 4.92C5.33 5.9 3.91 7.33 2.75 9.15C1.75 10.72 1.75 13.27 2.75 14.84C5.06 18.48 8.44 20.56 12 20.56C13.78 20.56 15.51 20.04 17.09 19.07C18.67 18.09 20.09 16.66 21.25 14.84C22.25 13.28 22.25 10.72 21.25 9.15ZM12 16.04C9.76 16.04 7.96 14.23 7.96 12C7.96 9.77 9.76 7.96 12 7.96C14.24 7.96 16.04 9.77 16.04 12C16.04 14.23 14.24 16.04 12 16.04Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                {...register("password", {
                  required: "رمز عبور الزامی است",
                  minLength: {
                    value: 6,
                    message: "رمز عبور باید حداقل 6 کاراکتر باشد",
                  },
                })}
                type="password"
                className="form-input"
                placeholder="••••••••"
                style={{
                  padding: "14px 48px",
                  fontSize: "14px",
                  border: "1.5px solid rgba(0,0,0,0.08)",
                  borderRadius: "14px"
                }}
                disabled={isLoading}
              />
            </div>
            {errors.password && (
              <span style={{ fontSize: "11px", color: "#EF4444", marginTop: "6px", display: "block" }}>
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <p style={{
              fontSize: "13px",
              color: "rgba(28,28,28,0.5)",
              textAlign: "right",
              marginBottom: "8px"
            }}>
              تکرار رمزعبور
            </p>
            <div style={{ position: "relative" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{
                position: "absolute",
                right: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none"
              }}>
                <path d="M6 10V8C6 4.69 7 2 12 2C17 2 18 4.69 18 8V10" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 18.5C13.3807 18.5 14.5 17.3807 14.5 16C14.5 14.6193 13.3807 13.5 12 13.5C10.6193 13.5 9.5 14.6193 9.5 16C9.5 17.3807 10.6193 18.5 12 18.5Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer"
              }}>
                <path d="M21.25 9.15C18.94 5.52 15.56 3.43 12 3.43C10.22 3.43 8.49 3.95 6.91 4.92C5.33 5.9 3.91 7.33 2.75 9.15C1.75 10.72 1.75 13.27 2.75 14.84C5.06 18.48 8.44 20.56 12 20.56C13.78 20.56 15.51 20.04 17.09 19.07C18.67 18.09 20.09 16.66 21.25 14.84C22.25 13.28 22.25 10.72 21.25 9.15ZM12 16.04C9.76 16.04 7.96 14.23 7.96 12C7.96 9.77 9.76 7.96 12 7.96C14.24 7.96 16.04 9.77 16.04 12C16.04 14.23 14.24 16.04 12 16.04Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                {...register("confirmPassword", {
                  required: "تایید رمز عبور الزامی است",
                  validate: (value) =>
                    value === watch("password") || "رمز عبور و تایید آن یکسان نیستند",
                })}
                type="password"
                className="form-input"
                placeholder="••••••••"
                style={{
                  padding: "14px 48px",
                  fontSize: "14px",
                  border: "1.5px solid rgba(0,0,0,0.08)",
                  borderRadius: "14px"
                }}
                disabled={isLoading}
              />
            </div>
            {errors.confirmPassword && (
              <span style={{ fontSize: "11px", color: "#EF4444", marginTop: "6px", display: "block" }}>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "16px 24px",
              fontSize: "16px",
              fontWeight: 700,
              color: "#1C1C1C",
              background: "#FFC857",
              border: "none",
              borderRadius: "999px",
              cursor: isLoading ? "not-allowed" : "pointer",
              boxShadow: "0 10px 22px rgba(255, 200, 87, 0.35)",
              marginTop: "24px",
              opacity: isLoading ? 0.7 : 1,
              transition: "all 0.2s"
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                <div className="spinner" />
                در حال ثبت‌نام...
              </div>
            ) : (
              "ثبت‌نام"
            )}
          </button>
        </form>

        <div
          style={{
            marginTop: "32px",
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          <span style={{ color: "rgba(28,28,28,0.6)" }}>قبلاً ثبت‌نام کرده‌اید؟ </span>
          <Link
            href="/login"
            style={{
              color: "#3B82F6",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            ورود
          </Link>
        </div>
      </div>
    </div>
  );
}
