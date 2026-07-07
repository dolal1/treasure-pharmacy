import { Link } from "react-router-dom";
import { useBranches, useContent } from "../api/hooks";
import { LogoMark, MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "./icons";

export default function Footer() {
  const { data: branches } = useBranches();
  const { data: content } = useContent();
  const whatsapp = content?.["whatsapp-number"]?.text ?? "256700123000";

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-9 w-9" />
            <span className="text-lg font-bold text-white">Treasure Pharmacy</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Licensed pharmacy and digital clinic serving Kampala — lab tests, consultations,
            home care and bedside nursing, bookable online.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/services" className="hover:text-teal-400">Our services</Link></li>
            <li><Link to="/book" className="hover:text-teal-400">Book a service</Link></li>
            <li><Link to="/branches" className="hover:text-teal-400">Find a branch</Link></li>
            <li><Link to="/about" className="hover:text-teal-400">About us</Link></li>
            <li><Link to="/contact" className="hover:text-teal-400">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Branches</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {(branches ?? []).map((branch) => (
              <li key={branch.id} className="flex gap-2">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
                <span>
                  <span className="font-medium text-slate-200">{branch.name}</span>
                  <br />
                  {branch.address}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Talk to us</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-teal-400"
              >
                <WhatsAppIcon className="h-4 w-4 text-teal-400" /> WhatsApp us
              </a>
            </li>
            <li className="flex items-center gap-2">
              <PhoneIcon className="h-4 w-4 text-teal-400" /> +256 700 123 000
            </li>
            <li className="flex items-center gap-2">
              <MailIcon className="h-4 w-4 text-teal-400" /> care@treasurepharmacy.example
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} Treasure Pharmacy, Kampala. Portfolio demonstration build.</p>
          <p>React · Django REST · PostgreSQL</p>
        </div>
      </div>
    </footer>
  );
}
