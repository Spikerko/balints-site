"use client";

import "@/lib/analytics";
import "@/lib/i18n";

export default function ClientWrapper({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}