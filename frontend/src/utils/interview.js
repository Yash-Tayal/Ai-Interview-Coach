export function normalizeInterviewItems(session) {
  if (!session) {
    return [];
  }

  if (session.questions?.length && session.answers?.length) {
    return session.questions.map((question, index) => ({
      questionText: question.text,
      answer: session.answers[index]?.text || '',
    }));
  }

  if (session.responses?.length) {
    return session.responses.map((item) => ({
      questionText: item.questionText,
      answer: item.answer || '',
    }));
  }

  return [];
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
