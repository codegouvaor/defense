/**
 * URL structure of the public portal of the Ministry of Defense and of the
 * Armed Forces of Astoria (`defense.gouv.aor`).
 *
 * Hrefs are locale-agnostic pathnames: the next-intl Link (registered as the
 * ADS link renderer) prefixes the active locale automatically. Labels are
 * never stored here — they come from the message catalogs through the key
 * provided by each entry (see `apps/messages/{fr,en}.json`).
 *
 * Architecture of the navigation:
 *
 *   primaryNavigation  → the seven entries of the portal. Each entry opens a
 *                        mega-menu panel structured in four sections of four
 *                        links:
 *                            7 entrées × 4 sections × 4 liens = 112 liens
 *
 * This file is the single source of truth of the portal navigation: the
 * header (desktop mega-menus and mobile drawer), the sitemap and the footer
 * all derive their markup from `primaryNavigation`, so adding or renaming a
 * theme, section or link never requires rewriting a component — it only
 * requires editing this file (and the matching message keys).
 *
 * The information architecture reflects the institutional perimeter of the
 * Ministry of Defense and of the Armed Forces. It is organised from the core
 * of the defense mission towards the means, then towards the administrative
 * institution — not the reverse:
 *
 *   Défense nationale         → comprendre : la politique, la stratégie et la préparation de la défense
 *   Forces armées             → organiser  : les composantes militaires au niveau institutionnel
 *   Opérations                → engager    : l'engagement des forces armées
 *   Renseignement & Cyberdéfense → protéger : le renseignement militaire et la cyberdéfense
 *   Personnel & Service       → servir     : les femmes et les hommes qui servent la défense
 *   Capacités & Industrie     → développer : les équipements, les programmes et l'industrie de défense
 *   Le Ministère              → administrer : l'institution, son administration, sa transparence
 *
 * This navigation deliberately keeps a ministry-of-defense perimeter: the
 * operational detail of the Armed Forces (units, military trades, recruitment,
 * everyday military life, force activities) belongs to the future
 * `mil.gouv.aor` portal and is not reproduced here. `defense.gouv.aor` only
 * provides the institutional entry points towards those forces.
 *
 * The structure is validated both at compile time (the tuple types below
 * enforce exactly 7 themes × 4 sections × 4 links) and at runtime
 * (`validateNavigationStructure`), so a malformed navigation fails the build.
 *
 * Hrefs follow the URL plan of the portal; several point to pages being
 * published and will resolve as soon as those sections ship.
 */
export const PORTAL_HOME = "/";

/**
 * The seven entries of the portal — both `nav.primary` and `footer.columns`
 * keys. The six first entries are the functional navigation (from the core
 * mission to the means); the seventh, `leMinistere`, is the distinct
 * institutional entry, intentionally placed last.
 */
export type PrimaryNavKey =
  | "defenseNationale"
  | "forcesArmees"
  | "operations"
  | "renseignementCyberdefense"
  | "personnelService"
  | "capacitesIndustrie"
  | "leMinistere";

/** A destination inside a mega-menu panel; its label is a `nav.panel` message key. */
export type NavigationLink = {
  labelKey: string;
  href: string;
};

/**
 * A section of a navigation theme. In the mega-menu panel it heads one of the
 * four columns (`labelKey` → `nav.panel.<theme>.<section>.title`); in the
 * footer it becomes a destination of the domain column. It carries the four
 * destinations of the section.
 */
export type NavigationItem = NavigationLink & {
  /** Related destinations nested under this section. */
  links: NavigationLinks;
};

/**
 * The four destinations of a section. The tuple type is the compile-time
 * guarantee that no section exposes anything other than exactly 4 links.
 */
export type NavigationLinks = readonly [
  NavigationLink,
  NavigationLink,
  NavigationLink,
  NavigationLink,
];

/**
 * The four sections of a theme. The tuple type is the compile-time guarantee
 * that no theme exposes anything other than exactly 4 sections.
 */
export type NavigationItems = readonly [
  NavigationItem,
  NavigationItem,
  NavigationItem,
  NavigationItem,
];

/**
 * One top-level entry of the Government Header navigation.
 *
 * Navigation principle (info.gouv.fr-inspired, adapted to Astoria): the header
 * is organised around the missions of the ministry of defense and the
 * understanding of the defense system — not around a ministry's internal
 * structure. Each entry opens a mega-menu panel composed of
 *  - a leader band: the entry name, a one-line description and the main
 *    action of the section (“Tout sur la défense nationale”, …),
 *  - four sections, each headed by its title and followed by its four
 *    destinations.
 *
 * Top-level labels resolve under `nav.primary` (`labelKey`), panel content
 * under `nav.panel` (`titleKey`, `paragraphKey`, nested `labelKey`s).
 */
