'use client';

export default function StatutContent({ pdfUrl }) {
    return <iframe src={pdfUrl} title="Статут організації" />;
}