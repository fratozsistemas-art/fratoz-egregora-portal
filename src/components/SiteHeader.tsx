import { Link } from "react-router-dom";
import logoSrc from "@/assets/logo-egregora.jpg";

const SiteHeader = () => {
  return (
    <header className="w-full py-6 px-6 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3 group">
        <img src={logoSrc} alt="Egrégora logo" className="w-10 h-10 rounded-full object-cover" />
        <span className="font-display text-xl tracking-wide text-foreground group-hover:opacity-80 transition-opacity">
          Fratoz <span className="gradient-egregora-text">Egrégora</span>
        </span>
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        <Link to="/transmidia" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Transmídia
        </Link>
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Sobre
        </Link>
      </nav>
    </header>
  );
};

export default SiteHeader;
