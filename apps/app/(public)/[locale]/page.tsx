import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localizedAlternates, resolveLocaleParam } from "@/lib/localized-metadata";
import { defenseHome } from "@/lib/content/home/defense-home-content";
import { PortalSearchBar } from "@/components/public/search/portal-search-bar";
import {
  ArticleCard,
  CtaButtonsGroup,
  LinkTile,
  SearchSuggestionTag,
  type CtaButton,
} from "@/components/public/content/ads-fragments";

const HOME_PATH = "/";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocaleParam(rawLocale);

  const tHome = await getTranslations({ locale, namespace: "home" });
  const tMeta = await getTranslations({ locale, namespace: "meta" });

  return {
    title: { absolute: tHome("metaTitle") },
    description: tMeta("description"),
    ...localizedAlternates(locale, HOME_PATH),
  };
}

/* Layout helpers below use the ADS design tokens through `var(--ads-*)` (the
 * single source of tokens — main.css) so light/dark switching and theming stay
 * owned by the Design System. Only the ministry-specific arrangement of these
 * blocks is expressed here, inline, without any local stylesheet. */

const heroContainerStyle: CSSProperties = {
  maxWidth: "52rem",
  marginInline: "auto",
  textAlign: "center",
};

const searchBlockStyle: CSSProperties = {
  maxWidth: "42rem",
  margin: "2.25rem auto 0",
  textAlign: "left",
};

const searchTitleStyle: CSSProperties = {
  margin: "0 0 0.75rem",
  fontSize: "1.25rem",
  lineHeight: 1.3,
  fontWeight: 700,
};

const popularLabelStyle: CSSProperties = {
  margin: "0 0 0.5rem",
  fontSize: "0.875rem",
  color: "var(--ads-color-text-muted)",
};

const popularListStyle: CSSProperties = {
  listStyle: "none",
  margin: "0",
  padding: "0",
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
};

const cardListStyle: CSSProperties = {
  listStyle: "none",
  margin: "0",
  padding: "0",
  display: "grid",
  gap: "1.5rem",
};

/** Right-hand column of the news section (secondary articles + meeting). */
const newsAsideStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  height: "100%",
};

const linkListStyle: CSSProperties = {
  listStyle: "none",
  margin: "0",
  padding: "0",
  display: "grid",
  gap: "0",
  maxWidth: "72rem",
};

/** Whole-card link block (priorities, operations, capabilities, meetings…). */
const teaserCardStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  height: "100%",
  padding: "1.25rem",
  background: "var(--ads-color-background)",
  border: "1px solid var(--ads-color-border)",
  borderTop: "3px solid var(--ads-color-primary)",
  textDecoration: "none",
  color: "var(--ads-color-text)",
};

const teaserTagStyle: CSSProperties = {
  fontSize: "0.75rem",
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--ads-color-primary)",
};

const teaserTitleStyle: CSSProperties = {
  display: "block",
  fontSize: "1.0625rem",
  lineHeight: 1.35,
  fontWeight: 700,
};

const teaserDescStyle: CSSProperties = {
  display: "block",
  fontSize: "0.875rem",
  lineHeight: 1.55,
  color: "var(--ads-color-text-muted)",
};

const teaserArrowStyle: CSSProperties = {
  marginTop: "auto",
  alignSelf: "flex-end",
  fontSize: "1rem",
  color: "var(--ads-color-primary)",
};

/** Meeting teaser — must not stretch with the column (unlike the cards). */
const meetingCardStyle: CSSProperties = {
  ...teaserCardStyle,
  height: "auto",
};

const iconBlockStyle: CSSProperties = {
  fontSize: "1.375rem",
  lineHeight: 1,
  color: "var(--ads-color-primary)",
};

const paragraphStyle: CSSProperties = {
  margin: "0 0 1.5rem",
  maxWidth: "52rem",
  fontSize: "1.0625rem",
  lineHeight: 1.6,
  color: "var(--ads-color-text)",
};

/** Two strategic domains of the “Renseignement & Cyberdéfense” section. */
const domainBlockStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  height: "100%",
  padding: "1.5rem",
  background: "var(--ads-color-background)",
  border: "1px solid var(--ads-color-border)",
  borderTop: "3px solid var(--ads-color-primary)",
};

