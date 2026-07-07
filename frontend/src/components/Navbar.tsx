import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CloseIcon, LogoMark, MenuIcon } from "./icons";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/branches", label: "Branches" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

function navClass({ isActive }: { isActive: boolean }) {
  return `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? "text-teal-700" : "text-slate-600 hover:text-teal-700"
  }`;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <LogoMark className="h-9 w-9" />
          <span className="leading-tight">
            <span className="block text-base font-bold text-slate-900">
              Treasure Pharmacy
            </span>
            <span className="block text-[11px] font-medium tracking-wide text-teal-700 uppercase">
              Digital Clinic · Kampala
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={navClass} end={link.to === "/"}>
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/book"
            className="ml-3 rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700"
          >
            Book now
          </Link>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-100 bg-white px-4 pt-2 pb-4 md:hidden">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `block rounded-md px-3 py-2.5 text-base font-medium ${
                  isActive ? "bg-teal-50 text-teal-700" : "text-slate-700 hover:bg-slate-50"
                }`
              }
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/book"
            className="mt-3 block rounded-lg bg-teal-600 px-4 py-2.5 text-center text-base font-semibold text-white"
            onClick={() => setOpen(false)}
          >
            Book now
          </Link>
        </div>
      )}
    </header>
  );
}
