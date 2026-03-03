import { Link } from "react-router-dom";
import { artCategories } from "@/data/artCategories";

const SiteFooter = () => {
  return (
    <footer className="w-full border-t border-border mt-20 py-12 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h4 className="font-display text-lg text-foreground mb-3">Fratoz Egrégora</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Uma rede colaborativa de arte e cultura que conecta linguagens, artistas e públicos em experiências transmídia.
          </p>
        </div>
        <div>
          <h4 className="font-body text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Linguagens</h4>
          <div className="grid grid-cols-2 gap-1">
            {artCategories.map((cat) => (
              <Link key={cat.id} to={`/${cat.slug}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1">
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-body text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Contato</h4>
          <p className="text-sm text-muted-foreground">info@fratozegregora.com</p>
          <p className="text-sm text-muted-foreground mt-1">Brasília — DF, Brasil</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-10 pt-6 border-t border-border text-center">
        <p className="text-xs text-muted-foreground">© 2026 Fratoz Egrégora. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default SiteFooter;
