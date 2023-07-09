import React, { FC } from "react";

type PropsType = {
  fe_id: string;
  props: {
    title: string;
    options: Array<{
      value: string;
      text: string;
    }>;
    value?: string;
    isVertical?: boolean;
  };
};

const QuestionRadio: FC<PropsType> = ({ fe_id, props }) => {
  const { title, options = [], value, isVertical } = props;

  return (
    <>
      <p className="mb-1">{title}</p>
      <ul className="w-full py-1 rounded list-none">
        {options.map((opt) => {
          const { value: val, text } = opt;
          let liClassName = "";
          if (isVertical) liClassName = "mb-2";
          else liClassName = "mr-5 inline-block";

          return (
            <li key={val} className={liClassName}>
              <label>
                <input
                  type="radio"
                  className="mr-1"
                  name={fe_id}
                  value={val}
                  defaultChecked={val === value}
                />
                {text}
              </label>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default QuestionRadio;
