import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [website, setWebsite] = useState(''); // honeypot

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // bot trap: if filled, silently ignore
    if (website) return;

    setStatus('sending');
    setErrorMsg('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);
    formData.append('_subject', `New message from ${name}`);

    try {
      const response = await fetch('https://formspree.io/f/mlggvdja', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setName('');
        setEmail('');
        setMessage('');
        setStatus('success');
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        let msg = 'Failed to send. Try again.';
        try {
          const data = await response.json();
          msg = (data as any)?.error || msg;
        } catch {}
        setStatus('error');
        setErrorMsg(msg);
      }
    } catch {
      setStatus('error');
      setErrorMsg('Failed to send. Try again.');
    }
  };

  return (
    <section id="contact" className="scroll-reveal py-4">
      <div className="bg-[#fdfaf5] rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-16 lg:p-24 flex flex-col items-center text-center shadow-sm">
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] mb-6 max-w-3xl text-black">
          Contact with me to sizzle your project
        </h2>
        <p className="text-black font-bold mb-12 max-w-xl text-base sm:text-lg">
          Feel free to contact me on any queries. I'm available for new projects or just for chatting.
        </p>

        <form className="w-full max-w-2xl space-y-4" onSubmit={handleSubmit}>
          {/* honeypot */}
          <input
            type="text"
            name="_gotcha"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              required
              className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-5 text-lg font-medium focus:ring-4 focus:ring-[#ff4e46]/10 focus:border-[#ff4e46]/30 outline-none transition-all shadow-sm placeholder-black/40"
            />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-5 text-lg font-medium focus:ring-4 focus:ring-[#ff4e46]/10 focus:border-[#ff4e46]/30 outline-none transition-all shadow-sm placeholder-black/40"
            />
          </div>

          <textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Project details..."
            rows={5}
            required
            className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-5 text-lg font-medium focus:ring-4 focus:ring-[#ff4e46]/10 focus:border-[#ff4e46]/30 outline-none transition-all resize-none shadow-sm placeholder-black/40"
          />

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full bg-[#1a1a1a] text-white py-5 rounded-2xl text-xl font-black hover:bg-black transition-all hover:shadow-xl active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'success' && <p className="text-green-600 font-bold mt-2">Message sent.</p>}
          {status === 'error' && <p className="text-red-600 font-bold mt-2">{errorMsg}</p>}
        </form>
      </div>
    </section>
  );
};

export default Contact;
