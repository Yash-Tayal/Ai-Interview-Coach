function PerformanceTrend({ trend = [] }) {
  if (!trend.length) {
    return (
      <p className="trend-empty">Complete and evaluate interviews to see your performance trend.</p>
    );
  }

  const maxScore = Math.max(...trend.map((item) => item.score), 100);

  return (
    <div className="performance-trend">
      {trend.map((item) => (
        <div key={item.sessionId} className="trend-item">
          <div className="trend-bar-wrapper">
            <div
              className="trend-bar"
              style={{ height: `${(item.score / maxScore) * 100}%` }}
              title={`Score: ${item.score}`}
            />
          </div>
          <span className="trend-score">{item.score}</span>
        </div>
      ))}
    </div>
  );
}

export default PerformanceTrend;
