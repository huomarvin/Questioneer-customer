import axios from "./ajax";

export async function postAnswer(answerInfo: any) {
  const url = `/answer`;
  return await axios.post(url, answerInfo);
}

export async function getSurveyById(id: string) {
  const url = `/survey/${id}`;
  return await axios.get(url);
}