export type NavigationSection = {
  type: "megaMenu";
  /** Message key (`nav.primary`) of the top-level tab. */
  labelKey: PrimaryNavKey;
  /** Landing page of the section, used by the leader action and active-state detection. */
  href: string;
  /** Leader band shown on top of the panel. */
  leader: {
    titleKey: string;
    paragraphKey: string;
    link: NavigationLink;
  };
  /** The four sections of the theme, each with its four links. */
  primaryItems: NavigationItems;
};

export type FooterColumn = {
  /** Message key (`footer.columns`) of the column heading. */
  columnKey: string;
  links: ReadonlyArray<NavigationLink>;
};

export const sectionPaths = {
  defenseNationale: "/defense-nationale",
  forcesArmees: "/forces-armees",
  operations: "/operations",
  renseignementCyberdefense: "/renseignement-et-cyberdefense",
  personnelService: "/personnel-et-service",
  capacitesIndustrie: "/capacites-et-industrie",
  leMinistere: "/le-ministere",
} as const;

export const legalPaths = {
  accessibility: "/legal/accessibility",
  privacy: "/legal/privacy",
  terms: "/legal/terms",
  cookies: "/legal/cookies",
  sitemap: "/sitemap",
} as const;

export const searchPath = "/search";

/** DOM ids used as skip-link targets. */
export const pageAnchors = {
  content: "main-content",
  footer: "main-footer",
} as const;

/** Structural guard: the navigation must stay a fixed 7 × 4 × 4 grid. */
export const navigationShape = {
  themes: 7,
  sectionsPerTheme: 4,
  linksPerSection: 4,
} as const;

/**
 * Runtime validation of the navigation structure. Returns the list of
 * problems found (empty when the structure is valid):
 *  - the portal must expose exactly 7 themes;
 *  - each theme must contain exactly 4 sections;
 *  - each section must contain exactly 4 links;
 *  - every link must carry a non-empty, absolute-path destination.
 *
 * The same invariants are enforced at compile time by the tuple types
 * (`NavigationItems`, `NavigationLinks` and the seven-tuple below).
 */
export function validateNavigationStructure(
  navigation: ReadonlyArray<NavigationSection> = primaryNavigation
): string[] {
  const problems: string[] = [];

  if (navigation.length !== navigationShape.themes) {
    problems.push(
      `La navigation doit comporter exactement ${navigationShape.themes} thèmes, or elle en compte ${navigation.length}.`
    );
  }

  for (const section of navigation) {
    if (section.primaryItems.length !== navigationShape.sectionsPerTheme) {
      problems.push(
        `Le thème « ${section.labelKey} » doit contenir exactement ${navigationShape.sectionsPerTheme} sections, or il en compte ${section.primaryItems.length}.`
      );
    }

    for (const item of section.primaryItems) {
      if (item.links.length !== navigationShape.linksPerSection) {
        problems.push(
          `La section « ${item.labelKey} » doit contenir exactement ${navigationShape.linksPerSection} liens, or elle en compte ${item.links.length}.`
        );
      }

      for (const link of item.links) {
        if (!link.href || !link.href.startsWith("/")) {
          problems.push(
            `Le lien « ${link.labelKey} » (« ${item.labelKey} ») n'a pas de destination valide : « ${link.href} ».`
          );
        }
      }
    }
  }

  return problems;
}

/**
 * Throws when the navigation structure is malformed. Called at module load so
 * a structural error fails the build immediately instead of shipping a broken
 * header. Satisfies the contract: 7 thèmes × 4 sections × 4 liens = 112 liens.
 */
function assertNavigationStructureValid(): void {
  const problems = validateNavigationStructure();
  if (problems.length > 0) {
    throw new Error(
      `Structure de navigation invalide :\n- ${problems.join("\n- ")}`
    );
  }
}

/** Convenience: the total number of destinations exposed by the navigation. */
export function countNavigationLinks(
  navigation: ReadonlyArray<NavigationSection> = primaryNavigation
): number {
  return navigation.reduce(
    (total, section) =>
      total +
      section.primaryItems.reduce(
        (sectionTotal, item) => sectionTotal + item.links.length,
        0
      ),
    0
  );
}

