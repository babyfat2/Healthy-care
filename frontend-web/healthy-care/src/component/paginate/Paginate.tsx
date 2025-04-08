import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPaginate from "react-paginate";


function Paginate({
    page,
    choosePage,
    row,
    total
}: {
    page: number,
    choosePage: (pageNumber: number) => void,
    row: number,
    total: number
}) {
    return (
        <ReactPaginate
            containerClassName="flex items-center justify-center gap-2 mt-4"
            pageClassName="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
            activeClassName="bg-blue-500 text-white border-blue-500"
            pageLinkClassName="w-full h-full flex items-center justify-center cursor-pointer"
            previousClassName="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-100 transition cursor-pointer"
            nextClassName="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-100 transition cursor-pointer"
            breakClassName="text-gray-500"
            forcePage={page}
            onPageChange={(event) => choosePage(event.selected)}
            pageCount={Math.ceil(total / row)}
            breakLabel="..."
            previousLabel={
                <ChevronLeft size={18} />
            }
            nextLabel={
                <ChevronRight size={18} />
            }
        />
    )
};

export default Paginate;
