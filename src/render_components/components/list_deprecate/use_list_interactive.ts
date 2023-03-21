import { IUseSelectProps, useSelectIndex } from '@vikadata/components';

interface IUseListInteractive {
  activeItemClass: string;
}

type IUnionProps = IUseSelectProps & IUseListInteractive;

export const useListInteractive = (options: IUnionProps) => {
  const { activeItemClass } = options;
  const { index: activeIndex, setIndex: setActiveIndex } = useSelectIndex({ ...options, activeItemClass: `.${activeItemClass}` });

  return {
    activeIndex: activeIndex,
    setActiveIndex: setActiveIndex,
  };
};
