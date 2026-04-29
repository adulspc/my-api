export default function DashboardPage() {
  return (
    <main className="mx-auto flex min-h-full max-w-lg flex-col justify-center gap-4 px-6 py-16">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Dashboard
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        ถ้าเห็นหน้านี้ แสดงว่า request ผ่าน proxy (เดิมคือ middleware) แล้ว
        — มี JWT ถูกต้องใน header <code className="text-sm">Authorization: Bearer …</code>
      </p>
      <p className="text-sm text-zinc-500">
        การเปิด URL นี้ในแท็บใหม่โดยตรงมักไม่มี Bearer token จึงได้ 401 จาก proxy
        ให้ใช้หน้า{" "}
        <a
          href="/test-middleware"
          className="font-medium text-zinc-900 underline dark:text-zinc-100"
        >
          /test-middleware
        </a>{" "}
        เพื่อทดสอบ
      </p>
    </main>
  );
}
