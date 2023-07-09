interface AnswerDto {
  componentId: string;
  value: string;
}

export interface CreateAnswerDto {
  questionId: string;
  answerList: AnswerDto[];
  ownerId: string;
}
