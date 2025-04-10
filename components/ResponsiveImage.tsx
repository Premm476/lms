import Image from 'next/image'
import { HTMLAttributes } from 'react'

type ResponsiveImageProps = HTMLAttributes<HTMLImageElement> & {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
}

export default function ResponsiveImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  ...props
}: ResponsiveImageProps) {
  return (
    <div className={className}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="rounded-md object-cover w-auto h-auto"
        {...props}
      />
    </div>
  )
}
