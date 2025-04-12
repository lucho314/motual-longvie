import { FC } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  totalItems?: number;
  perPage?: number;
  onPrevious: () => void;
  onNext: () => void;
}

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  lastPage,
  totalItems = 0,
  perPage = 10,
  onPrevious,
  onNext,
}) => {
  const from = (currentPage - 1) * perPage + 1;
  const to = Math.min(currentPage * perPage, totalItems);

  return (
    <div className="sticky right-0 bottom-0 w-full items-center border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex sm:justify-between">
      <div className="mb-4 flex items-center sm:mb-0">
        <button
          onClick={onPrevious}
          disabled={currentPage === 1}
          className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Previous page</span>
          <HiChevronLeft className="text-2xl" />
        </button>
        <button
          onClick={onNext}
          disabled={currentPage === lastPage}
          className="mr-2 inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Next page</span>
          <HiChevronRight className="text-2xl" />
        </button>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Mostrando&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            {from}-{to}
          </span>
          &nbsp;de&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            {totalItems}
          </span>
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <button
          onClick={onPrevious}
          disabled={currentPage === 1}
          className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary-700 py-2 px-3 text-center text-sm font-medium text-white hover:bg-primary-800 disabled:opacity-50 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <HiChevronLeft className="mr-1 text-base" />
          Anterior
        </button>
        <button
          onClick={onNext}
          disabled={currentPage === lastPage}
          className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary-700 py-2 px-3 text-center text-sm font-medium text-white hover:bg-primary-800 disabled:opacity-50 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Siguiente
          <HiChevronRight className="ml-1 text-base" />
        </button>
      </div>
    </div>
  );
};
