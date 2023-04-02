import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/ClassNames/ClassNames';
import { Page } from 'shared/ui/Page';
import cls from './NotFoundPage.module.scss';

interface NotFoundPageProps {
  className?: string;
}

const NotFoundPage: React.FC<NotFoundPageProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation('notFound');

  return <Page className={classNames(cls.NotFoundPage, {}, [className])}>{t('Страница не найдена')}</Page>;
};
export default NotFoundPage;
