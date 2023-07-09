import React, { ReactElement } from "react";
import Head from "next/head";
import Script from "next/script";
import Layout from "@/app/layout";

type PropsType = {
  title: string;
  desc?: string;
  css?: string;
  js?: string;
  children: JSX.Element | JSX.Element[];
};

function PageWrapper(props: PropsType) {
  const { title, desc = "", css = "", js = "", children } = props;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <style>{css}</style>
      </Head>
      <main className="max-w-lg mx-auto">{children}</main>
      <Script id="page-js">{js}</Script>
    </>
  );
}

export default PageWrapper;

PageWrapper.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
