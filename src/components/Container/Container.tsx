import { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}

const Container = ({ children, className, ...props }: ContainerProps) => {
  return (
    <div className={cn('w-full my-0 mx-auto px-5', className)} {...props}>
      { children }
    </div>
  )
}

export default Container;
