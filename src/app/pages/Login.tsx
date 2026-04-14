import { useState } from "react";
import { useNavigate } from "react-router";

export function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && password) {
      localStorage.setItem("studentName", name);
      localStorage.setItem("studentPassword", password);
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#F2F4F8' }}>
      <div className="w-full max-w-md">
        <div className="rounded-2xl p-8 shadow-lg" style={{ backgroundColor: '#FFFFFF' }}>
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-semibold" style={{ backgroundColor: '#4CAF50' }}>
              SDT
            </div>
          </div>

          {/* Welcome Text */}
          <div className="text-center mb-8">
            <h1 className="text-2xl mb-2" style={{ color: '#222222' }}>
              Selamat Datang 👋
            </h1>
            <p className="text-sm" style={{ color: '#999999' }}>
              Masuk untuk melanjutkan
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm" style={{ color: '#222222' }}>
                Nama
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama Anda"
                className="w-full px-4 py-3 border outline-none transition-colors"
                style={{ 
                  borderRadius: '10px',
                  borderColor: '#E0E0E0',
                  backgroundColor: '#FFFFFF',
                  color: '#222222'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
                onBlur={(e) => e.target.style.borderColor = '#E0E0E0'}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-sm" style={{ color: '#222222' }}>
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password Anda"
                className="w-full px-4 py-3 border outline-none transition-colors"
                style={{ 
                  borderRadius: '10px',
                  borderColor: '#E0E0E0',
                  backgroundColor: '#FFFFFF',
                  color: '#222222'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
                onBlur={(e) => e.target.style.borderColor = '#E0E0E0'}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full text-white py-3 mt-6 transition-opacity hover:opacity-90"
              style={{
                backgroundColor: '#4CAF50',
                borderRadius: '10px',
                height: '44px'
              }}
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}