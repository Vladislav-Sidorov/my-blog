import { classNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './Text.module.scss';

export enum TextTheme {
  PRIMARY = 'primary',
  SECONDORY = 'secondary',
  ERROR = 'error',
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string | unknown;
  theme?: TextTheme;
}

export const Text: React.FC<TextProps> = (props) => {
  const {
    className,
    title,
    text,
    theme = TextTheme.PRIMARY,
  } = props;

  return (
    <div className={classNames(cls.Text, { [cls[theme]]: true }, [className])}>
      {title && <p className={cls.title}>{title}</p>}
      {text && <p className={cls.text}>{text}</p>}
    </div>
  );
};
