'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

function GoBackButton({ className, children, fallbackUrl = '/' }) {
  const router = useRouter();
  const [prevPage, setPrevPage] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const isEnglish = pathname.startsWith('/en');
    let storedPage = sessionStorage.getItem('prevPage') || fallbackUrl;

    storedPage = new URL(storedPage, window.location.origin).pathname;
    if (storedPage.startsWith('/en') && !isEnglish) {
      storedPage = storedPage.replace(/^\/en/, '');
    }
    if (!storedPage.startsWith('/en') && isEnglish) {
      storedPage = `/en${storedPage}`;
    }
    setPrevPage(storedPage);
  }, [pathname]);

  return (
    <div className={className} onClick={() => router.push(prevPage)}>
      {children}
    </div>
  );
}

export default GoBackButton;