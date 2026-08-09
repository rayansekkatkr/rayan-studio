'use strict';

/**
 * Cibles de découverte V1 (France uniquement : seule source officielle
 * branchée). La rotation hebdomadaire répartit les couples NAF/département
 * pour ne pas retaper les mêmes recherches chaque semaine.
 */

const DISCOVERY_TARGETS = [
  { naf: '56.10A', label: 'restaurant' },      // restauration traditionnelle
  { naf: '56.30Z', label: 'bar-cafe' },        // débits de boissons
  { naf: '55.10Z', label: 'hotel' },           // hôtels
  { naf: '10.71C', label: 'boulangerie' },     // boulangerie-pâtisserie
  { naf: '10.71D', label: 'patisserie' },      // pâtisserie
  { naf: '96.02A', label: 'coiffure' },        // coiffure
  { naf: '43.32A', label: 'menuiserie' },      // artisans menuisiers
  { naf: '47.76Z', label: 'fleuriste' },       // fleuristes
];

const DEPARTMENTS = ['69', '75', '13', '33', '31', '44', '59', '67', '06', '34', '35', '38', '42', '54', '76'];

const LIMITS = {
  maxDiscoveredPerRun: 200,
  maxDeepAudits: 50,
  maxPagesPerDomain: 3,
  networkConcurrency: 4,
};

/** Sélection déterministe des cibles selon le numéro de semaine ISO. */
function targetsForWeek(isoWeek, count = 4) {
  const targets = [];
  for (let i = 0; i < count; i += 1) {
    const naf = DISCOVERY_TARGETS[(isoWeek + i) % DISCOVERY_TARGETS.length];
    const department = DEPARTMENTS[(isoWeek * 3 + i) % DEPARTMENTS.length];
    targets.push({ ...naf, department });
  }
  return targets;
}

module.exports = { DISCOVERY_TARGETS, DEPARTMENTS, LIMITS, targetsForWeek };
