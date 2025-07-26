import { BORDER_STYLES } from '../../types/constants';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type PaginationControlsProps = {
  page: number;
  setPage: (page: number) => void;
};

export default function PaginationControls({
  page,
  setPage,
}: PaginationControlsProps) {
  const isFirstPage = page === 1;
  console.log(page);
  return (
    <div className="mt-6 flex gap-x-4 justify-center [&>*]:w-[42px] [&>*]:h-[42px]">
      <button
        className={`${BORDER_STYLES} hover:bg-fuchsia-300 hover:text-white disabled:opacity-50 disabled:pointer-events-none`}
        onClick={() => !isFirstPage && setPage(page - 1)}
        disabled={isFirstPage}
      >
        <ArrowLeft />
      </button>
      <span className={BORDER_STYLES}>{page}</span>
      <button
        className={`${BORDER_STYLES} hover:bg-fuchsia-300 hover:text-white`}
        onClick={() => setPage(page + 1)}
      >
        <ArrowRight />
      </button>
    </div>
  );
}
