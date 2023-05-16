import React, { useCallback, useEffect, useState, useMemo } from 'react';
import Text from 'components/custom-components/Text';
import View from 'components/custom-components/View';
import { VacancyI } from 'types/common';
import DeleteIcon from 'assets/icons/delete-blue.svg';
import AddIcon from 'assets/icons/add.svg';
import RemoveIcon from 'assets/icons/remove.svg';
import PenIcon from 'assets/icons/pen-white.svg';
import Textarea from 'components/custom-components/Textarea';

type propsType = {
  title: string;
  value?: VacancyI['questions'][0];
  onChange?: (val: VacancyI['questions'][0] | undefined) => void;
};

const RenderQuestions: React.FC<propsType> = ({ onChange, title, value }) => {
  const [fields, setFields] = useState({ question: '', option1: '', option2: '', option3: '' });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setFields({
      question: value?.question || '',
      option1: value?.options?.[0] || '',
      option2: value?.options?.[1] || '',
      option3: value?.options?.[2] || '',
    });
  }, [value]);

  const onChangeHandler = (field: Partial<typeof fields>) => {
    setFields((prev) => ({ ...prev, ...field }));
  };

  const options = useMemo(() => {
    const res: string[] = [];
    if (fields.option1) res.push(fields.option1);
    if (fields.option2) res.push(fields.option2);
    if (fields.option3) res.push(fields.option3);

    return res;
  }, [fields]);

  const onAddHandler = () => {
    setOpen(false);
    onChange?.({ question: fields.question, options });
  };

  const onDeleteHandler = () => {
    setOpen(false);
    setFields({ question: '', option1: '', option2: '', option3: '' });
    onChange?.(undefined);
  };

  return (
    <View
      class_name="full-width mb-20 fdc ais pv-14 ph-20 br-8"
      bg={!open && value?.question ? '#038CA9' : '#D5DEDE4D'}
    >
      <View class_name="full-width space-b">
        <Text color={!open && value?.question ? '#fff' : '#000'} SubtitleM>
          {title}
        </Text>
        <View
          class_name="pointer"
          onClick={() => {
            if (open) onDeleteHandler();
            else setOpen(true);
          }}
        >
          {open ? <DeleteIcon /> : fields.question ? <PenIcon /> : <AddIcon />}
        </View>
      </View>
      {open && (
        <View class_name="mt-23 fdc ais">
          <Textarea
            placeholder="Введите вопрос"
            height={100}
            maxLength={250}
            rows={3}
            class_name="br-4"
            value={fields.question}
            onChange={(e) => onChangeHandler({ question: e.target.value })}
          />
          <View class_name="space-b mt-12 mb-10">
            <Textarea
              placeholder="Введите вопрос"
              width={400}
              class_name="br-4 answer-area"
              container_class="f-grow-1 mr-12"
              value={fields.option1}
              onChange={(e) => onChangeHandler({ option1: e.target.value })}
              maxLength={50}
              hideCounter
            />
            <View class_name="pointer" onClick={() => onChangeHandler({ option1: '' })}>
              <RemoveIcon />
            </View>
          </View>
          <View class_name="space-b mb-10">
            <Textarea
              placeholder="Введите вопрос"
              width={400}
              class_name="br-4 answer-area"
              value={fields.option2}
              container_class="f-grow-1 mr-12"
              onChange={(e) => onChangeHandler({ option2: e.target.value })}
              maxLength={50}
              hideCounter
            />
            <View class_name="pointer" onClick={() => onChangeHandler({ option2: '' })}>
              <RemoveIcon />
            </View>
          </View>
          <View class_name="space-b mb-10 full-width">
            <Textarea
              placeholder="Введите вопрос"
              width={400}
              class_name="br-4 answer-area"
              container_class="f-grow-1 mr-12"
              value={fields.option3}
              onChange={(e) => onChangeHandler({ option3: e.target.value })}
              maxLength={50}
            />
            <View class_name="pointer mb-15" onClick={() => onChangeHandler({ option3: '' })}>
              <RemoveIcon />
            </View>
          </View>

          {options.length && fields.question ? (
            <View
              class_name="d-flex aic pointer"
              onClick={() => {
                onAddHandler();
              }}
            >
              <AddIcon />
              <Text SubtitleM blue class_name="ml-10">
                Добавить вопрос
              </Text>
            </View>
          ) : null}
        </View>
      )}
    </View>
  );
};

export default RenderQuestions;
