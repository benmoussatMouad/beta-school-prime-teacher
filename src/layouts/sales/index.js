import React, { useState } from "react";
import Card from "@mui/material/Card";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";
import { useTranslation } from "react-i18next";
import { getAccessToken } from "../../utils";
import { useAuth } from "../../context/auth/authContext";
import { teacherSalesTableData, teacherTableData } from "./data/salesTeacher";
import { useGetSales } from "api/teacher/getSales";
import { salesRootTableData } from "./data/salesRootOnly";


function Sales() {
  const { user } = useAuth();
  const token = getAccessToken();
  const { t } = useTranslation();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortType, setSortType] = useState("desc");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState("PAID");

  const { data, isLoading } = useGetSales({
    token,
    page,
    limit: rowsPerPage,
    sortBy,
    sortType,
    startDate,
    endDate,
    status,
    role: user.user.role
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "startDate":
        setStartDate(value);
        break;
      case "endDate":
        setEndDate(value);
        break;
      case "status":
        setStatus(value);
        break;
      default:
        break;
    }
  };

  const handleSortChange = (key) => {
    if (sortBy === key) {
      setSortType(sortType === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortType("desc");
    }
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { columns, rows } = user.user.role !== "ROOT"
    ? teacherSalesTableData(t, data?.transactions || [], data?.commission)
    : salesRootTableData(t, data?.transactions || [], data?.commission);

  return (
    <DashboardLayout user={user}>
      <DashboardNavbar pageName={t("sales.title")} />
      <VuiBox py={3}>
        <Card>
          <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <VuiTypography variant="h3" color="white">
              {t("sales.title")}
            </VuiTypography>
          </VuiBox>
          <VuiBox>
            <Table
              columns={columns}
              rows={rows}
              onSearchChange={handleChange}
              page={page}
              totalCount={data?.totalCount || 0}
              rowsPerPage={rowsPerPage}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              isLoading={isLoading}
              status={status}
              tableId="sales"
              onSortChange={handleSortChange}
              sortConfig={{ key: sortBy, direction: sortType }}
            />
          </VuiBox>
          {data?.stats && (
            <VuiBox mt={3} display="flex" justifyContent="flex-end" gap={3}>
              <VuiTypography variant="h6" color="white">
                {t("sales.totalAmount")}: {data.stats.totalAmount} DA
              </VuiTypography>
              <VuiTypography variant="h6" color="white">
                {t("sales.totalNetAmount")}: {data.stats.totalNetAmount} DA
              </VuiTypography>
            </VuiBox>
          )}
        </Card>
      </VuiBox>
    </DashboardLayout>
  );
}

export default Sales;

