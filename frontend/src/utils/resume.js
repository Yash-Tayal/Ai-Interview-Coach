export function getAtsScoreCategory(score) {
  if (score >= 90) return 'Excellent';
  if (score >= 75) return 'Good';
  if (score >= 60) return 'Average';
  return 'Needs Improvement';
}

export function getAtsScoreClass(score) {
  if (score >= 90) return 'ats-excellent';
  if (score >= 75) return 'ats-good';
  if (score >= 60) return 'ats-average';
  return 'ats-poor';
}

export function getAtsScoreColor(score) {
  if (score >= 90) return '#166534';
  if (score >= 75) return '#1e40af';
  if (score >= 60) return '#854d0e';
  return '#991b1b';
}

export function getAtsScoreTrackColor(score) {
  if (score >= 90) return '#22c55e';
  if (score >= 75) return '#3b82f6';
  if (score >= 60) return '#eab308';
  return '#ef4444';
}
