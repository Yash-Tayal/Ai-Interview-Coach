function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="loading-state">
      <div className="spinner" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}

export default LoadingSpinner;
