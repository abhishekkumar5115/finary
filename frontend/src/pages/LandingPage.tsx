import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="absolute top-0 w-full z-10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex justify-center items-center">
              F
            </div>
            Finary
          </h1>
          <div className="flex gap-4">
            <Link
              to="/login"
              className="text-slate-700 hover:text-slate-900 font-medium px-4 py-2 transition"
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="bg-slate-900 text-white px-5 py-2 rounded-lg font-medium hover:bg-slate-800 transition shadow-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-5 text-center lg:text-left mb-16 lg:mb-0">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                Personal Finance <br className="hidden lg:block"/>
                <span className="text-indigo-600">Management</span>
              </h2>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Track your accounts, manage invoices, and optimize your financial health with Finary's personal finance platform.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/register"
                  className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/20 text-lg"
                >
                  Start Now
                </Link>
                <Link
                  to="/login"
                  className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 transition shadow-sm text-lg"
                >
                  Log In
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-200/50">
                {/* Enterprise Dashboard Mockup Image */}
                <img 
                  src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop" 
                  alt="Personal Finance Dashboard" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-tr from-indigo-600/10 to-transparent"></div>
              </div>
            </div>

          </div>
        </div>

        {/* Decorative background blob */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 blur-3xl opacity-20 pointer-events-none">
          <div className="aspect-square w-[800px] rounded-full bg-linear-to-tr from-indigo-500 to-sky-300"></div>
        </div>
      </main>

      {/* Feature section */}
      <section className="bg-slate-50 py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-slate-900">Why choose Finary?</h3>
            <p className="mt-4 text-slate-600">Enterprise capabilities without the enterprise complexity.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: "Centralized Accounts", desc: "Keep all your financial data securely tracked in one single source of truth." },
              { title: "Invoice Tracking", desc: "Reduce manual entry errors. Track your invoice statuses easily." },
              { title: "Financial Overview", desc: "Get a clear picture of your finances with powerful aggregate views." }
            ].map((f, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-xs border border-slate-100">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6 font-bold text-xl">{i+1}</div>
                <h4 className="text-xl font-semibold text-slate-900 mb-3">{f.title}</h4>
                <p className="text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
