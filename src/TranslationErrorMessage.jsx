// TranslationErrorMessage.js
import React from 'react';
import { useTranslation } from 'react-i18next';

const TranslationErrorMessage = () => {
  const { t } = useTranslation();

  return (
    <div className="translation-error-message">
      <p>{t("translation_error_message")}</p>
    </div>
  );
};

export default TranslationErrorMessage;
