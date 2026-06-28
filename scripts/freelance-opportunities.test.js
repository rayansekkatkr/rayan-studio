const assert = require('node:assert/strict');
const test = require('node:test');

const {
  buildProposalDraft,
  buildReport,
  buildDefaultSearchSources,
  extractOpportunitiesFromHtml,
  getRemoteStatus,
  loadSearchSources,
  scoreOpportunity,
} = require('./freelance-opportunities');

test('buildDefaultSearchSources creates platform searches without user URLs', () => {
  const sources = buildDefaultSearchSources({
    platforms: ['freelancer'],
    queries: ['website redesign', 'website maintenance'],
  });

  assert.equal(sources.length, 2);
  assert.deepEqual(sources.map((source) => source.name), [
    'Freelancer - website redesign',
    'Freelancer - website maintenance',
  ]);
  assert.ok(sources.every((source) => source.url.includes('freelancer.com')));
});

test('loadSearchSources falls back to default platform searches', () => {
  const sources = loadSearchSources({
    envUrls: '',
    sourceFile: '',
    useDefaultSources: true,
    defaultPlatforms: ['freelancer', 'peopleperhour'],
    defaultQueries: ['website redesign'],
  });

  assert.deepEqual(sources.map((source) => source.name), [
    'Freelancer - website redesign',
    'PeoplePerHour - website redesign',
  ]);
});

test('default searches include CV-aligned full-stack and DevOps work', () => {
  const sources = buildDefaultSearchSources({
    platforms: ['codeur'],
    maxSources: 8,
  });
  const queries = sources.map((source) => source.searchQuery);

  assert.ok(queries.includes('remote full stack web developer'));
  assert.ok(queries.includes('remote devops deployment'));
  assert.ok(queries.includes('remote api integration'));
  assert.ok(queries.includes('remote docker kubernetes deployment'));
});

test('default searches include reliable remote platform and skip blocked defaults', () => {
  const sources = buildDefaultSearchSources({
    queries: ['remote full stack web developer'],
    maxSources: 10,
  });

  assert.ok(sources.some((source) => source.platform === 'remoteok' && source.remoteGuaranteed));
  assert.equal(sources.some((source) => source.platform === 'upwork'), false);
  assert.equal(sources.some((source) => source.platform === 'weworkremotely'), false);
});

test('We Work Remotely remains available as an optional remote source', () => {
  const sources = buildDefaultSearchSources({
    platforms: ['weworkremotely'],
    queries: ['remote devops deployment'],
    maxSources: 1,
  });

  assert.equal(sources.length, 1);
  assert.equal(sources[0].platform, 'weworkremotely');
  assert.equal(sources[0].remoteGuaranteed, true);
});

test('getRemoteStatus only accepts explicit remote or guaranteed remote platforms', () => {
  const explicitRemote = getRemoteStatus({
    title: 'Full-stack developer for SaaS platform',
    description: 'This is a fully remote contract for a Next.js and Node.js developer.',
  });
  const remotePlatform = getRemoteStatus({
    title: 'DevOps deployment for web app',
    description: 'Docker, CI/CD and monitoring setup.',
    remoteGuaranteed: true,
  });
  const hybrid = getRemoteStatus({
    title: 'Developpeur full-stack',
    description: 'Mission hybride avec deux jours sur site a Paris.',
    searchQuery: 'remote full stack web developer',
  });
  const unknown = getRemoteStatus({
    title: 'API integration Stripe',
    description: 'Mission freelance pour un back-office SaaS.',
  });

  assert.equal(explicitRemote.remoteOnly, true);
  assert.equal(explicitRemote.remoteStatus, 'remote');
  assert.equal(remotePlatform.remoteOnly, true);
  assert.equal(remotePlatform.remoteStatus, 'remote_platform');
  assert.equal(hybrid.remoteOnly, false);
  assert.equal(hybrid.remoteStatus, 'onsite_or_hybrid');
  assert.equal(unknown.remoteOnly, false);
  assert.equal(unknown.remoteStatus, 'unknown');
});

