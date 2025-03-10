'use client'

import { usePathname } from "next/navigation";
import NotFound from "./NotFound";

export default function NotFoundWrapper() {
    const pathname = usePathname();
    const segments = pathname.split("/");
    const supportedLocales = ["en", "ua"];
    const locale = segments[1] && supportedLocales.includes(segments[1]) ? segments[1] : "ua";
    return <NotFound locale={locale} />;
}