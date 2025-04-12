import { KeyboardEventHandler, useState, type FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Breadcrumb, Button, Label, TextInput } from "flowbite-react";
import { HiDocumentDownload, HiHome } from "react-icons/hi";
import AddSocioModal from "../../components/socios/AddSocioModal";
import SociosTable from "../../components/socios/SociosTable";
import { useSocios } from "@/hooks/useSocios";
import { Pagination } from "@/components/ui/Pagination";

const SocioListPage: FC = function () {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isLoading } = useSocios({ page, search });

  const handleSearch: KeyboardEventHandler<HTMLInputElement> = (event) => {
    const { key, currentTarget: { value } } = event;
    
    if (key !== "Enter") return;
    setSearch(value);
    setPage(1); // Reset to first page on new search
    event.preventDefault();
  };
  

  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <Breadcrumb className="mb-4">
              <Breadcrumb.Item href="#">
                <div className="flex items-center gap-x-3">
                  <HiHome className="text-xl" />
                  <span className="dark:text-white">Home</span>
                </div>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/socios/list">Socios</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Todos los socios
            </h1>
          </div>
          <div className="sm:flex">
            <div className="mb-3 hidden items-center dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
              <form className="lg:pr-3">
                <Label htmlFor="users-search" className="sr-only">
                  Search
                </Label>
                <div className="relative mt-1 lg:w-64 xl:w-96">
                  <TextInput
                    id="users-search"
                    name="users-search"
                    placeholder="Search for users"
                    type="text"
                    onKeyDown={handleSearch}
                    defaultValue={search}
                  />
                </div>
              </form>
            </div>
            <div className="ml-auto flex items-center space-x-2 sm:space-x-3">
              <AddSocioModal />
              <Button color="gray">
                <div className="flex items-center gap-x-3">
                  <HiDocumentDownload className="text-xl" />
                  <span>Export</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <SociosTable socios={data?.data} isLoading={isLoading} />
              {data && (
                <Pagination
                  currentPage={data.current_page}
                  lastPage={data.last_page}
                  totalItems={data.total}
                  perPage={data.per_page}
                  onPrevious={() => setPage((p) => Math.max(p - 1, 1))}
                  onNext={() => setPage((p) => Math.min(p + 1, data.last_page))}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

export default SocioListPage;
