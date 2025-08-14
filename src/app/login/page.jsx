export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <fieldset className="fieldset bg-white border-gray-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-black text-3xl">Login</legend>

        <label className="label">Email</label>
        <input
          type="email"
          className="input bg-white border-gray-300"
          placeholder="Email"
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input bg-white border-gray-300"
          placeholder="Password"
        />

        <button className="btn btn-neutral mt-4">Login</button>
      </fieldset>
    </div>
  );
}
