import { HTMLAttributes } from 'react'
import clsx from 'clsx'

type LoadingSpinnerProps = HTMLAttributes<HTMLDivElement> & {
  useSkeleton?: boolean
  skeletonClassName?: string
}

export default function LoadingSpinner({
  className,
  useSkeleton = false,
  skeletonClassName,
  ...props
}: LoadingSpinnerProps) {
  if (useSkeleton) {
    return (
      <div
        className={clsx(
          'skeleton rounded-full',
          skeletonClassName || 'h-8 w-8',
          className
        )}
        {...props}
      />
    )
  }

  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        'animate-spin rounded-full h-8 w-8 border-2 border-indigo-600 border-t-transparent',
        className
      )}
      {...props}
    />
  )
}