const domainTitleStyle: CSSProperties = {
  margin: "0",
  fontSize: "1.25rem",
  lineHeight: 1.35,
  fontWeight: 700,
  color: "var(--ads-color-text)",
};

const domainLeadStyle: CSSProperties = {
  margin: "0",
  fontSize: "0.9375rem",
  lineHeight: 1.6,
  color: "var(--ads-color-text-muted)",
};

const domainListStyle: CSSProperties = {
  listStyle: "none",
  margin: "0.75rem 0 0",
  padding: "0",
  display: "grid",
  gap: "0.5rem",
  marginTop: "auto",
};

const domainLinkStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1rem",
  padding: "0.625rem 0.75rem",
  fontSize: "0.9375rem",
  fontWeight: 600,
  color: "var(--ads-color-text)",
  border: "1px solid var(--ads-color-border)",
  background: "var(--ads-color-surface-muted)",
  textDecoration: "none",
};

/** Link rows of the “Paroles & décisions” section. */
const statementRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  padding: "1rem 1.25rem",
  fontWeight: 600,
  textDecoration: "none",
  color: "var(--ads-color-text)",
  border: "1px solid var(--ads-color-border)",
  borderTop: "none",
  background: "var(--ads-color-background)",
};

const ministryLeadStyle: CSSProperties = {
  margin: "0 auto 1.5rem",
  maxWidth: "42rem",
  fontSize: "0.9375rem",
  lineHeight: 1.7,
  color: "var(--ads-color-text-muted)",
};

/** Adapts a variable-length action list to the fixed ADS buttons tuple. */
function toCtaButtons(buttons: ReadonlyArray<CtaButton>): [CtaButton, ...CtaButton[]] {
  return [buttons[0], ...buttons.slice(1)];
}

/**
 * Homepage of the Ministry of Defense and of the Armed Forces — the official
 * institutional front door of `defense.gouv.aor`.
 *
 * The header allows exploring the ministry (seven themes, unchanged); this
 * page presents the ministry itself as a narrative journey, section after
 * section:
 *
 *   01 Défendre la République        — the mission and the portal search
 *   02 L'actualité de la Défense     — editorial news, before the rest
 *   03 Les priorités de défense      — sovereignty, protection, anticipation, resilience
 *   04 Les Armées                    — the forces at the institutional level, entry to mil.gouv.aor
 *   05 Les opérations                — national, external, exercises, cooperation
 *   06 Renseignement & Cyberdéfense  — understanding threats, protecting cyberspace
 *   07 Capacités & Industrie         — equipment, programs, innovation, industry
 *   08 Servir la République          — careers, civilians, reserve, training
 *   09 Paroles & décisions           — official statements and publications
 *   10 Le Ministère                  — the institution and its administration
 *
 * Every section is driven by the `defenseHome` configuration
 * (lib/content/home/defense-home-content.ts) and the message catalogs, so the
 * content can evolve without rewriting the interface. The Armed Forces are
 * only presented at the institutional level: their operational detail belongs
 * to `mil.gouv.aor`, which the page points to through explicit entry points.
 */
