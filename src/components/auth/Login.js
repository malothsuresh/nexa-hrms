import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const DEMO_ACCOUNTS = [
  { label: 'Admin', email: 'robert.hargreaves@teamforsolutionhr.com', password: 'admin123', color: '#6366f1' },
  { label: 'HR Manager', email: 'sarah.mitchell@teamforsolutionhr.com', password: 'hr123', color: '#10b981' },
  { label: 'Employee (UK)', email: 'james.thornton@teamforsolutionhr.com', password: 'emp123', color: '#f59e0b' },
  { label: 'Employee (IN)', email: 'priya.sharma@teamforsolutionhr.com', password: 'emp123', color: '#ef4444' },
];

export default function Login({ onLogin }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        onLogin(result.role);
      } else {
        setError('Invalid email or password. Try a demo account below.');
      }
      setLoading(false);
    }, 600);
  };

  const fillDemo = (acc) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setError('');
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      fontFamily: "'DM Sans', system-ui, sans-serif",
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Animated background elements */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(99,102,241,${0.08 - i*0.01}) 0%, transparent 70%)`,
            width: `${300 + i * 100}px`, height: `${300 + i * 100}px`,
            top: `${[10, 60, 20, 70, 30, 80][i]}%`,
            left: `${[5, 70, 40, 10, 80, 50][i]}%`,
            transform: 'translate(-50%, -50%)',
            animation: `pulse ${3 + i}s ease-in-out infinite alternate`,
          }} />
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap');
        @keyframes pulse { from { opacity: 0.4; transform: translate(-50%,-50%) scale(1); } to { opacity: 1; transform: translate(-50%,-50%) scale(1.1); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .login-input { width: 100%; padding: 12px 16px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; color: #f1f5f9; font-size: 14px; font-family: 'DM Sans', sans-serif; outline: none; transition: all 0.2s; box-sizing: border-box; }
        .login-input:focus { border-color: #6366f1; background: rgba(99,102,241,0.1); box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }
        .login-input::placeholder { color: rgba(255,255,255,0.3); }
        .demo-btn { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); color: #94a3b8; padding: 8px 12px; border-radius: 8px; font-size: 12px; cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif; white-space: nowrap; }
        .demo-btn:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.2); color: #f1f5f9; }
        .submit-btn { width: 100%; padding: 13px; background: linear-gradient(135deg, #6366f1, #8b5cf6); border: none; border-radius: 10px; color: white; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
        .submit-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 25px rgba(99,102,241,0.4); }
        .submit-btn:active { transform: translateY(0); }
      `}</style>

      <div style={{
        width: '100%', maxWidth: 420, margin: '20px',
        animation: 'slideUp 0.5s ease-out',
        position: 'relative', zIndex: 10,
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 60, height: 60, borderRadius: 16,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            marginBottom: 16, fontSize: 28,
            boxShadow: '0 8px 30px rgba(99,102,241,0.4)',
          }}>⚡</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#f1f5f9', fontSize: 28, margin: '0 0 4px', fontWeight: 700 }}>
            teamforsolution <span style={{ color: '#818cf8' }}>HR</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>Multi-Country HR Management System</p>
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20,
          padding: '32px', boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        }}>
          <h2 style={{ color: '#f1f5f9', fontSize: 18, fontWeight: 600, margin: '0 0 24px' }}>Sign in to your account</h2>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 12, fontWeight: 500, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email Address</label>
              <input className="login-input" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 12, fontWeight: 500, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Password</label>
              <input className="login-input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>

            {error && (
              <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '10px 14px', color: '#fca5a5', fontSize: 13, marginBottom: 16 }}>
                {error}
              </div>
            )}

            <button className="submit-btn" type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>

          {/* Demo accounts */}
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <p style={{ color: '#475569', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Demo Accounts</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {DEMO_ACCOUNTS.map(acc => (
                <button key={acc.label} className="demo-btn" onClick={() => fillDemo(acc)}>
                  <span style={{ color: acc.color, fontWeight: 600 }}>●</span> {acc.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Country indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 20 }}>
          {['🇬🇧 United Kingdom', '🇮🇳 India', '🇲🇾 Malaysia'].map(c => (
            <span key={c} style={{ color: '#334155', fontSize: 12 }}>{c}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
