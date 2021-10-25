export type FormInputProps<T = unknown> = {
  value: T;
  defaultValue?: T;
  onChange: (value: T) => void;
};
