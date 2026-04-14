export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            ⚖️ Etrenzik Litigation Workspace
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Authorized access only — attorney work product
          </p>
        </div>

        <div className="rounded-lg border border-amber-800/50 bg-amber-950/30 p-3 text-center text-xs text-amber-300">
          DRAFT WORK PRODUCT — NOT LEGAL ADVICE
        </div>

        <form
          method="POST"
          action="/api/auth/login"
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="you@etrenzik.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-xs text-gray-500">
          Protected by Cloudflare Access
        </p>
      </div>
    </div>
  );
}
