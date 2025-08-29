"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    // redirect to geo-procesor page
    router.push('/geo-procesor');
  }, [router]);

  return null;
}