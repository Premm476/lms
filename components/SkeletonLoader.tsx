import React, { HTMLAttributes } from 'react'
import clsx from 'clsx'

type SkeletonLoaderProps = HTMLAttributes<HTMLDivElement> & {
  className?: string
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  height?: string
  width?: string
}

export function SkeletonLoader({
  className,
  rounded = 'md',
  height = 'h-4',
  width = 'w-full',
  ...props
}: SkeletonLoaderProps) {
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  }

  return (
    <div
      className={clsx(
        'skeleton',
        height,
        width,
        roundedClasses[rounded],
        className
      )}
      {...props}
    />
  )
}

export function CardSkeleton({ count = 1 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="border border-gray-200 rounded-lg p-4">
          <SkeletonLoader height="h-6" width="w-1/3" className="mb-2" />
          <SkeletonLoader height="h-4" width="w-full" className="mb-1" />
          <SkeletonLoader height="h-4" width="w-2/3" />
        </div>
      ))}
    </div>
  )
}
