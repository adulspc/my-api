"use client";

import { useState } from "react";

export default function TestMiddlewarePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [log, setLog] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function login() {
    setLoading(true);
    setLog("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json()) as { token?: string; error?: string };
      if (!res.ok) {
        setLog(`Login ${res.status}: ${data.error ?? JSON.stringify(data)}`);
        return;
      }
      if (data.token) setToken(data.token);
      setLog(`Login สำเร็จ — เก็บ token ในช่องด้านล่างแล้ว`);
    } catch (e) {
      setLog(`Login error: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setLoading(false);
    }
  }

  async function callDashboard() {
    setLoading(true);
    setLog("");
    try {
      const headers: HeadersInit = {};
      const t = token.trim();
      if (t) headers.Authorization = `Bearer ${t}`;

      const res = await fetch("/dashboard", { headers });
      const text = await res.text();
      const preview = text.slice(0, 400);
      setLog(
        `GET /dashboard → ${res.status} ${res.statusText}\n\n` +
          (res.ok
            ? "ตัวอย่างเนื้อหา (HTML):\n" + preview
            : "Body:\n" + preview)
      );
    } catch (e) {
      setLog(`Fetch error: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-full max-w-lg flex-col gap-6 px-6 py-16">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          ทดสอบ proxy / JWT
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Route <code className="text-xs">/dashboard</code> ถูก protect ใน{" "}
          <code className="text-xs">proxy.ts</code> — ต้องมี{" "}
          <code className="text-xs">Authorization: Bearer &lt;token&gt;</code>
        </p>
      </div>

      <section className="flex flex-col gap-3 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
        <h2 className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
          1) Login รับ token
        </h2>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-zinc-600 dark:text-zinc-400">Email</span>
          <input
            className="rounded border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-zinc-600 dark:text-zinc-400">Password</span>
          <input
            type="password"
            className="rounded border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>
        <button
          type="button"
          disabled={loading}
          onClick={() => void login()}
          className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Login
        </button>
      </section>

      <section className="flex flex-col gap-3 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
        <h2 className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
          2) Token (วางเองหรือจาก Login)
        </h2>
        <textarea
          className="min-h-[100px] rounded border border-zinc-300 bg-white px-3 py-2 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-950"
          placeholder="eyJhbGciOiJIUzI1NiIs..."
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <button
          type="button"
          disabled={loading}
          onClick={() => void callDashboard()}
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-600 dark:hover:bg-zinc-900"
        >
          เรียก GET /dashboard พร้อม Bearer
        </button>
      </section>

      {log ? (
        <pre className="whitespace-pre-wrap break-words rounded-lg bg-zinc-100 p-4 text-xs text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
          {log}
        </pre>
      ) : null}

      <p className="text-sm text-zinc-500">
        <a href="/" className="underline">
          กลับหน้าแรก
        </a>
      </p>
    </main>
  );
}
