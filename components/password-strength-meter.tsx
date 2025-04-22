import { cn } from "@/lib/utils"

interface PasswordStrengthMeterProps {
  strength: number // 0-5 scale
}

export function PasswordStrengthMeter({ strength }: PasswordStrengthMeterProps) {
  const getLabel = () => {
    if (strength === 0) return "Very Weak"
    if (strength === 1) return "Weak"
    if (strength === 2) return "Fair"
    if (strength === 3) return "Good"
    if (strength === 4) return "Strong"
    return "Very Strong"
  }

  const getColor = () => {
    if (strength <= 1) return "bg-red-500"
    if (strength === 2) return "bg-orange-500"
    if (strength === 3) return "bg-yellow-500"
    if (strength === 4) return "bg-green-500"
    return "bg-green-600"
  }

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={cn("h-1.5 w-5 rounded-full", i < strength ? getColor() : "bg-gray-200")} />
          ))}
        </div>
        <span className="text-xs text-gray-500">{getLabel()}</span>
      </div>
    </div>
  )
}
