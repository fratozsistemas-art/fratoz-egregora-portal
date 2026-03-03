import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { artCategories } from "@/data/artCategories";

const SiteFooter = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full border-t border-border mt-20 py-12 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h4 className="font-display text-lg text-foreground mb-3">Fratoz Egrégora</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t("footer.tagline")}
          </p>
        </div>
        <div>
          <h4 className="font-body text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
            {t("footer.languages")}
          </h4>
          <div className="grid grid-cols-2 gap-1">
            {artCategories.map((cat) => (
              <Link
                key={cat.id}
                to={`/${cat.slug}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-body text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
            {t("footer.contact")}
          </h4>
          <p className="text-sm text-muted-foreground">info@fratozegregora.com</p>
          <p className="text-sm text-muted-foreground mt-1">{t("footer.location")}</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-10 pt-6 border-t border-border text-center">
        <p className="text-xs text-muted-foreground">{t("footer.rights")}</p>
      </div>
    </footer>
  );
};

export default SiteFooter;
