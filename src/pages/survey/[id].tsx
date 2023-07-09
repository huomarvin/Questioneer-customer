import Layout from "@/app/layout";
import PageWrapper from "@/components/PageWrapper";
import { getComponent } from "@/components/QuestionComponents";
import { getSurveyById } from "@/services/survey";
import { getErrorPath } from "@/utils/error";
import { GetServerSidePropsContext } from "next";
import { ReactElement } from "react";

type PropsType = {
  data?: {
    ownerId: string;
    _id: string;
    title: string;
    desc?: string;
    js?: string;
    css?: string;
    isPublished: boolean;
    isDeleted: boolean;
    componentList: Array<any>;
  };
};

export default function Question(props: PropsType) {
  const { data } = props;
  const {
    _id,
    title = "",
    desc = "",
    isDeleted,
    isPublished,
    componentList = [],
    ownerId,
  } = data || {};

  if (isDeleted) {
    return (
      <PageWrapper title={title} desc={desc}>
        <h1>{title}</h1>
        <p>该问卷已经被删除</p>
      </PageWrapper>
    );
  }

  if (!isPublished) {
    return (
      <PageWrapper title={title} desc={desc}>
        <h1>{title}</h1>
        <p>该问卷尚未发布</p>
      </PageWrapper>
    );
  }

  // 遍历组件
  const ComponentListElem = (
    <>
      {componentList.map((c) => {
        const ComponentElem = getComponent(c);
        return (
          <div key={c.fe_id} className="p-4 text-left w-full">
            {ComponentElem}
          </div>
        );
      })}
    </>
  );

  return (
    <PageWrapper title={title} desc={desc}>
      <form
        method="post"
        action="/api/survey"
        className="mx-auto max-w-md border p-4"
      >
        <h1 className="text-2xl text-center text-black border-b py-2">
          {title}
        </h1>
        <input type="hidden" name="questionId" value={_id} />
        <input type="hidden" name="ownerId" value={ownerId} />

        {ComponentListElem}
        <div className="text-center">
          <button
            type="submit"
            className="px-4 py-1 border-transparent bg-blue-400 hover:bg-blue-600 rounded text-white"
          >
            提交
          </button>
        </div>
      </form>
    </PageWrapper>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (!context.params?.id) {
    return {
      redirect: {
        destination: `/error?message=${encodeURIComponent(
          "未提供足够的信息去查询问卷"
        )}`,
        permanent: false, // 如果是永久重定向则设置为true
      },
    };
  }
  const { id } = context.params;

  const res = await getSurveyById(id as string);
  const { data } = res;
  console.log("🚀 ~ file: [id].tsx:109 ~ getServerSideProps ~ data:", data)
  if (String(res.status).startsWith("20")) {
    return {
      props: { data },
    };
  } else {
    return {
      redirect: {
        destination: getErrorPath(data.error),
        permanent: false, // 如果是永久重定向则设置为true
      },
    };
  }
}
