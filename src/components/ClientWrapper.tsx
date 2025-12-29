"use client";

import "@/lib/analytics";

export default function ClientWrapper({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}