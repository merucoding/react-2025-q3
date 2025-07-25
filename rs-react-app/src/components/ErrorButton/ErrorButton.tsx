import { useState } from 'react';
import { BORDER_STYLES } from '../../types/constants';

export default function ErrorButton() {
  const [showError, setShowError] = useState(false);

  if (showError) throw new Error('Test Error Boundary');

  return (
    <button
      onClick={() => setShowError(true)}
      className={`${BORDER_STYLES} hover:bg-fuchsia-300 hover:text-white`}
    >
      trigger error
    </button>
  );
}