/**
 * Main navigation of the Government Header of the Ministry of Defense and of
 * the Armed Forces of Astoria — the permanent information architecture of the
 * portal, organised in seven entries:
 *
 *   Défense nationale             → comprendre : la stratégie, la politique, la planification et la résilience
 *   Forces armées                 → organiser  : l'Armée de Terre, la Marine, l'Armée de l'Air et de l'Espace, les forces interarmées
 *   Opérations                    → engager    : les opérations nationales et extérieures, la préparation opérationnelle
 *   Renseignement & Cyberdéfense   → protéger  : le renseignement, la cyberdéfense, la sécurité des systèmes
 *   Personnel & Service           → servir     : le recrutement, les carrières, la formation, la réserve
 *   Capacités & Industrie         → développer : les équipements, les programmes, l'industrie, la recherche
 *   Le Ministère                  → administrer : l'institution, l'administration, le budget, la transparence
 *
 * The six first entries present the *public-policy* perimeter of the ministry
 * — from the heart of the defense mission towards the means; the seventh,
 * distinct, presents the institution itself and is deliberately placed last.
 * The operational detail of the Armed Forces belongs to `mil.gouv.aor` and is
 * not absorbed here.
 *
 * Each entry opens a mega-menu panel with a leader band and four sections —
 * each section headed by its title and followed by its four destinations. The
 * panel is not the sitemap of the portal; it exposes the destinations that
 * matter to the visitor journey. The structure is configuration-driven and
 * validated: adding a section only means adding an entry here (and the
 * matching messages).
 */