test('getRemoteStatus accepts PeoplePerHour remote job listing pages as remote context', () => {
  const remoteListing = getRemoteStatus({
    title: 'Need a MERN stack developer',
    description: '',
    url: 'https://www.peopleperhour.com/freelance-jobs/technology-programming/website-development/need-a-mern-stack-developer-4501271',
    platform: 'peopleperhour',
    sourceUrl: 'https://www.peopleperhour.com/freelance-remote-full-stack-web-developer-jobs',
  });

  assert.equal(remoteListing.remoteOnly, true);
  assert.equal(remoteListing.remoteStatus, 'remote_listing');
});

test('loadSearchSources reads newline and comma separated source URLs', () => {
  const sources = loadSearchSources({
    envUrls: 'https://example.com/malt\nhttps://example.com/codeur, https://example.com/comeup',
  });

  assert.deepEqual(sources, [
    { name: 'Source 1', url: 'https://example.com/malt' },
    { name: 'Source 2', url: 'https://example.com/codeur' },
    { name: 'Source 3', url: 'https://example.com/comeup' },
  ]);
});

test('extractOpportunitiesFromHtml extracts JSON-LD and matching links', () => {
  const html = `
    <html>
      <head>
        <title>Missions web</title>
        <script type="application/ld+json">
          {
            "@type": "JobPosting",
            "title": "Refonte site vitrine restaurant",
            "description": "Nous cherchons un freelance pour refaire le site et clarifier le parcours mobile.",
            "url": "/missions/refonte-restaurant"
          }
        </script>
      </head>
      <body>
        <a href="/projects/landing-page-seo">Creation landing page avec SEO local</a>
        <a href="/projects/logo">Logo simple pour association</a>
      </body>
    </html>
  `;

  const opportunities = extractOpportunitiesFromHtml(html, {
    name: 'Codeur',
    url: 'https://platform.example/search',
  });

  assert.equal(opportunities.length, 2);
  assert.equal(opportunities[0].title, 'Refonte site vitrine restaurant');
  assert.equal(opportunities[0].url, 'https://platform.example/missions/refonte-restaurant');
  assert.equal(opportunities[1].title, 'Creation landing page avec SEO local');
  assert.equal(opportunities[1].url, 'https://platform.example/projects/landing-page-seo');
});

test('extractOpportunitiesFromHtml keeps DevOps and API platform opportunities', () => {
  const html = `
    <html>
      <body>
        <a href="/projects/deploiement-vps-docker">Déploiement application Next.js avec Docker, VPS, SSL et GitHub Actions</a>
        <a href="/projects/integration-api-stripe">API integration Stripe pour back-office SaaS</a>
      </body>
    </html>
  `;

  const opportunities = extractOpportunitiesFromHtml(html, {
    name: 'Codeur',
    url: 'https://platform.example/search',
  });

  assert.deepEqual(opportunities.map((opportunity) => opportunity.url), [
    'https://platform.example/projects/deploiement-vps-docker',
    'https://platform.example/projects/integration-api-stripe',
  ]);
});

test('extractOpportunitiesFromHtml ignores generic platform category links', () => {
  const html = `
    <html>
      <body>
        <a href="https://www.codeur.com/developpeur/prestashop">Création de site e-commerce</a>
        <a href="https://www.freelancer.com/jobs/ecommerce/">eCommerce</a>
        <a href="https://www.freelancer.com/projects/website-development/pet-food-commerce-website-development">Pet Food E-commerce Website Development</a>
      </body>
    </html>
  `;

  const opportunities = extractOpportunitiesFromHtml(html, {
    name: 'Freelancer',
    url: 'https://www.freelancer.com/jobs/website-development',
  });

  assert.deepEqual(opportunities.map((opportunity) => opportunity.url), [
    'https://www.freelancer.com/projects/website-development/pet-food-commerce-website-development',
  ]);
});

