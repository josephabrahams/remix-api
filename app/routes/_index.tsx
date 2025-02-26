import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData, useRevalidator } from "@remix-run/react";
import { useEffect } from "react";

interface APIResponse {
  status?: number;
  message: string;
}

export const meta: MetaFunction = () => {
  return [
    { title: "Remix API" },
    { name: "description", content: "Remix + Express.js = 🚀" },
  ];
};

export async function loader({
  request,
}: LoaderFunctionArgs): Promise<APIResponse> {
  const url = new URL(request.url);
  const response = await fetch(`${url.origin}/api`);
  return await response.json();
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const { revalidate } = useRevalidator();

  useEffect(() => {
    const interval = setInterval(revalidate, 2000);
    return () => clearInterval(interval);
  }, [revalidate]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-xl">{data.message}</h1>
      </main>
    </div>
  );
}
