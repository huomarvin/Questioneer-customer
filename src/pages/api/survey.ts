import type { CreateAnswerDto } from "@/dtos/create-answer.dto";
import { postAnswer } from "@/services/survey";
import { getErrorPath } from "@/utils/error";
import type { NextApiRequest, NextApiResponse } from "next";

function genAnswerInfo(reqBody: any) {
  const answerList: any[] = [];
  Object.keys(reqBody).forEach((key) => {
    if (key === "questionId" || key === "ownerId") return;
    answerList.push({
      componentId: key,
      value: reqBody[key],
    });
  });
  return {
    questionId: reqBody.questionId,
    ownerId: reqBody.ownerId,
    answerList,
  } as CreateAnswerDto;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.redirect(getErrorPath("该接口仅支持POST请求"));
    return;
  }
  const answerInfo = genAnswerInfo(req.body);
  const apiRes = await postAnswer(answerInfo);
  if (String(apiRes.status).startsWith("2")) {
    res.redirect("/success");
    return;
  } else {
    res.redirect(getErrorPath(apiRes.data.error));
  }
}
