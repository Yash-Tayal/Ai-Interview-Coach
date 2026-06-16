export function normalizeInterviewItems(session) {
  if (!session) {
    return [];
  }

  if (session.questions?.length && session.answers?.length) {
    return session.questions.map((question, index) => {
      const evaluation = session.evaluations?.find((item) => item.questionIndex === index);

      return {
        questionText: question.text,
        answer: session.answers[index]?.text || '',
        evaluation: evaluation || null,
      };
    });
  }

  if (session.responses?.length) {
    return session.responses.map((item, index) => {
      const evaluation = session.evaluations?.find((evalItem) => evalItem.questionIndex === index);

      return {
        questionText: item.questionText,
        answer: item.answer || '',
        evaluation: evaluation || null,
      };
    });
  }

  return [];
}

export function getScoreLabel(score) {
  if (score >= 85) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 50) return 'Fair';
  return 'Needs Improvement';
}

export function getScoreClass(score) {
  if (score >= 85) return 'score-excellent';
  if (score >= 70) return 'score-good';
  if (score >= 50) return 'score-fair';
  return 'score-poor';
}

export function formatDate(dateString) {
  if (!dateString) {
    return 'N/A';
  }

  return new Date(dateString).toLocaleString();
}

export function formatDateShort(dateString) {
  if (!dateString) {
    return 'N/A';
  }

  return new Date(dateString).toLocaleDateString();
}
