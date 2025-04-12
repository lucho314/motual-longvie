import type { FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";

const ListLiquidacionPage: FC = () => {
  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-2xl font-bold">Lista de Liquidaciones</h1>
        <p>Esta es la página de lista de liquidaciones.</p>
      </div>
    </NavbarSidebarLayout>
  );
};

export default ListLiquidacionPage;
