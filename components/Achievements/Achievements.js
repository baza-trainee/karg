import initTranslations from "../../app/i18n";
import ClientAchievements from './ClientAchievements';

export default async function Achievements({ locale, namespaces }) {
  const { t } = await initTranslations(locale, namespaces);

  const translations = {
    messages: [
      t('achievements1'),
      t('achievements2'),
      t('achievements3'),
      t('achievements4')
    ],
    defaultValues: ['2427', '2300', '720', '115+']
  };

  return <ClientAchievements translations={translations} />;
}