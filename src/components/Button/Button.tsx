import React, { useMemo } from 'react';
import { ImSpinner9 } from 'react-icons/im';

import { handleMouseUpByBlurring, MouseUpBlurHandler } from '@/types/Focus';
import { mergeClasses } from '@/utils/mergeClasses';
import { ButtonProps } from './Type';
import { UnstyledButton } from './UnstyledButton';
import { getBase, getSize, getStatus, getTheme } from './utils';

interface CommonButtonProps
  extends Pick<
    ButtonProps,
    | 'id'
    | 'accessibilityLabel'
    | 'ariaDescribedBy'
    | 'role'
    | 'onClick'
    | 'onFocus'
    | 'onBlur'
    | 'onMouseEnter'
    | 'onTouchStart'
    | 'className'
  > {
  onMouseUp: MouseUpBlurHandler;
}

type LinkButtonProps = Pick<ButtonProps, 'url' | 'external' | 'download'>;

type ActionButtonProps = Pick<
  ButtonProps,
  | 'type'
  | 'disabled'
  | 'loading'
  | 'ariaControls'
  | 'ariaExpanded'
  | 'pressed'
  | 'onKeyDown'
  | 'onKeyUp'
  | 'onKeyPress'
  | 'form'
>;

const DEFAULT_SIZE = 'medium';

const DEFAULT_THEME = 'basic';

const Button = ({
  id,
  children,
  url,
  disabled = false,
  external,
  download,
  type,
  form,
  loading = false,
  pressed,
  accessibilityLabel,
  role,
  ariaControls,
  ariaExpanded,
  ariaDescribedBy,
  onClick,
  onFocus,
  onBlur,
  onKeyDown,
  onKeyPress,
  onKeyUp,
  onMouseEnter,
  onTouchStart,
  icon,
  theme = DEFAULT_THEME,
  size = DEFAULT_SIZE,
  fullWidth,
  className,
  ...rest
}: ButtonProps) => {
  const commonProps: CommonButtonProps = {
    id,
    accessibilityLabel,
    ariaDescribedBy,
    role,
    onClick,
    onFocus,
    onBlur,
    onMouseUp: handleMouseUpByBlurring,
    onMouseEnter,
    onTouchStart,
  };
  const linkProps: LinkButtonProps = {
    url,
    external,
    download,
  };
  const actionProps: ActionButtonProps = {
    type,
    form,
    disabled: disabled || loading,
    loading,
    ariaControls,
    ariaExpanded,
    pressed,
    onKeyDown,
    onKeyUp,
    onKeyPress,
  };

  const baseClass = getBase();
  const themeClass = getTheme(theme);
  const sizeClass = getSize(size);
  const statusClass = getStatus(loading);

  const classes = useMemo(() => {
    const classData = mergeClasses(baseClass, themeClass, sizeClass, statusClass, className ?? '');
    return classData;
  }, [baseClass, className, sizeClass, statusClass, themeClass]);

  const loadingMarkup = <ImSpinner9 className="w-4 h-4 mr-2 animate-spin" />;

  return (
    <UnstyledButton className={classes} {...commonProps} {...linkProps} {...actionProps} {...rest}>
      <>
        {loading && loadingMarkup}
        {children}
      </>
    </UnstyledButton>
  );
};

export default Button;
