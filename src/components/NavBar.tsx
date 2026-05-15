import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar: React.FC = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = (path: string) =>
    `px-3 py-1.5 rounded-lg text-sm transition-colors ${
      location.pathname === path
        ? "text-blue-500 font-medium bg-blue-50"
        : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">

        <Link to="/" className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
          <span className="font-semibold text-gray-900 text-[15px] tracking-tight">
            TeachRate
          </span>
        </Link>

        <div className="hidden sm:flex items-center gap-1">
          <Link to="/" className={linkClass("/")}>Home</Link>
          <Link to="/feedbacks" className={linkClass("/feedbacks")}>View Feedbacks</Link>
          <Link
            to="/feedback/create"
            className="ml-2 flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add Feedback
          </Link>
        </div>

        <button
          className="sm:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="sm:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-1">
          <Link to="/" className={linkClass("/")} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/feedbacks" className={linkClass("/feedbacks")} onClick={() => setMenuOpen(false)}>View Feedbacks</Link>
          <Link
            to="/feedback/create"
            className="flex items-center gap-1.5 bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg mt-1"
            onClick={() => setMenuOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
            Add Feedback
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;