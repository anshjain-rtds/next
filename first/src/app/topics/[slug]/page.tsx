import React from "react";

export default async function TopicShowPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="grid grid-cols-4 gap-4 p-4 py-24">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{slug}</h1>
      </div>
      <div></div>
    </div>
  );
}