export const primaryNavigation: ReadonlyArray<NavigationSection> = [
  {
    type: "megaMenu",
    labelKey: "defenseNationale",
    href: sectionPaths.defenseNationale,
    leader: {
      titleKey: "defenseNationale.title",
      paragraphKey: "defenseNationale.text",
      link: {
        labelKey: "defenseNationale.allLink",
        href: sectionPaths.defenseNationale,
      },
    },
    primaryItems: [
      {
        labelKey: "defenseNationale.strategieDeDefense.title",
        href: `${sectionPaths.defenseNationale}/strategie-de-defense`,
        links: [
          { labelKey: "defenseNationale.strategieDeDefense.strategieNationale", href: `${sectionPaths.defenseNationale}/strategie-de-defense/strategie-nationale` },
          { labelKey: "defenseNationale.strategieDeDefense.revueStrategique", href: `${sectionPaths.defenseNationale}/strategie-de-defense/revue-strategique` },
          { labelKey: "defenseNationale.strategieDeDefense.doctrineDemploiDesForces", href: `${sectionPaths.defenseNationale}/strategie-de-defense/doctrine-d-emploi-des-forces` },
          { labelKey: "defenseNationale.strategieDeDefense.documentsDeReference", href: `${sectionPaths.defenseNationale}/strategie-de-defense/documents-de-reference` },
        ],
      },
      {
        labelKey: "defenseNationale.politiqueDeDefense.title",
        href: `${sectionPaths.defenseNationale}/politique-de-defense`,
        links: [
          { labelKey: "defenseNationale.politiqueDeDefense.priorites", href: `${sectionPaths.defenseNationale}/politique-de-defense/priorites` },
          { labelKey: "defenseNationale.politiqueDeDefense.programmationMilitaire", href: `${sectionPaths.defenseNationale}/politique-de-defense/programmation-militaire` },
          { labelKey: "defenseNationale.politiqueDeDefense.dissuasion", href: `${sectionPaths.defenseNationale}/politique-de-defense/dissuasion` },
          { labelKey: "defenseNationale.politiqueDeDefense.alliancesEtTraites", href: `${sectionPaths.defenseNationale}/politique-de-defense/alliances-et-traites` },
        ],
      },
      {
        labelKey: "defenseNationale.planificationEtPreparation.title",
        href: `${sectionPaths.defenseNationale}/planification-et-preparation`,
        links: [
          { labelKey: "defenseNationale.planificationEtPreparation.planificationDeDefense", href: `${sectionPaths.defenseNationale}/planification-et-preparation/planification-de-defense` },
          { labelKey: "defenseNationale.planificationEtPreparation.preparationDeLaDefense", href: `${sectionPaths.defenseNationale}/planification-et-preparation/preparation-de-la-defense` },
          { labelKey: "defenseNationale.planificationEtPreparation.mobilisationNationale", href: `${sectionPaths.defenseNationale}/planification-et-preparation/mobilisation-nationale` },
          { labelKey: "defenseNationale.planificationEtPreparation.plansDeDefense", href: `${sectionPaths.defenseNationale}/planification-et-preparation/plans-de-defense` },
        ],
      },
      {
        labelKey: "defenseNationale.souveraineteEtResilience.title",
        href: `${sectionPaths.defenseNationale}/souverainete-et-resilience`,
        links: [
          { labelKey: "defenseNationale.souveraineteEtResilience.souveraineteNationale", href: `${sectionPaths.defenseNationale}/souverainete-et-resilience/souverainete-nationale` },
          { labelKey: "defenseNationale.souveraineteEtResilience.resilienceNationale", href: `${sectionPaths.defenseNationale}/souverainete-et-resilience/resilience-nationale` },
          { labelKey: "defenseNationale.souveraineteEtResilience.securiteNationale", href: `${sectionPaths.defenseNationale}/souverainete-et-resilience/securite-nationale` },
          { labelKey: "defenseNationale.souveraineteEtResilience.protectionDesInteretsVitaux", href: `${sectionPaths.defenseNationale}/souverainete-et-resilience/protection-des-interets-vitaux` },
        ],
      },
    ],
  },
  {
    type: "megaMenu",
    labelKey: "forcesArmees",
    href: sectionPaths.forcesArmees,
    leader: {
      titleKey: "forcesArmees.title",
      paragraphKey: "forcesArmees.text",
      link: { labelKey: "forcesArmees.allLink", href: sectionPaths.forcesArmees },
    },
    primaryItems: [
      {
        labelKey: "forcesArmees.armeeDeTerre.title",
        href: `${sectionPaths.forcesArmees}/armee-de-terre`,
        links: [
          { labelKey: "forcesArmees.armeeDeTerre.presentation", href: `${sectionPaths.forcesArmees}/armee-de-terre/presentation` },
          { labelKey: "forcesArmees.armeeDeTerre.organisation", href: `${sectionPaths.forcesArmees}/armee-de-terre/organisation` },
          { labelKey: "forcesArmees.armeeDeTerre.missions", href: `${sectionPaths.forcesArmees}/armee-de-terre/missions` },
          { labelKey: "forcesArmees.armeeDeTerre.carrieres", href: `${sectionPaths.forcesArmees}/armee-de-terre/carrieres` },
        ],
      },
      {
        labelKey: "forcesArmees.marine.title",
        href: `${sectionPaths.forcesArmees}/marine`,
        links: [
          { labelKey: "forcesArmees.marine.presentation", href: `${sectionPaths.forcesArmees}/marine/presentation` },
          { labelKey: "forcesArmees.marine.organisation", href: `${sectionPaths.forcesArmees}/marine/organisation` },
          { labelKey: "forcesArmees.marine.missions", href: `${sectionPaths.forcesArmees}/marine/missions` },
          { labelKey: "forcesArmees.marine.carrieres", href: `${sectionPaths.forcesArmees}/marine/carrieres` },
        ],
      },
      {
        labelKey: "forcesArmees.armeeDeLAirEtDeLEspace.title",
        href: `${sectionPaths.forcesArmees}/armee-de-l-air-et-de-l-espace`,
        links: [
          { labelKey: "forcesArmees.armeeDeLAirEtDeLEspace.presentation", href: `${sectionPaths.forcesArmees}/armee-de-l-air-et-de-l-espace/presentation` },
          { labelKey: "forcesArmees.armeeDeLAirEtDeLEspace.organisation", href: `${sectionPaths.forcesArmees}/armee-de-l-air-et-de-l-espace/organisation` },
          { labelKey: "forcesArmees.armeeDeLAirEtDeLEspace.missions", href: `${sectionPaths.forcesArmees}/armee-de-l-air-et-de-l-espace/missions` },
          { labelKey: "forcesArmees.armeeDeLAirEtDeLEspace.carrieres", href: `${sectionPaths.forcesArmees}/armee-de-l-air-et-de-l-espace/carrieres` },
        ],
      },
      {
        labelKey: "forcesArmees.forcesInterarmeesEtServices.title",
        href: `${sectionPaths.forcesArmees}/forces-interarmees-et-services`,
        links: [
          { labelKey: "forcesArmees.forcesInterarmeesEtServices.etatMajorDesArmees", href: `${sectionPaths.forcesArmees}/forces-interarmees-et-services/etat-major-des-armees` },
          { labelKey: "forcesArmees.forcesInterarmeesEtServices.commandementInterarmees", href: `${sectionPaths.forcesArmees}/forces-interarmees-et-services/commandement-interarmees` },
          { labelKey: "forcesArmees.forcesInterarmeesEtServices.forcesSpeciales", href: `${sectionPaths.forcesArmees}/forces-interarmees-et-services/forces-speciales` },
          { labelKey: "forcesArmees.forcesInterarmeesEtServices.servicesDeSoutien", href: `${sectionPaths.forcesArmees}/forces-interarmees-et-services/services-de-soutien` },
        ],
      },
    ],
  },
  {
    type: "megaMenu",
    labelKey: "operations",
    href: sectionPaths.operations,
    leader: {
      titleKey: "operations.title",
      paragraphKey: "operations.text",
      link: { labelKey: "operations.allLink", href: sectionPaths.operations },
    },
    primaryItems: [
      {
        labelKey: "operations.operationsNationales.title",
        href: `${sectionPaths.operations}/operations-nationales`,
        links: [
          { labelKey: "operations.operationsNationales.protectionDuTerritoire", href: `${sectionPaths.operations}/operations-nationales/protection-du-territoire` },
          { labelKey: "operations.operationsNationales.missionsDeSecurite", href: `${sectionPaths.operations}/operations-nationales/missions-de-securite` },
          { labelKey: "operations.operationsNationales.soutienAuxPopulations", href: `${sectionPaths.operations}/operations-nationales/soutien-aux-populations` },
          { labelKey: "operations.operationsNationales.secoursEtUrgence", href: `${sectionPaths.operations}/operations-nationales/secours-et-urgence` },
        ],
      },
      {
        labelKey: "operations.operationsExterieures.title",
        href: `${sectionPaths.operations}/operations-exterieures`,
        links: [
          { labelKey: "operations.operationsExterieures.engagementsExterieurs", href: `${sectionPaths.operations}/operations-exterieures/engagements-exterieurs` },
          { labelKey: "operations.operationsExterieures.operationsDePaix", href: `${sectionPaths.operations}/operations-exterieures/operations-de-paix` },
          { labelKey: "operations.operationsExterieures.cooperationOperationnelle", href: `${sectionPaths.operations}/operations-exterieures/cooperation-operationnelle` },
          { labelKey: "operations.operationsExterieures.bilanDesOperations", href: `${sectionPaths.operations}/operations-exterieures/bilan-des-operations` },
        ],
      },
      {
        labelKey: "operations.preparationOperationnelle.title",
        href: `${sectionPaths.operations}/preparation-operationnelle`,
        links: [
          { labelKey: "operations.preparationOperationnelle.entrainement", href: `${sectionPaths.operations}/preparation-operationnelle/entrainement` },
          { labelKey: "operations.preparationOperationnelle.exercices", href: `${sectionPaths.operations}/preparation-operationnelle/exercices` },
          { labelKey: "operations.preparationOperationnelle.disponibiliteOperationnelle", href: `${sectionPaths.operations}/preparation-operationnelle/disponibilite-operationnelle` },
          { labelKey: "operations.preparationOperationnelle.doctrineOperationnelle", href: `${sectionPaths.operations}/preparation-operationnelle/doctrine-operationnelle` },
        ],
      },
      {
        labelKey: "operations.retourDExperienceEtActualites.title",
        href: `${sectionPaths.operations}/retour-d-experience-et-actualites`,
        links: [
          { labelKey: "operations.retourDExperienceEtActualites.retoursDExperience", href: `${sectionPaths.operations}/retour-d-experience-et-actualites/retours-d-experience` },
          { labelKey: "operations.retourDExperienceEtActualites.enseignementsOperationnels", href: `${sectionPaths.operations}/retour-d-experience-et-actualites/enseignements-operationnels` },
          { labelKey: "operations.retourDExperienceEtActualites.actualitesOperationnelles", href: `${sectionPaths.operations}/retour-d-experience-et-actualites/actualites-operationnelles` },
          { labelKey: "operations.retourDExperienceEtActualites.situationOperationnelle", href: `${sectionPaths.operations}/retour-d-experience-et-actualites/situation-operationnelle` },
        ],
      },
    ],
  },
  {
    type: "megaMenu",
    labelKey: "renseignementCyberdefense",
    href: sectionPaths.renseignementCyberdefense,
    leader: {
      titleKey: "renseignementCyberdefense.title",
      paragraphKey: "renseignementCyberdefense.text",
      link: {
        labelKey: "renseignementCyberdefense.allLink",
        href: sectionPaths.renseignementCyberdefense,
      },
    },
    primaryItems: [
      {
        labelKey: "renseignementCyberdefense.renseignementMilitaire.title",
        href: `${sectionPaths.renseignementCyberdefense}/renseignement-militaire`,
        links: [
          { labelKey: "renseignementCyberdefense.renseignementMilitaire.missions", href: `${sectionPaths.renseignementCyberdefense}/renseignement-militaire/missions` },
          { labelKey: "renseignementCyberdefense.renseignementMilitaire.organisation", href: `${sectionPaths.renseignementCyberdefense}/renseignement-militaire/organisation` },
          { labelKey: "renseignementCyberdefense.renseignementMilitaire.cadreJuridique", href: `${sectionPaths.renseignementCyberdefense}/renseignement-militaire/cadre-juridique` },
          { labelKey: "renseignementCyberdefense.renseignementMilitaire.cooperationInterministerielle", href: `${sectionPaths.renseignementCyberdefense}/renseignement-militaire/cooperation-interministerielle` },
        ],
      },
      {
        labelKey: "renseignementCyberdefense.cyberdefense.title",
        href: `${sectionPaths.renseignementCyberdefense}/cyberdefense`,
        links: [
          { labelKey: "renseignementCyberdefense.cyberdefense.protectionDesSystemes", href: `${sectionPaths.renseignementCyberdefense}/cyberdefense/protection-des-systemes` },
          { labelKey: "renseignementCyberdefense.cyberdefense.defenseDesReseaux", href: `${sectionPaths.renseignementCyberdefense}/cyberdefense/defense-des-reseaux` },
          { labelKey: "renseignementCyberdefense.cyberdefense.lutteInformatiqueDefensive", href: `${sectionPaths.renseignementCyberdefense}/cyberdefense/lutte-informatique-defensive` },
          { labelKey: "renseignementCyberdefense.cyberdefense.gestionDeCriseCyber", href: `${sectionPaths.renseignementCyberdefense}/cyberdefense/gestion-de-crise-cyber` },
        ],
      },
      {
        labelKey: "renseignementCyberdefense.securiteDesSystemesEtDeLInformation.title",
        href: `${sectionPaths.renseignementCyberdefense}/securite-des-systemes-et-de-l-information`,
        links: [
          { labelKey: "renseignementCyberdefense.securiteDesSystemesEtDeLInformation.securiteDeLInformation", href: `${sectionPaths.renseignementCyberdefense}/securite-des-systemes-et-de-l-information/securite-de-l-information` },
          { labelKey: "renseignementCyberdefense.securiteDesSystemesEtDeLInformation.protectionDesDonnees", href: `${sectionPaths.renseignementCyberdefense}/securite-des-systemes-et-de-l-information/protection-des-donnees` },
          { labelKey: "renseignementCyberdefense.securiteDesSystemesEtDeLInformation.homologationEtCertification", href: `${sectionPaths.renseignementCyberdefense}/securite-des-systemes-et-de-l-information/homologation-et-certification` },
          { labelKey: "renseignementCyberdefense.securiteDesSystemesEtDeLInformation.cryptologie", href: `${sectionPaths.renseignementCyberdefense}/securite-des-systemes-et-de-l-information/cryptologie` },
        ],
      },
      {
        labelKey: "renseignementCyberdefense.menacesInformationnelles.title",
        href: `${sectionPaths.renseignementCyberdefense}/menaces-informationnelles`,
        links: [
          { labelKey: "renseignementCyberdefense.menacesInformationnelles.lutteContreLaDesinformation", href: `${sectionPaths.renseignementCyberdefense}/menaces-informationnelles/lutte-contre-la-desinformation` },
          { labelKey: "renseignementCyberdefense.menacesInformationnelles.ingerencesEtrangeres", href: `${sectionPaths.renseignementCyberdefense}/menaces-informationnelles/ingerences-etrangeres` },
          { labelKey: "renseignementCyberdefense.menacesInformationnelles.manipulationDeLInformation", href: `${sectionPaths.renseignementCyberdefense}/menaces-informationnelles/manipulation-de-l-information` },
          { labelKey: "renseignementCyberdefense.menacesInformationnelles.sensibilisationEtPrevention", href: `${sectionPaths.renseignementCyberdefense}/menaces-informationnelles/sensibilisation-et-prevention` },
        ],
      },
    ],
  },
  {
    type: "megaMenu",
    labelKey: "personnelService",
    href: sectionPaths.personnelService,
    leader: {
      titleKey: "personnelService.title",
      paragraphKey: "personnelService.text",
      link: { labelKey: "personnelService.allLink", href: sectionPaths.personnelService },
    },
    primaryItems: [
      {
        labelKey: "personnelService.recrutement.title",
        href: `${sectionPaths.personnelService}/recrutement`,
        links: [
          { labelKey: "personnelService.recrutement.recrutementMilitaire", href: `${sectionPaths.personnelService}/recrutement/recrutement-militaire` },
          { labelKey: "personnelService.recrutement.recrutementCivil", href: `${sectionPaths.personnelService}/recrutement/recrutement-civil` },
          { labelKey: "personnelService.recrutement.concours", href: `${sectionPaths.personnelService}/recrutement/concours` },
          { labelKey: "personnelService.recrutement.commentPostuler", href: `${sectionPaths.personnelService}/recrutement/comment-postuler` },
        ],
      },
      {
        labelKey: "personnelService.carrieresEtParcours.title",
        href: `${sectionPaths.personnelService}/carrieres-et-parcours`,
        links: [
          { labelKey: "personnelService.carrieresEtParcours.statutDesMilitaires", href: `${sectionPaths.personnelService}/carrieres-et-parcours/statut-des-militaires` },
          { labelKey: "personnelService.carrieresEtParcours.parcoursProfessionnels", href: `${sectionPaths.personnelService}/carrieres-et-parcours/parcours-professionnels` },
          { labelKey: "personnelService.carrieresEtParcours.mobiliteEtAffectations", href: `${sectionPaths.personnelService}/carrieres-et-parcours/mobilite-et-affectations` },
          { labelKey: "personnelService.carrieresEtParcours.soldesEtPensions", href: `${sectionPaths.personnelService}/carrieres-et-parcours/soldes-et-pensions` },
        ],
      },
      {
        labelKey: "personnelService.formation.title",
        href: `${sectionPaths.personnelService}/formation`,
        links: [
          { labelKey: "personnelService.formation.formationInitiale", href: `${sectionPaths.personnelService}/formation/formation-initiale` },
          { labelKey: "personnelService.formation.formationContinue", href: `${sectionPaths.personnelService}/formation/formation-continue` },
          { labelKey: "personnelService.formation.ecolesEtCentres", href: `${sectionPaths.personnelService}/formation/ecoles-et-centres` },
          { labelKey: "personnelService.formation.certificationEtQualifications", href: `${sectionPaths.personnelService}/formation/certification-et-qualifications` },
        ],
      },
      {
        labelKey: "personnelService.reserveEtAnciensMilitaires.title",
        href: `${sectionPaths.personnelService}/reserve-et-anciens-militaires`,
        links: [
          { labelKey: "personnelService.reserveEtAnciensMilitaires.reserveOperationnelle", href: `${sectionPaths.personnelService}/reserve-et-anciens-militaires/reserve-operationnelle` },
          { labelKey: "personnelService.reserveEtAnciensMilitaires.reserveCitoyenne", href: `${sectionPaths.personnelService}/reserve-et-anciens-militaires/reserve-citoyenne` },
          { labelKey: "personnelService.reserveEtAnciensMilitaires.anciensMilitaires", href: `${sectionPaths.personnelService}/reserve-et-anciens-militaires/anciens-militaires` },
          { labelKey: "personnelService.reserveEtAnciensMilitaires.accompagnementSocial", href: `${sectionPaths.personnelService}/reserve-et-anciens-militaires/accompagnement-social` },
        ],
      },
    ],
  },
  {
    type: "megaMenu",
    labelKey: "capacitesIndustrie",
    href: sectionPaths.capacitesIndustrie,
    leader: {
      titleKey: "capacitesIndustrie.title",
      paragraphKey: "capacitesIndustrie.text",
      link: {
        labelKey: "capacitesIndustrie.allLink",
        href: sectionPaths.capacitesIndustrie,
      },
    },
    primaryItems: [
      {
        labelKey: "capacitesIndustrie.equipementsEtArmement.title",
        href: `${sectionPaths.capacitesIndustrie}/equipements-et-armement`,
        links: [
          { labelKey: "capacitesIndustrie.equipementsEtArmement.equipementsDesForces", href: `${sectionPaths.capacitesIndustrie}/equipements-et-armement/equipements-des-forces` },
          { labelKey: "capacitesIndustrie.equipementsEtArmement.armement", href: `${sectionPaths.capacitesIndustrie}/equipements-et-armement/armement` },
          { labelKey: "capacitesIndustrie.equipementsEtArmement.maintienEnCondition", href: `${sectionPaths.capacitesIndustrie}/equipements-et-armement/maintien-en-condition` },
          { labelKey: "capacitesIndustrie.equipementsEtArmement.modernisation", href: `${sectionPaths.capacitesIndustrie}/equipements-et-armement/modernisation` },
        ],
      },
      {
        labelKey: "capacitesIndustrie.programmesEtAcquisitions.title",
        href: `${sectionPaths.capacitesIndustrie}/programmes-et-acquisitions`,
        links: [
          { labelKey: "capacitesIndustrie.programmesEtAcquisitions.programmesDarmement", href: `${sectionPaths.capacitesIndustrie}/programmes-et-acquisitions/programmes-d-armement` },
          { labelKey: "capacitesIndustrie.programmesEtAcquisitions.equipementsFuturs", href: `${sectionPaths.capacitesIndustrie}/programmes-et-acquisitions/equipements-futurs` },
          { labelKey: "capacitesIndustrie.programmesEtAcquisitions.commandesEtLivraisons", href: `${sectionPaths.capacitesIndustrie}/programmes-et-acquisitions/commandes-et-livraisons` },
          { labelKey: "capacitesIndustrie.programmesEtAcquisitions.cooperationDarmement", href: `${sectionPaths.capacitesIndustrie}/programmes-et-acquisitions/cooperation-d-armement` },
        ],
      },
      {
        labelKey: "capacitesIndustrie.industrieDeDefense.title",
        href: `${sectionPaths.capacitesIndustrie}/industrie-de-defense`,
        links: [
          { labelKey: "capacitesIndustrie.industrieDeDefense.filiereIndustrielle", href: `${sectionPaths.capacitesIndustrie}/industrie-de-defense/filiere-industrielle` },
          { labelKey: "capacitesIndustrie.industrieDeDefense.entreprisesEtPme", href: `${sectionPaths.capacitesIndustrie}/industrie-de-defense/entreprises-et-pme` },
          { labelKey: "capacitesIndustrie.industrieDeDefense.exportationsDeDefense", href: `${sectionPaths.capacitesIndustrie}/industrie-de-defense/exportations-de-defense` },
          { labelKey: "capacitesIndustrie.industrieDeDefense.souveraineteIndustrielle", href: `${sectionPaths.capacitesIndustrie}/industrie-de-defense/souverainete-industrielle` },
        ],
      },
      {
        labelKey: "capacitesIndustrie.rechercheEtInnovation.title",
        href: `${sectionPaths.capacitesIndustrie}/recherche-et-innovation`,
        links: [
          { labelKey: "capacitesIndustrie.rechercheEtInnovation.rechercheDeDefense", href: `${sectionPaths.capacitesIndustrie}/recherche-et-innovation/recherche-de-defense` },
          { labelKey: "capacitesIndustrie.rechercheEtInnovation.innovation", href: `${sectionPaths.capacitesIndustrie}/recherche-et-innovation/innovation` },
          { labelKey: "capacitesIndustrie.rechercheEtInnovation.technologiesEmergentes", href: `${sectionPaths.capacitesIndustrie}/recherche-et-innovation/technologies-emergentes` },
          { labelKey: "capacitesIndustrie.rechercheEtInnovation.agencesEtOperateurs", href: `${sectionPaths.capacitesIndustrie}/recherche-et-innovation/agences-et-operateurs` },
        ],
      },
    ],
  },
  {
    type: "megaMenu",
    labelKey: "leMinistere",
    href: sectionPaths.leMinistere,
    leader: {
      titleKey: "leMinistere.title",
      paragraphKey: "leMinistere.text",
      link: { labelKey: "leMinistere.allLink", href: sectionPaths.leMinistere },
    },
    primaryItems: [
      {
        labelKey: "leMinistere.institution.title",
        href: `${sectionPaths.leMinistere}/institution`,
        links: [
          { labelKey: "leMinistere.institution.leMinistre", href: `${sectionPaths.leMinistere}/institution/le-ministre` },
          { labelKey: "leMinistere.institution.missions", href: `${sectionPaths.leMinistere}/institution/missions` },
          { labelKey: "leMinistere.institution.organisation", href: `${sectionPaths.leMinistere}/institution/organisation` },
          { labelKey: "leMinistere.institution.organigramme", href: `${sectionPaths.leMinistere}/institution/organigramme` },
        ],
      },
      {
        labelKey: "leMinistere.administration.title",
        href: `${sectionPaths.leMinistere}/administration`,
        links: [
          { labelKey: "leMinistere.administration.servicesDuMinistere", href: `${sectionPaths.leMinistere}/administration/services-du-ministere` },
          { labelKey: "leMinistere.administration.administrationCentrale", href: `${sectionPaths.leMinistere}/administration/administration-centrale` },
          { labelKey: "leMinistere.administration.servicesDeconcentres", href: `${sectionPaths.leMinistere}/administration/services-deconcentres` },
          { labelKey: "leMinistere.administration.etablissementsPublics", href: `${sectionPaths.leMinistere}/administration/etablissements-publics` },
        ],
      },
      {
        labelKey: "leMinistere.budgetEtTransparence.title",
        href: `${sectionPaths.leMinistere}/budget-et-transparence`,
        links: [
          { labelKey: "leMinistere.budgetEtTransparence.budgetDeLaDefense", href: `${sectionPaths.leMinistere}/budget-et-transparence/budget-de-la-defense` },
          { labelKey: "leMinistere.budgetEtTransparence.rapportsDActivite", href: `${sectionPaths.leMinistere}/budget-et-transparence/rapports-d-activite` },
          { labelKey: "leMinistere.budgetEtTransparence.donneesPubliques", href: `${sectionPaths.leMinistere}/budget-et-transparence/donnees-publiques` },
          { labelKey: "leMinistere.budgetEtTransparence.marchesPublics", href: `${sectionPaths.leMinistere}/budget-et-transparence/marches-publics` },
        ],
      },
      {
        labelKey: "leMinistere.actualitesEtContact.title",
        href: `${sectionPaths.leMinistere}/actualites-et-contact`,
        links: [
          { labelKey: "leMinistere.actualitesEtContact.actualites", href: `${sectionPaths.leMinistere}/actualites-et-contact/actualites` },
          { labelKey: "leMinistere.actualitesEtContact.communiques", href: `${sectionPaths.leMinistere}/actualites-et-contact/communiques` },
          { labelKey: "leMinistere.actualitesEtContact.publications", href: `${sectionPaths.leMinistere}/actualites-et-contact/publications` },
          { labelKey: "leMinistere.actualitesEtContact.contact", href: `${sectionPaths.leMinistere}/actualites-et-contact/contact` },
        ],
      },
    ],
  },
];

assertNavigationStructureValid();

/**
 * Secondary navigation zone of the site footer, distinct from the main
 * navigation of the header. It mirrors the seven entries of the header
 * navigation and derives its links from the sections of each theme — so the
 * footer and the header can never drift apart.
 *
 * Column titles resolve under `footer.columns`, links under `nav.panel`.
 */
export const footerNavigation: ReadonlyArray<FooterColumn> = primaryNavigation.map(
  (section) => ({
    columnKey: section.labelKey,
    links: section.primaryItems,
  })
);