test('extractOpportunitiesFromHtml ignores PeoplePerHour navigation and profile links', () => {
  const html = `
    <html>
      <head>
        <meta name="description" content="Find Freelance Remote Full Stack Web Developer Jobs, Work & Projects." />
      </head>
      <body>
        <a href="/freelance-jobs/technology-programming/website-development/need-a-mern-stack-developer-4501271">Need a MERN stack developer</a>
        <a href="/job/new?ref=header">Post Project</a>
        <a href="/services">Search offers to buy now</a>
        <a href="/hire-freelancers">Search freelancers to request a proposal</a>
        <a href="/freelance-jobs">Search projects to quote on</a>
        <a href="/how-it-works">How it works</a>
        <a href="/site/register#freelancer">Freelancer?</a>
        <a href="/categories/artificial-intelligence">AI Services</a>
        <a href="/categories/technology-programming">Technology & Programming</a>
        <a href="/freelancer/marketing-seo/sabah-raheem-senior-project-manager-business-vqaqnx">by Sabah R.</a>
      </body>
    </html>
  `;

  const opportunities = extractOpportunitiesFromHtml(html, {
    name: 'PeoplePerHour',
    platform: 'peopleperhour',
    url: 'https://www.peopleperhour.com/freelance-remote-full-stack-web-developer-jobs',
  });

  assert.deepEqual(opportunities.map((opportunity) => opportunity.url), [
    'https://www.peopleperhour.com/freelance-jobs/technology-programming/website-development/need-a-mern-stack-developer-4501271',
  ]);
  assert.equal(opportunities[0].description, '');
});

test('extractOpportunitiesFromHtml does not let search metadata qualify unrelated jobs', () => {
  const html = `
    <html>
      <head>
        <meta name="description" content="Find Freelance Remote Full Stack Web Developer Jobs, Work & Projects." />
      </head>
      <body>
        <a href="/freelance-jobs/business/administration-assistance/remote-assistant-is-needed-4504451">Remote Assistant is needed</a>
        <a href="/freelance-jobs/technology-programming/programming-coding/deployment-of-ready-code-4502662">Deployment of Ready Code</a>
      </body>
    </html>
  `;

  const opportunities = extractOpportunitiesFromHtml(html, {
    name: 'PeoplePerHour',
    platform: 'peopleperhour',
    url: 'https://www.peopleperhour.com/freelance-remote-devops-deployment-jobs',
  });

  assert.deepEqual(opportunities.map((opportunity) => opportunity.title), [
    'Deployment of Ready Code',
  ]);
});

test('extractOpportunitiesFromHtml ignores external links from platform search pages', () => {
  const html = `
    <html>
      <head>
        <meta name="description" content="Remote full stack web developer projects and freelance jobs." />
      </head>
      <body>
        <a href="https://www.photoanywhere.com/">Photo Anywhere</a>
        <a href="https://www.freelancer.com/projects/website-development/custom-web-app-development">Custom Web App Development</a>
      </body>
    </html>
  `;

  const opportunities = extractOpportunitiesFromHtml(html, {
    name: 'Freelancer',
    platform: 'freelancer',
    url: 'https://www.freelancer.com/jobs/website-development',
  });

  assert.deepEqual(opportunities.map((opportunity) => opportunity.url), [
    'https://www.freelancer.com/projects/website-development/custom-web-app-development',
  ]);
});

test('scoreOpportunity favors web redesign and filters weak non-web fits', () => {
  const strong = scoreOpportunity({
    title: 'Refonte site internet pour hotel',
    description: 'Besoin de refaire le site, ameliorer le SEO local et publier rapidement.',
  });
  const weak = scoreOpportunity({
    title: 'Creation logo Instagram',
    description: 'Recherche community manager pour des posts social media.',
  });

  assert.ok(strong.score >= 70);
  assert.ok(strong.reasons.includes('besoin site/refonte'));
  assert.ok(strong.reasons.includes('SEO ou visibilite locale'));
  assert.ok(weak.score < 30);
});

test('scoreOpportunity favors full-stack platform and DevOps missions from the CV', () => {
  const platform = scoreOpportunity({
    title: 'Full-stack developer for SaaS admin platform',
    description: 'Need React, Next.js, Node.js, PostgreSQL, Stripe API integration and back-office workflows.',
  });
  const devops = scoreOpportunity({
    title: 'DevOps deployment for web app',
    description: 'Docker, Kubernetes, GitHub Actions CI/CD, SSL, DNS, VPS and monitoring setup.',
  });

  assert.ok(platform.score >= 80);
  assert.ok(devops.score >= 80);
  assert.ok(platform.reasons.includes('profil full-stack/platform'));
  assert.ok(devops.reasons.includes('DevOps, CI/CD ou deploiement'));
});

