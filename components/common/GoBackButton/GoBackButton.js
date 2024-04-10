'use client';
import { useRouter } from 'next/navigation';

function GoBackButton({
  className,
  children,
}) {
  const router = useRouter();
  return (
    <div className={className} onClick={() => router.back()}>
      {children}
    </div>
  );
}

export default GoBackButton;