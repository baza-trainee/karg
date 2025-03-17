'use client'

import { useEffect } from "react";

export default function SavePrevPage() {

    useEffect(() => {
        sessionStorage.setItem('prevPage', window.location.href);
    }, []);

    return null;
}