export default async function HomePage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocaleParam(rawLocale);
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "home" });
  const tNavPanel = await getTranslations({ locale, namespace: "nav.panel" });

  const heroActions: CtaButton[] = defenseHome.hero.actions.map((action) => ({
    children: t(action.labelKey),
    href: action.href,
    priority: action.priority ?? "secondary",
    iconId: action.iconId,
  }));

  const newsActions: CtaButton[] = defenseHome.news.actions.map((action) => ({
    children: t(action.labelKey),
    href: action.href,
    priority: "secondary",
    iconId: "fr-icon-arrow-right-line",
  }));

  return (
    <>
      {/* 01 — Défendre la République: the institutional statement, the two main
          actions of the ministry and the portal search. */}
      <section className="gov-section" aria-labelledby="home-hero-title">
        <div className="gov-section__container" style={heroContainerStyle}>
          <p className="gov-kicker">{t("hero.kicker")}</p>
          <h1 id="home-hero-title">{t("hero.title")}</h1>
          <p className="gov-lead">{t("hero.lead")}</p>
          <div style={{ marginTop: "1.5rem" }}>
            <CtaButtonsGroup alignment="center" buttons={toCtaButtons(heroActions)} />
          </div>
          <div style={searchBlockStyle}>
            <h2 id="home-search-title" style={searchTitleStyle}>
              {t("hero.searchTitle")}
            </h2>
            <PortalSearchBar label={t("hero.searchLabel")} placeholder={t("hero.searchPlaceholder")} />
            <div style={{ marginTop: "1.25rem" }}>
              <p style={popularLabelStyle} id="popular-searches-label">
                {t("hero.popularLabel")}
              </p>
              <ul style={popularListStyle} aria-labelledby="popular-searches-label">
                {defenseHome.hero.search.popular.map((search) => (
                  <li key={search.key}>
                    <SearchSuggestionTag
                      label={t(`hero.popular.${search.key}`)}
                      href={search.href}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — L'actualité de la Défense: one featured article, secondary news
          and an upcoming meeting, with entries to the editorial spaces. */}
      <section className="gov-section gov-section--subtle" aria-labelledby="news-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("news.kicker")}</p>
              <h2 id="news-title" className="gov-section__title">
                {t("news.title")}
              </h2>
              <p className="gov-lead">{t("news.lead")}</p>
            </div>
            <CtaButtonsGroup buttons={toCtaButtons(newsActions)} />
          </div>
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-12 fr-col-lg-7">
              <ArticleCard
                title={t(defenseHome.news.featured.titleKey)}
                desc={
                  defenseHome.news.featured.textKey
                    ? t(defenseHome.news.featured.textKey)
                    : undefined
                }
                tag={t(defenseHome.news.featured.tagKey)}
                date={t(defenseHome.news.featured.dateKey)}
                href={defenseHome.news.featured.href}
                size="large"
              />
            </div>
            <div className="fr-col-12 fr-col-lg-5" style={newsAsideStyle}>
              <ul style={cardListStyle}>
                {defenseHome.news.secondary.map((article) => (
                  <li key={article.key}>
                    <ArticleCard
                      title={t(article.titleKey)}
                      tag={t(article.tagKey)}
                      date={t(article.dateKey)}
                      href={article.href}
                      size="small"
                    />
                  </li>
                ))}
              </ul>
              <a href={defenseHome.news.event.href} style={meetingCardStyle}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span className="fr-icon-calendar-line" aria-hidden="true" style={iconBlockStyle} />
                  <span style={teaserTagStyle}>{t(defenseHome.news.event.tagKey)}</span>
                </span>
                <span style={teaserTitleStyle}>{t(defenseHome.news.event.titleKey)}</span>
                <span style={teaserDescStyle}>{t(defenseHome.news.event.dateKey)}</span>
                <span className="fr-icon-arrow-right-line" aria-hidden="true" style={teaserArrowStyle} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Les priorités de défense: the four strategic orientations of the
          defense policy of the Republic. */}
      <section className="gov-section" aria-labelledby="priorities-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("priorities.kicker")}</p>
              <h2 id="priorities-title" className="gov-section__title">
                {t("priorities.title")}
              </h2>
              <p className="gov-lead">{t("priorities.lead")}</p>
            </div>
          </div>
          <ul className="fr-grid-row fr-grid-row--gutters" role="list">
            {defenseHome.priorities.map((item) => (
              <li key={item.key} className="fr-col-12 fr-col-md-6 fr-col-lg-3">
                <a href={item.href} style={teaserCardStyle}>
                  <span className={item.iconId} aria-hidden="true" style={iconBlockStyle} />
                  <span style={teaserTitleStyle}>{t(item.titleKey)}</span>
                  <span style={teaserDescStyle}>{t(item.descKey)}</span>
                  <span className="fr-icon-arrow-right-line" aria-hidden="true" style={teaserArrowStyle} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 04 — Les Armées: the forces at the institutional level, with a clear
          entry point towards their own portal (mil.gouv.aor). */}
      <section className="gov-section gov-section--subtle" aria-labelledby="forces-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("armedForces.kicker")}</p>
              <h2 id="forces-title" className="gov-section__title">
                {t("armedForces.title")}
              </h2>
              <p className="gov-lead">{t("armedForces.lead")}</p>
            </div>
            <CtaButtonsGroup
              buttons={[
                {
                  children: t(defenseHome.armedForces.cta.labelKey),
                  href: defenseHome.armedForces.cta.href,
                  priority: "secondary",
                  iconId: "fr-icon-arrow-right-line",
                },
              ]}
            />
          </div>
          <p style={paragraphStyle}>{t("armedForces.text")}</p>
          <div className="fr-grid-row fr-grid-row--gutters">
            {defenseHome.armedForces.forces.map((force) => (
              <div key={force.key} className="fr-col-12 fr-col-md-6 fr-col-lg-3">
                <LinkTile
                  title={tNavPanel(force.navTitleKey)}
                  desc={t(force.descKey)}
                  href={force.href}
                  iconId={force.iconId}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — Les opérations: the defense in action, at the institutional
          level only — no operational detail. */}
      <section className="gov-section" aria-labelledby="operations-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("operations.kicker")}</p>
              <h2 id="operations-title" className="gov-section__title">
                {t("operations.title")}
              </h2>
              <p className="gov-lead">{t("operations.lead")}</p>
            </div>
          </div>
          <ul className="fr-grid-row fr-grid-row--gutters" role="list">
            {defenseHome.operations.map((item) => (
              <li key={item.key} className="fr-col-12 fr-col-md-6 fr-col-lg-3">
                <a href={item.href} style={teaserCardStyle}>
                  <span className={item.iconId} aria-hidden="true" style={iconBlockStyle} />
                  <span style={teaserTitleStyle}>{t(item.titleKey)}</span>
                  <span style={teaserDescStyle}>{t(item.descKey)}</span>
                  <span className="fr-icon-arrow-right-line" aria-hidden="true" style={teaserArrowStyle} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 06 — Renseignement & Cyberdéfense: two complementary strategic
          domains, presented without any sensitive operational detail. */}
      <section className="gov-section gov-section--subtle" aria-labelledby="intelligence-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("intelligence.kicker")}</p>
              <h2 id="intelligence-title" className="gov-section__title">
                {t("intelligence.title")}
              </h2>
              <p className="gov-lead">{t("intelligence.lead")}</p>
            </div>
            <CtaButtonsGroup
              buttons={[
                {
                  children: t(defenseHome.intelligence.cta.labelKey),
                  href: defenseHome.intelligence.cta.href,
                  priority: "secondary",
                  iconId: "fr-icon-arrow-right-line",
                },
              ]}
            />
          </div>
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-12 fr-col-lg-6">
              <div style={domainBlockStyle}>
                <span className="fr-icon-radar-line" aria-hidden="true" style={iconBlockStyle} />
                <p style={teaserTagStyle}>{t("intelligence.renseignement.kicker")}</p>
                <h3 style={domainTitleStyle}>{t("intelligence.renseignement.title")}</h3>
                <p style={domainLeadStyle}>{t("intelligence.renseignement.lead")}</p>
                <ul role="list" style={domainListStyle}>
                  {defenseHome.intelligence.renseignement.map((link) => (
                    <li key={link.key}>
                      <a href={link.href} style={domainLinkStyle}>
                        {t(link.labelKey)}
                        <span className="fr-icon-arrow-right-line" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="fr-col-12 fr-col-lg-6">
              <div style={domainBlockStyle}>
                <span className="fr-icon-router-line" aria-hidden="true" style={iconBlockStyle} />
                <p style={teaserTagStyle}>{t("intelligence.cyber.kicker")}</p>
                <h3 style={domainTitleStyle}>{t("intelligence.cyber.title")}</h3>
                <p style={domainLeadStyle}>{t("intelligence.cyber.lead")}</p>
                <ul role="list" style={domainListStyle}>
                  {defenseHome.intelligence.cyberdefense.map((link) => (
                    <li key={link.key}>
                      <a href={link.href} style={domainLinkStyle}>
                        {t(link.labelKey)}
                        <span className="fr-icon-arrow-right-line" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 07 — Capacités & Industrie: how the Republic builds and maintains its
          defense capabilities. */}
      <section className="gov-section" aria-labelledby="capabilities-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("capabilities.kicker")}</p>
              <h2 id="capabilities-title" className="gov-section__title">
                {t("capabilities.title")}
              </h2>
              <p className="gov-lead">{t("capabilities.lead")}</p>
            </div>
            <CtaButtonsGroup
              buttons={[
                {
                  children: t(defenseHome.capabilities.cta.labelKey),
                  href: defenseHome.capabilities.cta.href,
                  priority: "secondary",
                  iconId: "fr-icon-arrow-right-line",
                },
              ]}
            />
          </div>
          <ul className="fr-grid-row fr-grid-row--gutters" role="list">
            {defenseHome.capabilities.items.map((item) => (
              <li key={item.key} className="fr-col-12 fr-col-md-6 fr-col-lg-3">
                <a href={item.href} style={teaserCardStyle}>
                  <span className={item.iconId} aria-hidden="true" style={iconBlockStyle} />
                  <span style={teaserTitleStyle}>{t(item.titleKey)}</span>
                  <span style={teaserDescStyle}>{t(item.descKey)}</span>
                  <span className="fr-icon-arrow-right-line" aria-hidden="true" style={teaserArrowStyle} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 08 — Servir la République: the human dimension of defense, with a
          clear entry towards the Armed Forces portal for military life. */}
      <section className="gov-section gov-section--subtle" aria-labelledby="serve-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("serve.kicker")}</p>
              <h2 id="serve-title" className="gov-section__title">
                {t("serve.title")}
              </h2>
              <p className="gov-lead">{t("serve.lead")}</p>
            </div>
            <CtaButtonsGroup
              buttons={[
                {
                  children: t(defenseHome.serve.cta.labelKey),
                  href: defenseHome.serve.cta.href,
                  priority: "secondary",
                  iconId: "fr-icon-arrow-right-line",
                },
              ]}
            />
          </div>
          <p style={paragraphStyle}>{t("serve.text")}</p>
          <div className="fr-grid-row fr-grid-row--gutters">
            {defenseHome.serve.paths.map((item) => (
              <div key={item.key} className="fr-col-12 fr-col-md-6 fr-col-lg-3">
                <LinkTile
                  title={t(item.titleKey)}
                  desc={t(item.descKey)}
                  href={item.href}
                  iconId={item.iconId}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 09 — Paroles & décisions: what the ministry officially says, decides
          and publishes — distinct from the news (section 02). */}
      <section className="gov-section" aria-labelledby="statements-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("statements.kicker")}</p>
              <h2 id="statements-title" className="gov-section__title">
                {t("statements.title")}
              </h2>
              <p className="gov-lead">{t("statements.lead")}</p>
            </div>
          </div>
          <ul role="list" style={linkListStyle}>
            {defenseHome.statements.map((item) => (
              <li key={item.key}>
                <a href={item.href} style={statementRowStyle}>
                  <span className={item.iconId} aria-hidden="true" style={iconBlockStyle} />
                  <span style={{ display: "flex", flexDirection: "column", gap: "0.125rem", flex: 1 }}>
                    <span style={teaserTitleStyle}>{t(item.titleKey)}</span>
                    <span className="fr-text--sm" style={{ fontWeight: 400, color: "var(--ads-color-text-muted)" }}>
                      {t(item.descKey)}
                    </span>
                  </span>
                  <span className="fr-icon-arrow-right-line" aria-hidden="true" style={{ color: "var(--ads-color-primary)" }} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 10 — Le Ministère: the institutional closing — how the ministry is
          organised and how to access its official resources. */}
      <section className="gov-section gov-section--subtle" aria-labelledby="ministry-title">
        <div className="gov-section__container" style={heroContainerStyle}>
          <p className="gov-kicker">{t("ministry.kicker")}</p>
          <h2 id="ministry-title" className="gov-section__title">
            {t("ministry.title")}
          </h2>
          <p style={ministryLeadStyle}>{t("ministry.lead")}</p>
          <ul
            role="list"
            style={{
              ...popularListStyle,
              justifyContent: "center",
              marginTop: "1.5rem",
              gap: "0.625rem 1.75rem",
            }}
          >
            {defenseHome.ministry.map((link) => (
              <li key={link.key}>
                <a href={link.href} style={{ fontWeight: 600, textUnderlineOffset: "0.2em" }}>
                  {t(link.labelKey)}
                  <span className="fr-icon-arrow-right-line" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}