"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/components/auth-context"
import { AlertTriangle, ShieldCheck } from "lucide-react"

export default function TwoFactorPage() {
  const router = useRouter()
  const { completeLogin } = useAuth()
  const [verificationCode, setVerificationCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [countdown, setCountdown] = useState(30)
  const [inputFocused, setInputFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Auto-focus the input field
    if (inputRef.current) {
      inputRef.current.focus()
    }

    // Countdown timer for code expiration
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!verificationCode) {
      setError("Please enter the verification code")
      return
    }

    if (verificationCode.length !== 6 || !/^\d+$/.test(verificationCode)) {
      setError("Verification code must be 6 digits")
      return
    }

    setIsLoading(true)

    try {
      const result = await completeLogin(verificationCode)

      if (result.success) {
        router.push("/")
      } else {
        setError(result.error || "Invalid verification code")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = () => {
    // Simulate resending code
    setCountdown(30)
    setError("")

    // Show success message
    setError("A new verification code has been sent to your email")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow digits and max 6 characters
    if (/^\d*$/.test(value) && value.length <= 6) {
      setVerificationCode(value)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-500">SocialApp</h1>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">Two-Factor Authentication</h2>
          <p className="mt-2 text-sm text-gray-600">
            Please enter the 6-digit verification code sent to your email or authentication app
          </p>
        </div>

        {error && (
          <div
            className={`${error.includes("sent") ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-700"} px-4 py-3 rounded-md text-sm flex items-start gap-2`}
          >
            {error.includes("sent") ? (
              <ShieldCheck className="h-5 w-5 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            )}
            <span>{error}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md">
            <div className="space-y-1">
              <Label htmlFor="verification-code">Verification Code</Label>
              <Input
                ref={inputRef}
                id="verification-code"
                name="verification-code"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                required
                value={verificationCode}
                onChange={handleInputChange}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                className={`text-center text-2xl tracking-widest ${inputFocused ? "border-blue-500" : ""}`}
                placeholder="• • • • • •"
              />
              <p className="text-xs text-gray-500 mt-1 text-center">Code expires in {countdown} seconds</p>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleResendCode}
              disabled={countdown > 0 || isLoading}
              className="w-full"
            >
              {countdown > 0 ? `Resend code (${countdown}s)` : "Resend code"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
