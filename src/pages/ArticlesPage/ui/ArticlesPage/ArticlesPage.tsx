import { classNames } from 'shared/lib/ClassNames/ClassNames';
import { useTranslation } from 'react-i18next';
import { ArticleList } from 'entities/Article';
import { ReducersList, DynamicModuleLoader } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import React from 'react';
import { Page } from 'widgets/Page';
import { Text } from 'shared/ui/Text';
import { articlePageReducer, getArticles } from 'pages/ArticlesPage/model/slice/articlePageSlice';
import { getArticlesPageError } from 'pages/ArticlesPage/model/selectors/getArticlesPageError/getArticlesPageError';
import { getArticlesPageHasMore } from 'pages/ArticlesPage/model/selectors/getArticlesPageHasMore/getArticlesPageHasMore';
import { getArticlesPageInited } from 'pages/ArticlesPage/model/selectors/getArticlesPageInited/getArticlesPageInited';
import { getArticlesPageLoading } from 'pages/ArticlesPage/model/selectors/getArticlesPageLoading/getArticlesPageLoading';
import { getArticlesPageNumber } from 'pages/ArticlesPage/model/selectors/getArticlesPageNumber/getArticlesPageNumber';
import { getArticlesPageView } from 'pages/ArticlesPage/model/selectors/getArticlesPageView/getArticlesPageView';
import { fetchNextArticlesPage } from 'pages/ArticlesPage/model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from 'pages/ArticlesPage/model/services/initArticlesPage/initArticlesPage';
import { useSearchParams } from 'react-router-dom';
import { ArticlePageFilters } from '../ArticlePageFilters/ArticlePageFilters';

import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
  className?: string;
}

const ArticlesPage: React.FC<ArticlesPageProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageLoading);
  const hasMore = useSelector(getArticlesPageHasMore);
  const page = useSelector(getArticlesPageNumber);
  const view = useSelector(getArticlesPageView);
  const error = useSelector(getArticlesPageError);
  const inited = useSelector(getArticlesPageInited);

  const onLoadNextPart = React.useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams));
  });

  const reducers: ReducersList = {
    articlesPage: articlePageReducer,
  };

  if (error) {
    return (
      <Page>
        <Text title={t('Произошла ошибка при загрезке статей')} />
      </Page>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page onScrollEnd={onLoadNextPart}>
        <ArticlePageFilters />
        <ArticleList className={cls.list} articles={articles} isLoading={isLoading} view={view} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default ArticlesPage;