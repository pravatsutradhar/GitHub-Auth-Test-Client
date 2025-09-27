import React from 'react';
import { FaGithub } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container-max mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold">
            Contribute to Open Source with Ease
          </h1>
          <p className="text-lg md:text-xl text-slate-300">
            Find open source projects that need help, get regular issue updates, 
            and make meaningful contributions to the projects you care about.
          </p>
          <div className="pt-8">
            <a
              href={`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/auth/github`}
              className="inline-flex items-center gap-2 bg-[#2ea44f] text-white px-6 py-3 rounded-lg 
                        text-lg font-semibold hover:bg-[#2c974b] transition-colors"
            >
              <FaGithub className="text-2xl" />
              Continue with GitHub
            </a>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-white/10 backdrop-blur">
              <h3 className="text-xl font-semibold mb-3">Find Projects</h3>
              <p className="text-slate-300">Discover open source projects that match your interests and skills</p>
            </div>
            <div className="p-6 rounded-lg bg-white/10 backdrop-blur">
              <h3 className="text-xl font-semibold mb-3">Get Updates</h3>
              <p className="text-slate-300">Receive regular notifications about new issues you can help with</p>
            </div>
            <div className="p-6 rounded-lg bg-white/10 backdrop-blur">
              <h3 className="text-xl font-semibold mb-3">Make Impact</h3>
              <p className="text-slate-300">Contribute meaningfully to projects and grow your skills</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
