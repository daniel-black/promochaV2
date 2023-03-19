'use client';

import { useState } from "react";

export default function DemoPage() {
  const [code, setCode] = useState<string>('');
  const [results, setResults] = useState<string | object>('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await fetch(`/api/promocode/apply/${code}`, {
      method: 'POST'
    });

    if (!res.ok) {
      setResults(res.statusText);
      return;
    }

    const data = await res.json();
    setResults(data);
  }

  return (
    <div className="py-20 flex flex-col justify-center items-center space-y-10">
      <form onSubmit={handleSubmit}>
        <label>Code:</label>
        <input type="text" value={code} onChange={e => setCode(e.target.value.toUpperCase())} className="bg-neutral-50 p-3 rounded" />
      </form>
      <div>
        <p>Results:</p>
        <pre>
          {JSON.stringify(results, null, 2)}
        </pre>
      </div>
    </div>
  )
}