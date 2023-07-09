import { useRouter } from "next/router";
import Image from "next/image";
import PageWrapper from "@/components/PageWrapper";

function ErrorMessage() {
  const router = useRouter();
  const { message } = router.query;

  return (
    <PageWrapper title="错误页面">
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center sm:px-4 lg:px-0">
        <div className="max-w-md w-full space-y-8 py-12 px-6 bg-white shadow rounded-xl sm:px-10">
          <div>
            <Image
              width={200}
              height={200}
              className="mx-auto h-12 w-auto"
              src="/error-icon.png"
              alt="Error Icon"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              哎呀，出了点问题！
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {message || "Unknown error"}
            </p>
          </div>
          <button
            onClick={() => router.push("/")}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to Home
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}

export default ErrorMessage;
