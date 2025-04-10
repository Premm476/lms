import { HTMLAttributes } from 'react'

type AccessibleInputProps = HTMLAttributes<HTMLInputElement> & {
  label: string
  type?: string
}

export default function AccessibleInput({
  label,
  type = 'text',
  className,
  ...props
}: AccessibleInputProps) {
  return (
    <div className={`flex flex-col mb-4 ${className}`}>
      <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        {...props}
      />
    </div>
  )
}
