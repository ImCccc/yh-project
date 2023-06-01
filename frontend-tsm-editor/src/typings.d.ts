declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.svg';

declare namespace TSAPI {
  type SelectOptionProps = {
    value: string;
    label: string;
    id?: string;
    [key: string]: any;
  };

  type SelectOptionListProps = SelectOptionProps[];
}
