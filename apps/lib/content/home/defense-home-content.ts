import type { FrIconClassName } from "@codegouvaor/react-ads/fr";
import { sectionPaths } from "@/lib/site-structure";

/**
 * Editorial content of the homepage of `defense.gouv.aor`.
 *
 * Structure only: every display string is resolved from the message catalogs
 * (`home.*` in `apps/messages/{fr,en}.json`). This module holds what a future
 * CMS/API will replace — the ordered sections, the destinations, the icons and
 * the message keys — so the page layout never has to change when the content
 * does.
 *
 * The homepage is deliberately distinct from `mil.gouv.aor`, the portal of the
 * Armed Forces: operational detail (units, military trades, recruitment, daily
 * military life) is not reproduced here. The Armed Forces are only presented at
 * the institutional level, with a clear entry point towards their own portal.
 */

/** Official portal of the Armed Forces of Astoria. */
export const MILITARY_PORTAL_URL = "https://mil.gouv.aor";

/** `Le Ministère → Actualités et contact` pages of the URL plan. */
const actualitesPath = (page: "actualites" | "communiques" | "agenda" | "publications") =>
  `${sectionPaths.leMinistere}/actualites-et-contact/${page}`;

/** A destination of the homepage (CTA, tile, link row). */
export type HomeDestination = {
  key: string;
  labelKey: string;
  href: string;
  descKey?: string;
  iconId?: FrIconClassName;
  priority?: "primary" | "secondary";
};

/** A teaser card of the homepage (icon + title + desc). */
export type HomeTeaser = {
  key: string;
  titleKey: string;
  descKey: string;
  href: string;
  iconId: FrIconClassName;
};

/** An editorial article of the “Actualité” section. */
export type HomeArticle = {
  key: string;
  tagKey: string;
  titleKey: string;
  dateKey: string;
  href: string;
  textKey?: string;
};

/**
 * The ordered editorial content of the homepage — ten sections, from the heart
 * of the defense mission towards the institution:
 *
 *   01 Défendre la République       (hero + search)
 *   02 L'actualité de la Défense    (editorial news)
 *   03 Les priorités de défense     (Souveraineté, Protection, Anticipation, Résilience)
 *   04 Les Armées                   (institutional forces + entry to mil.gouv.aor)
 *   05 Les opérations               (national, external, exercises, cooperation)
 *   06 Renseignement & Cyberdéfense (intelligence and cyber protection)
 *   07 Capacités & Industrie        (equipment, programs, innovation, industry)
 *   08 Servir la République         (careers, civilians, reserve, training)
 *   09 Paroles & décisions          (official statements and publications)
 *   10 Le Ministère                 (institution and administration)
 */
