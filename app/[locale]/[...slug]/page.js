import { notFound } from "next/navigation";

export default function CatchAll({ params: { locale, slug } }) {
    notFound();
}