test('buildProposalDraft creates a manual platform reply with portfolio link', () => {
  const draft = buildProposalDraft({
    title: 'Refonte site vitrine restaurant',
    description: 'Site existant a moderniser avant ouverture.',
    url: 'https://platform.example/missions/refonte-restaurant',
  }, {
    portfolioUrl: 'https://www.rayanstudios.com/fr',
  });

  assert.match(draft, /Bonjour/);
  assert.match(draft, /Refonte site vitrine restaurant/);
  assert.match(draft, /https:\/\/www\.rayanstudios\.com\/fr/);
  assert.match(draft, /URL actuelle|references/i);
  assert.doesNotMatch(draft, /garantis|expert numero 1|solution sur-mesure|présence digitale/i);
});

test('buildProposalDraft writes English proposals for English platform missions', () => {
  const draft = buildProposalDraft({
    title: 'Need a MERN stack developer',
    description: 'Remote project for a MERN stack developer to improve a web platform.',
    url: 'https://www.peopleperhour.com/freelance-jobs/technology-programming/website-development/need-a-mern-stack-developer-4501271',
    platform: 'peopleperhour',
  }, {
    portfolioUrl: 'https://www.rayanstudios.com/fr',
  });

  assert.match(draft, /Hi,/);
  assert.match(draft, /MERN stack developer/);
  assert.match(draft, /full-stack|React|Node/i);
  assert.match(draft, /https:\/\/www\.rayanstudios\.com\/fr/);
  assert.doesNotMatch(draft, /Bonjour|Je peux vous aider|Bonne journee/i);
});

test('buildProposalDraft keeps noisy scraped titles readable', () => {
  const draft = buildProposalDraft({
    title: 'Refonte landing page WordPress Il y a 2 jours Ouvert Moins de 500 € 29 Offres Je recherche un développeur WordPress expérimenté avec une vraie maîtrise des landing pages orientées conversion pour Google Ads',
    url: 'https://platform.example/missions/refonte-wordpress',
  });

  assert.match(draft, /Refonte landing page WordPress/);
  assert.doesNotMatch(draft, /Il y a|jours|Ouvert|29 Offres|Je recherche un développeur/);
  assert.ok(draft.split('\n')[2].length < 130);
});

test('buildReport marks auto discovery when default sources are used', () => {
  const sources = buildDefaultSearchSources({
    platforms: ['freelancer'],
    queries: ['deployment wordpress'],
  });
  const report = buildReport({
    sources,
    opportunities: [],
    errors: [],
    maxOpportunities: 30,
    sourceMode: 'default_platforms',
  });

  assert.equal(report.status, 'no_candidates');
  assert.equal(report.sourceMode, 'default_platforms');
  assert.ok(report.platformPlaybook.length >= 3);
  assert.match(report.nextStep, /automatic platform catalog/i);
});

test('buildReport keeps only remote opportunities by default', () => {
  const report = buildReport({
    sources: [{ name: 'Source remote', url: 'https://platform.example/search' }],
    opportunities: [
      {
        source: 'Source remote',
        title: 'Remote full-stack developer for SaaS admin platform',
        description: 'Fully remote mission with Next.js, Node.js and Stripe API integration.',
        url: 'https://platform.example/projects/remote-full-stack',
      },
      {
        source: 'Source onsite',
        title: 'Full-stack developer for SaaS admin platform',
        description: 'Mission hybride a Paris avec Next.js, Node.js and Stripe API integration.',
        url: 'https://platform.example/projects/hybrid-full-stack',
      },
      {
        source: 'Source unknown',
        title: 'DevOps deployment for web app',
        description: 'Docker, Kubernetes, GitHub Actions CI/CD, SSL and VPS setup.',
        url: 'https://platform.example/projects/devops-deployment',
      },
    ],
    errors: [],
    maxOpportunities: 30,
    sourceMode: 'configured_sources',
  });

  assert.equal(report.candidateCount, 1);
  assert.equal(report.remotePolicy, 'explicit_remote_only');
  assert.equal(report.remoteRejectedCount, 2);
  assert.equal(report.candidates[0].url, 'https://platform.example/projects/remote-full-stack');
  assert.equal(report.candidates[0].remoteOnly, true);
});
