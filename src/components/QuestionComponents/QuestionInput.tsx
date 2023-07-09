import React, { FC } from "react";

type PropsType = {
  fe_id: string;
  props: {
    title: string;
    placeholder?: string;
  };
};

const QuestionInput: FC<PropsType> = ({ fe_id, props }) => {
  const { title, placeholder = "" } = props;

  return (
    <>
      <p className="mb-1">{title}</p>
      <input
        name={fe_id}
        placeholder={placeholder}
        className="w-full px-3 py-2 border-b rounded"
      />
    </>
  );
};

export default QuestionInput;
