const fs = require('fs');
const path = require('path');

const DEFAULT_OUTPUT_DIR = path.join(__dirname, 'workflow-session-reports');

function readJsonFile(filePath) {
  if (!filePath || !fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function shortSha(value) {
  return String(value || '').slice(0, 8) || null;
}

function buildRunUrl(env) {
  if (env.GITHUB_RUN_URL) return env.GITHUB_RUN_URL;
  if (env.GITHUB_REPOSITORY && env.GITHUB_RUN_ID) {
    return `https://github.com/${env.GITHUB_REPOSITORY}/actions/runs/${env.GITHUB_RUN_ID}`;
  }
  return null;
}

function summarizePrimaryReport(primaryReport) {
  if (!primaryReport) {
    return {
      status: 'missing_primary_report',
      candidateCount: 0,
      sentCount: 0,
      errorCount: 0,
      errors: [],
    };
  }

  return {
    status: primaryReport.status || (primaryReport.dryRun ? 'dry-run' : 'completed'),
    dryRun: primaryReport.dryRun ?? null,
    sourceMode: primaryReport.sourceMode || primaryReport.queryMode || null,
    sourceCount: primaryReport.sourceCount ?? primaryReport.searchTargets?.length ?? null,
    scannedOpportunities: primaryReport.scannedOpportunities ?? primaryReport.scanned ?? null,
    scoredCandidateCount: primaryReport.scoredCandidateCount ?? null,
    remotePolicy: primaryReport.remotePolicy || null,
    remoteRejectedCount: primaryReport.remoteRejectedCount ?? null,
    candidateCount: primaryReport.candidateCount ?? primaryReport.candidates?.length ?? 0,
    sentCount: primaryReport.sent?.length ?? 0,
    errorCount: primaryReport.errors?.length ?? 0,
    errors: (primaryReport.errors || []).slice(0, 10).map((error) => ({
      source: error.source || error.name || error.email || error.placeId || null,
      error: error.error || error.reason || error.message || String(error),
    })),
  };
}

function formatValue(value) {
  if (value === null || value === undefined || value === '') return 'n/a';
  return String(value);
}

function renderMarkdown(report) {
  const lines = [
    `# ${report.workflow.name} - session report`,
    '',
    `Generated at: ${report.generatedAt}`,
    `Status: ${report.workflow.status}`,
    `Event: ${formatValue(report.github.eventName)}`,
    `Branch: ${formatValue(report.github.refName)}`,
    `Commit: ${formatValue(report.github.sha)}`,
    `Actor: ${formatValue(report.github.actor)}`,
    `Run: ${formatValue(report.github.runUrl || report.github.runId)}`,
    '',
    '## Summary',
    '',
    `- Report status: ${formatValue(report.summary.status)}`,
    `- Source mode: ${formatValue(report.summary.sourceMode)}`,
    `- Sources/searches: ${formatValue(report.summary.sourceCount)}`,
    `- Scanned: ${formatValue(report.summary.scannedOpportunities)}`,
    `- Scored candidates: ${formatValue(report.summary.scoredCandidateCount)}`,
    `- Remote policy: ${formatValue(report.summary.remotePolicy)}`,
    `- Remote rejected: ${formatValue(report.summary.remoteRejectedCount)}`,
    `- Candidates: ${formatValue(report.summary.candidateCount)}`,
    `- Sent/prepared: ${formatValue(report.summary.sentCount)}`,
    `- Errors: ${formatValue(report.summary.errorCount)}`,
  ];

  const errors = Array.isArray(report.summary.errors) ? report.summary.errors : [];

  if (errors.length > 0) {
    lines.push('', '## Errors', '');
    for (const error of errors) {
      lines.push(`- ${formatValue(error.source)}: ${formatValue(error.error)}`);
    }
  }

  lines.push('');
  return `${lines.join('\n')}\n`;
}

function buildWorkflowSessionReport({
  env = process.env,
  primaryReport = null,
  generatedAt = new Date().toISOString(),
} = {}) {
  const workflowName = env.WORKFLOW_SESSION_NAME || env.GITHUB_WORKFLOW || 'Workflow';
  const workflowSlug = env.WORKFLOW_SESSION_SLUG || workflowName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const summary = summarizePrimaryReport(primaryReport);

  const json = {
    generatedAt,
    workflow: {
      name: workflowName,
      slug: workflowSlug,
      status: env.WORKFLOW_SESSION_STATUS || 'unknown',
      primaryReport: env.WORKFLOW_SESSION_PRIMARY_REPORT || null,
    },
    github: {
      runId: env.GITHUB_RUN_ID || null,
      runNumber: env.GITHUB_RUN_NUMBER || null,
      runAttempt: env.GITHUB_RUN_ATTEMPT || null,
      runUrl: buildRunUrl(env),
      repository: env.GITHUB_REPOSITORY || null,
      actor: env.GITHUB_ACTOR || null,
      eventName: env.GITHUB_EVENT_NAME || null,
      refName: env.GITHUB_REF_NAME || null,
      sha: shortSha(env.GITHUB_SHA),
    },
    summary,
  };

  return {
    json,
    markdown: renderMarkdown(json),
  };
}

function writeWorkflowSessionReport({
  env = process.env,
  outputDir = DEFAULT_OUTPUT_DIR,
} = {}) {
  const primaryReportPath = env.WORKFLOW_SESSION_PRIMARY_REPORT
    ? path.resolve(process.cwd(), env.WORKFLOW_SESSION_PRIMARY_REPORT)
    : null;
  const primaryReport = readJsonFile(primaryReportPath);
  const report = buildWorkflowSessionReport({
    env: {
      ...env,
      WORKFLOW_SESSION_PRIMARY_REPORT: primaryReportPath,
    },
    primaryReport,
  });
  const slug = report.json.workflow.slug;

  fs.mkdirSync(outputDir, { recursive: true });

  const markdownPath = path.join(outputDir, `${slug}-latest.md`);
  const jsonPath = path.join(outputDir, `${slug}-latest.json`);

  fs.writeFileSync(markdownPath, report.markdown);
  fs.writeFileSync(jsonPath, JSON.stringify(report.json, null, 2));

  return { markdownPath, jsonPath, report };
}

if (require.main === module) {
  const result = writeWorkflowSessionReport();
  console.log(`Session report written to ${result.markdownPath}`);
  console.log(`Session report JSON written to ${result.jsonPath}`);
}

module.exports = {
  buildWorkflowSessionReport,
  writeWorkflowSessionReport,
};
