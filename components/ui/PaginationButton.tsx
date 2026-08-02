"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  page: number;
  totalPages: number;
};

function PaginationButton({ page, totalPages }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`?${params.toString()}`);
  };
  const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);
  const array = new Array(totalPages).fill(0);
  return (
    <div className="flex flex-col items-center justify-center space-x-4 my-6">
      <div className="flex items-center justify-center space-x-4 my-6">
        <button
          disabled={page <= 1}
          onClick={() => changePage(page - 1)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        <span className="text-sm font-medium text-gray-700">
          Page <span className="font-bold text-indigo-600">{page}</span>
          &nbsp; of &nbsp;
          {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => changePage(page + 1)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
      <div className="flex gap-5">
        {array.map((_, index) => {
          const page = index + 1;
          return (
            <div key={index}>
              <button
                onClick={() => changePage(page)}
                className={`px-1 ${currentPage === page ? "bg-gray-300" : "bg-transparent"} cursor-pointer`}
              >
                {page}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PaginationButton;
