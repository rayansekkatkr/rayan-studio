const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const {
  buildWorkflowSessionReport,
  writeWorkflowSessionReport,
} = require('./workflow-session-report');

test('buildWorkflowSessionReport summarizes a freelance opportunities run', () => {
  const report = buildWorkflowSessionReport({
    env: {
      WORKFLOW_SESSION_NAME: 'Freelance Opportunities',
      WORKFLOW_SESSION_SLUG: 'freelance-opportunities',
      WORKFLOW_SESSION_STATUS: 'success',
      GITHUB_RUN_ID: '123',
      GITHUB_RUN_NUMBER: '45',
      GITHUB_REPOSITORY: 'rayan/rayan-studio',
      GITHUB_ACTOR: 'github-actions[bot]',
      GITHUB_EVENT_NAME: 'schedule',
      GITHUB_REF_NAME: 'main',
      GITHUB_SHA: 'abcdef1234567890',
    },
    primaryReport: {
      status: 'ready',
      sourceMode: 'default_platforms',
      sourceCount: 10,
      scannedOpportunities: 566,
      scoredCandidateCount: 52,
      remotePolicy: 'explicit_remote_only',
      remoteRejectedCount: 7,
      candidateCount: 20,
      errors: [{ source: 'Upwork - website redesign', error: 'HTTP 403' }],
    },
  });

  assert.equal(report.json.workflow.name, 'Freelance Opportunities');
  assert.equal(report.json.summary.status, 'ready');
  assert.equal(report.json.summary.scannedOpportunities, 566);
  assert.equal(report.json.summary.scoredCandidateCount, 52);
  assert.equal(report.json.summary.remotePolicy, 'explicit_remote_only');
  assert.equal(report.json.summary.remoteRejectedCount, 7);
  assert.match(report.markdown, /Freelance Opportunities/);
  assert.match(report.markdown, /Candidates: 20/);
  assert.match(report.markdown, /Remote policy: explicit_remote_only/);
  assert.match(report.markdown, /Remote rejected: 7/);
  assert.match(report.markdown, /Upwork - website redesign: HTTP 403/);
});

test('buildWorkflowSessionReport handles a missing primary report', () => {
  const report = buildWorkflowSessionReport({
    env: {
      WORKFLOW_SESSION_NAME: 'Freelance Opportunities',
      WORKFLOW_SESSION_SLUG: 'freelance-opportunities',
      WORKFLOW_SESSION_STATUS: 'failure',
    },
    primaryReport: null,
  });

  assert.equal(report.json.summary.status, 'missing_primary_report');
  assert.equal(report.json.summary.errorCount, 0);
  assert.deepEqual(report.json.summary.errors, []);
  assert.match(report.markdown, /missing_primary_report/);
});

test('writeWorkflowSessionReport writes latest markdown and json files', () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'workflow-session-report-'));
  const primaryReportPath = path.join(tempDir, 'outreach-report.json');
  fs.writeFileSync(primaryReportPath, JSON.stringify({
    dryRun: true,
    candidates: [{ name: 'Boulangerie Martin' }],
    sent: [{ status: 'dry-run' }],
    errors: [],
  }));

  const result = writeWorkflowSessionReport({
    env: {
      WORKFLOW_SESSION_NAME: 'Daily Outreach',
      WORKFLOW_SESSION_SLUG: 'daily-outreach',
      WORKFLOW_SESSION_STATUS: 'success',
      WORKFLOW_SESSION_PRIMARY_REPORT: primaryReportPath,
    },
    outputDir: path.join(tempDir, 'reports'),
  });

  assert.ok(fs.existsSync(result.markdownPath));
  assert.ok(fs.existsSync(result.jsonPath));
  assert.match(fs.readFileSync(result.markdownPath, 'utf8'), /Daily Outreach/);
  assert.equal(JSON.parse(fs.readFileSync(result.jsonPath, 'utf8')).summary.candidateCount, 1);
});
