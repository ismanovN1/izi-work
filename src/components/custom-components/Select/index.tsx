import React, { ReactNode, useMemo, useState, useEffect, useRef } from 'react';

// Components
import Text from '../Text';
import View from '../View';

// Images & Icons
import ArrowIcon from 'assets/icons/select-arrow.svg';

// Styles
import './index.scss';

type OptionT = { _id: string; name: string };

type PropsT = {
  placeholder?: string;
  inputArgs?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  class_name?: string;
  width?: string | number;
  height?: string | number;
  style?: any;
  leftIcon?: ReactNode;
  title?: string;
  search?: boolean;
  options?: Array<OptionT>;
  options_name?: string;
  value?: OptionT;
  onChange?: (value: OptionT) => void;
};

let count = 0;

const Select: React.FC<PropsT> = ({
  class_name = '',
  leftIcon,
  placeholder,
  inputArgs,
  options,
  options_name,
  height,
  title,
  value,
  onChange,
  search,
  width,
}) => {
  const inputRef = useRef<HTMLInputElement>();
  const searchRef = useRef<HTMLInputElement>();
  const [val, setVal] = useState<OptionT | undefined>(value);
  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    count++;
  }, []);

  useEffect(() => {
    if (val?._id) {
      onChange?.(val);
    }
  }, [val]);

  useEffect(() => {
    if (inputArgs?.value !== inputText) {
      setInputText(String(inputArgs?.value || ''));
    }
  }, [inputArgs?.value]);

  return (
    <View
      class_name={'custom-select ' + class_name}
      {...{ height, width }}
      onMouseDown={(e) => {
        if (!search) e.preventDefault();
      }}
      onClick={() => {
        if (!search) {
          if (!open) {
            inputRef.current?.focus();
          } else {
            inputRef.current?.blur();
          }
        }
      }}
    >
      {leftIcon}
      {search ? (
        <input
          ref={searchRef}
          className="Subtitle input "
          {...inputArgs}
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            inputArgs?.onChange?.(e);
          }}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
        />
      ) : (
        <Text Small>
          {val?.name || title || placeholder}{' '}
          {options_name ? <Text grey>{`(${(options || []).length} ${options_name})`}</Text> : null}
        </Text>
      )}
      <View
        class_name={`arrow ${open ? 'opened' : ''}`}
        onClick={() => {
          if (search) {
            setOpen((prev) => !prev);
          }
        }}
      >
        <ArrowIcon />
      </View>
      {options?.length ? (
        <View class_name={`options-container ovf-x-hidden scroll_bar_usual ${open ? 'open' : ''}`}>
          {options?.map((item) => (
            <div
              key={item._id}
              className={`ph-${leftIcon ? 50 : 10} option`}
              onMouseDown={(e) => {
                setVal(item);
                setInputText(item.name);
              }}
            >
              <Text Small class_name="white-space-nowrap">
                {item.name}
              </Text>
            </div>
          ))}
        </View>
      ) : null}
      <input
        ref={inputRef}
        onBlur={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        className="helper-input"
        readOnly
      />
    </View>
  );
};

export default Select;
