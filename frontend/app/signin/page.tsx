'use client';

export default function SigninPage() {
  async function submit(e: any) {
    e.preventDefault();

    const res = await fetch('http://localhost:3001/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || 'Signin failed');
      return;
    }

    console.log('AccessToken:', data.accessToken);
    alert('Signin successful');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black">
      <div className="w-full max-w-md bg-zinc-800 text-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-2 text-center">Welcome Back</h1>
        <p className="text-zinc-400 text-sm mb-6 text-center">
          Sign in to continue
        </p>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-zinc-300">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-md bg-zinc-900 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-zinc-300">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-md bg-zinc-900 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition font-semibold"
          >
            Sign In
          </button>
        </form>

        <p className="text-xs text-zinc-500 mt-6 text-center">
          Don’t have an account? <a href="/signup" className="text-blue-400">Sign up</a>
        </p>
      </div>
    </div>
  );
}
