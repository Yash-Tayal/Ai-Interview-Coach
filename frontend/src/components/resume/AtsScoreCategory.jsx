import { getAtsScoreCategory, getAtsScoreClass } from '../../utils/resume.js';

function AtsScoreCategory({ score }) {
  return (
    <span className={`ats-category-badge ${getAtsScoreClass(score)}`}>
      {getAtsScoreCategory(score)}
    </span>
  );
}

export default AtsScoreCategory;
