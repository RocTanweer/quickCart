import { useState } from "react";

import { FlexBox } from "../../layouts";

import {
  Users,
  ProductList,
  ProductCreate,
  ProductCategory,
  ProductBrand,
  Orders,
  Payments,
  Tabs,
} from "./layouts";

import tabNames from "./constants/tabNames";

const Admin = () => {
  const [selectedSec, setSelectedSec] = useState(tabNames.users);
  const [productSecName, setProductSecName] = useState("Product");

  return (
    <div>
      <Tabs
        activeSec={selectedSec}
        handleActiveSec={setSelectedSec}
        btnText={productSecName}
        setBtnText={setProductSecName}
      />

      <FlexBox sx={{ paddingX: "24px" }}>
        {selectedSec === tabNames.users && <Users />}
        {selectedSec === tabNames.product.list && (
          <ProductList
            handleActiveSec={setSelectedSec}
            setBtnText={setProductSecName}
          />
        )}
        {selectedSec === tabNames.product.create && <ProductCreate />}
        {selectedSec === tabNames.product.category && <ProductCategory />}
        {selectedSec === tabNames.product.brand && <ProductBrand />}
        {selectedSec === tabNames.orders && <Orders />}
        {selectedSec === tabNames.payments && <Payments />}
      </FlexBox>
    </div>
  );
};

export default Admin;
