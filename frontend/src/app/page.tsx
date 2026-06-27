export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Multi Store Frontend</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Next.js frontend shell is ready.
        </p>
        <div className="mt-4 bg-red-300 p-4 rounded-md ">
          This is a test div to check if tailwindcss is working properly. If you can see this, then tailwindcss is working fine. You can remove this div after confirming that tailwindcss is working properly.
        </div>
      </div>
    </main>
  );
}