export const defenseHome = {
  hero: {
    actions: [
      {
        key: "politique",
        labelKey: "hero.ctaPolicy",
        href: sectionPaths.defenseNationale,
        priority: "primary",
        iconId: "fr-icon-arrow-right-line",
      },
      {
        key: "armees",
        labelKey: "hero.ctaArmedForces",
        href: MILITARY_PORTAL_URL,
        priority: "secondary",
        iconId: "fr-icon-arrow-right-line",
      },
    ],
    search: {
      popular: [
        { key: "recrutement", href: `${sectionPaths.personnelService}/recrutement` },
        {
          key: "reserve",
          href: `${sectionPaths.personnelService}/reserve-et-anciens-militaires/reserve-operationnelle`,
        },
        { key: "cyberdefense", href: `${sectionPaths.renseignementCyberdefense}/cyberdefense` },
        {
          key: "budget",
          href: `${sectionPaths.leMinistere}/budget-et-transparence/budget-de-la-defense`,
        },
      ],
    },
  },

  news: {
    featured: {
      key: "featured",
      tagKey: "news.featured.tag",
      titleKey: "news.featured.title",
      textKey: "news.featured.text",
      dateKey: "news.featured.date",
      href: actualitesPath("actualites"),
    },
    secondary: [
      {
        key: "cyber",
        tagKey: "news.secondary.cyber.tag",
        titleKey: "news.secondary.cyber.title",
        dateKey: "news.secondary.cyber.date",
        href: actualitesPath("actualites"),
      },
      {
        key: "reserve",
        tagKey: "news.secondary.reserve.tag",
        titleKey: "news.secondary.reserve.title",
        dateKey: "news.secondary.reserve.date",
        href: `${sectionPaths.personnelService}/reserve-et-anciens-militaires/reserve-operationnelle`,
      },
    ],
    event: {
      key: "agenda",
      tagKey: "news.event.tag",
      titleKey: "news.event.title",
      dateKey: "news.event.date",
      href: actualitesPath("agenda"),
    },
    actions: [
      { key: "actualites", labelKey: "news.cta.actualites", href: actualitesPath("actualites") },
      { key: "communiques", labelKey: "news.cta.communiques", href: actualitesPath("communiques") },
      { key: "agenda", labelKey: "news.cta.agenda", href: actualitesPath("agenda") },
    ],
  },

  priorities: [
    {
      key: "souverainete",
      titleKey: "priorities.items.souverainete.title",
      descKey: "priorities.items.souverainete.desc",
      href: `${sectionPaths.defenseNationale}/souverainete-et-resilience/souverainete-nationale`,
      iconId: "fr-icon-flag-line",
    },
    {
      key: "protection",
      titleKey: "priorities.items.protection.title",
      descKey: "priorities.items.protection.desc",
      href: `${sectionPaths.defenseNationale}/souverainete-et-resilience/protection-des-interets-vitaux`,
      iconId: "fr-icon-shield-line",
    },
    {
      key: "anticipation",
      titleKey: "priorities.items.anticipation.title",
      descKey: "priorities.items.anticipation.desc",
      href: `${sectionPaths.renseignementCyberdefense}/renseignement-militaire`,
      iconId: "fr-icon-eye-line",
    },
    {
      key: "resilience",
      titleKey: "priorities.items.resilience.title",
      descKey: "priorities.items.resilience.desc",
      href: `${sectionPaths.defenseNationale}/souverainete-et-resilience/resilience-nationale`,
      iconId: "fr-icon-refresh-line",
    },
  ],

  armedForces: {
    cta: {
      key: "armees",
      labelKey: "armedForces.cta",
      href: MILITARY_PORTAL_URL,
      priority: "secondary",
      iconId: "fr-icon-arrow-right-line",
    },
    forces: [
      {
        key: "armeeDeTerre",
        navTitleKey: "forcesArmees.armeeDeTerre.title",
        descKey: "armedForces.items.armeeDeTerre.desc",
        href: `${sectionPaths.forcesArmees}/armee-de-terre`,
        iconId: "fr-icon-flag-line",
      },
      {
        key: "marine",
        navTitleKey: "forcesArmees.marine.title",
        descKey: "armedForces.items.marine.desc",
        href: `${sectionPaths.forcesArmees}/marine`,
        iconId: "fr-icon-anchor-line",
      },
      {
        key: "airEspace",
        navTitleKey: "forcesArmees.armeeDeLAirEtDeLEspace.title",
        descKey: "armedForces.items.airEspace.desc",
        href: `${sectionPaths.forcesArmees}/armee-de-l-air-et-de-l-espace`,
        iconId: "fr-icon-earth-line",
      },
      {
        key: "interarmees",
        navTitleKey: "forcesArmees.forcesInterarmeesEtServices.title",
        descKey: "armedForces.items.interarmees.desc",
        href: `${sectionPaths.forcesArmees}/forces-interarmees-et-services`,
        iconId: "fr-icon-group-line",
      },
    ],
  },

  operations: [
    {
      key: "nationales",
      titleKey: "operations.items.nationales.title",
      descKey: "operations.items.nationales.desc",
      href: `${sectionPaths.operations}/operations-nationales`,
      iconId: "fr-icon-home-4-line",
    },
    {
      key: "exterieures",
      titleKey: "operations.items.exterieures.title",
      descKey: "operations.items.exterieures.desc",
      href: `${sectionPaths.operations}/operations-exterieures`,
      iconId: "fr-icon-earth-line",
    },
    {
      key: "exercices",
      titleKey: "operations.items.exercices.title",
      descKey: "operations.items.exercices.desc",
      href: `${sectionPaths.operations}/preparation-operationnelle/exercices`,
      iconId: "fr-icon-calendar-2-line",
    },
    {
      key: "cooperation",
      titleKey: "operations.items.cooperation.title",
      descKey: "operations.items.cooperation.desc",
      href: `${sectionPaths.operations}/operations-exterieures/cooperation-operationnelle`,
      iconId: "fr-icon-group-line",
    },
  ],

  intelligence: {
    cta: {
      key: "renseignement",
      labelKey: "intelligence.cta",
      href: sectionPaths.renseignementCyberdefense,
      priority: "secondary",
      iconId: "fr-icon-arrow-right-line",
    },
    renseignement: [
      {
        key: "missions",
        labelKey: "intelligence.renseignement.items.missions.label",
        href: `${sectionPaths.renseignementCyberdefense}/renseignement-militaire/missions`,
      },
      {
        key: "cooperation",
        labelKey: "intelligence.renseignement.items.cooperation.label",
        href: `${sectionPaths.renseignementCyberdefense}/renseignement-militaire/cooperation-interministerielle`,
      },
    ],
    cyberdefense: [
      {
        key: "protection",
        labelKey: "intelligence.cyber.items.protection.label",
        href: `${sectionPaths.renseignementCyberdefense}/cyberdefense/protection-des-systemes`,
      },
      {
        key: "crise",
        labelKey: "intelligence.cyber.items.crise.label",
        href: `${sectionPaths.renseignementCyberdefense}/cyberdefense/gestion-de-crise-cyber`,
      },
    ],
  },

  capabilities: {
    cta: {
      key: "capacites",
      labelKey: "capabilities.cta",
      href: sectionPaths.capacitesIndustrie,
      priority: "secondary",
      iconId: "fr-icon-arrow-right-line",
    },
    items: [
      {
        key: "equipements",
        titleKey: "capabilities.items.equipements.title",
        descKey: "capabilities.items.equipements.desc",
        href: `${sectionPaths.capacitesIndustrie}/equipements-et-armement`,
        iconId: "fr-icon-cpu-line",
      },
      {
        key: "programmes",
        titleKey: "capabilities.items.programmes.title",
        descKey: "capabilities.items.programmes.desc",
        href: `${sectionPaths.capacitesIndustrie}/programmes-et-acquisitions`,
        iconId: "fr-icon-line-chart-line",
      },
      {
        key: "innovation",
        titleKey: "capabilities.items.innovation.title",
        descKey: "capabilities.items.innovation.desc",
        href: `${sectionPaths.capacitesIndustrie}/recherche-et-innovation`,
        iconId: "fr-icon-settings-5-line",
      },
      {
        key: "industrie",
        titleKey: "capabilities.items.industrie.title",
        descKey: "capabilities.items.industrie.desc",
        href: `${sectionPaths.capacitesIndustrie}/industrie-de-defense`,
        iconId: "fr-icon-briefcase-line",
      },
    ],
  },

  serve: {
    cta: {
      key: "armees",
      labelKey: "serve.cta",
      href: MILITARY_PORTAL_URL,
      priority: "secondary",
      iconId: "fr-icon-arrow-right-line",
    },
    paths: [
      {
        key: "militaires",
        titleKey: "serve.items.militaires.title",
        descKey: "serve.items.militaires.desc",
        href: MILITARY_PORTAL_URL,
        iconId: "fr-icon-user-star-line",
      },
      {
        key: "civils",
        titleKey: "serve.items.civils.title",
        descKey: "serve.items.civils.desc",
        href: `${sectionPaths.personnelService}/recrutement/recrutement-civil`,
        iconId: "fr-icon-account-line",
      },
      {
        key: "reserve",
        titleKey: "serve.items.reserve.title",
        descKey: "serve.items.reserve.desc",
        href: `${sectionPaths.personnelService}/reserve-et-anciens-militaires/reserve-operationnelle`,
        iconId: "fr-icon-group-line",
      },
      {
        key: "formation",
        titleKey: "serve.items.formation.title",
        descKey: "serve.items.formation.desc",
        href: `${sectionPaths.personnelService}/formation`,
        iconId: "fr-icon-booklet-line",
      },
    ],
  },

  statements: [
    {
      key: "discours",
      titleKey: "statements.items.discours.title",
      descKey: "statements.items.discours.desc",
      href: actualitesPath("actualites"),
      iconId: "fr-icon-megaphone-line",
    },
    {
      key: "communiques",
      titleKey: "statements.items.communiques.title",
      descKey: "statements.items.communiques.desc",
      href: actualitesPath("communiques"),
      iconId: "fr-icon-article-line",
    },
    {
      key: "decisions",
      titleKey: "statements.items.decisions.title",
      descKey: "statements.items.decisions.desc",
      href: actualitesPath("publications"),
      iconId: "fr-icon-award-line",
    },
    {
      key: "publications",
      titleKey: "statements.items.publications.title",
      descKey: "statements.items.publications.desc",
      href: `${sectionPaths.leMinistere}/budget-et-transparence/rapports-d-activite`,
      iconId: "fr-icon-file-text-line",
    },
    {
      key: "donnees",
      titleKey: "statements.items.donnees.title",
      descKey: "statements.items.donnees.desc",
      href: `${sectionPaths.leMinistere}/budget-et-transparence/donnees-publiques`,
      iconId: "fr-icon-database-line",
    },
  ],

  ministry: [
    { key: "ministre", labelKey: "ministry.links.ministre.title", href: `${sectionPaths.leMinistere}/institution/le-ministre` },
    { key: "organisation", labelKey: "ministry.links.organisation.title", href: `${sectionPaths.leMinistere}/institution/organisation` },
    { key: "budget", labelKey: "ministry.links.budget.title", href: `${sectionPaths.leMinistere}/budget-et-transparence/budget-de-la-defense` },
    { key: "transparence", labelKey: "ministry.links.transparence.title", href: `${sectionPaths.leMinistere}/budget-et-transparence` },
    { key: "marches", labelKey: "ministry.links.marches.title", href: `${sectionPaths.leMinistere}/budget-et-transparence/marches-publics` },
    { key: "contact", labelKey: "ministry.links.contact.title", href: "/contact" },
  ],
} as const;