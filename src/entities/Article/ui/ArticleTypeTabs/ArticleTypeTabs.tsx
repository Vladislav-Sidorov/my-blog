import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/ClassNames/ClassNames';
import { Tabs } from 'shared/ui/Tabs';
import { ArticleType } from 'entities/Article/model/types/article';
import { TabItem } from 'shared/ui/Tabs/ui/Tabs';
// import cls from './ArticleTypeTabs.module.scss';

interface ArticleTypeTabsProps {
  className?: string;
  value: ArticleType;
  onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs: FC<ArticleTypeTabsProps> = React.memo((props) => {
  const { className, value, onChangeType } = props;
  const { t } = useTranslation();

  const typeTabs = useMemo<TabItem[]>(
    () => [
      { value: ArticleType.ALL, content: t('Все статьи') },
      { value: ArticleType.IT, content: t('Айти') },
      { value: ArticleType.SCIENCE, content: t('Наука') },
      { value: ArticleType.ECONOMICS, content: t('Экономика') },
    ],
    [t],
  );

  const onTabClick = React.useCallback(
    (tab: TabItem) => {
      onChangeType(tab.value as ArticleType);
    },
    [onChangeType],
  );

  return <Tabs tabs={typeTabs} value={value} onTabClick={onTabClick} className={classNames('', {}, [className])} />;
});