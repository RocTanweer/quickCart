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

  return (
    <div>
      <Tabs activeSec={selectedSec} handleActiveSec={setSelectedSec} />

      <FlexBox sx={{ paddingX: "24px" }}>
        <Users />
      </FlexBox>
    </div>
  );
};

export default Admin;
