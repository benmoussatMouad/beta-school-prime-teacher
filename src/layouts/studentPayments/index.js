import { useState } from "react";
import Card from "@mui/material/Card";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";
import { useTranslation } from "react-i18next";
import { transactionsTableData } from "./data/transactions";
import { useGetPendingCashTransactions } from "../../api/admin/getStudentPayments";
import { getAccessToken } from "../../utils";
import { useAuth } from "context/auth/authContext";
import PaymentStudentDialog from "examples/Dialogs/ConfirmStudentPayment";
import CancelTransactionDialog from "examples/Dialogs/CancelTransaction";

function StudentPayments() {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const [transaction, setTransaction] = useState(null);
  const { user } = useAuth();
  const token = getAccessToken();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [sortBy, setSortBy] = useState("");
  const [sortType, setSortType] = useState("desc");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [wilaya, setWilaya] = useState("");

  const { t } = useTranslation();

  const { data, isLoading } = useGetPendingCashTransactions({
    token,
    page,
    limit,
    sortBy,
    sortType,
    firstName,
    lastName,
    email,
    subject,
    wilaya
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "subject":
        if (value === "NONE") {
          setSubject("");
        } else {
          setSubject(value);
        }
        break;
      case "wilaya":
        if (value === "NONE") {
          setWilaya("");
        } else {
          setWilaya(value);
        }
        break;
      default:
        break;
    }
  };

  const handleOpen = async (transaction) => {
    setTransaction(transaction)
    setOpenConfirm(true);
  };

  const handleSortChange = (key) => {
    if (sortBy === key) {
      setSortType((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortType("asc");
    }
  };

  const handleClose = () => {
    setOpenConfirm(false);
    setOpenCancel(false);
  };

  const handleCancel = (transaction) => {
    setTransaction(transaction)
    setOpenCancel(true);
  }


  const { columns, rows } = transactionsTableData(t, data?.transactions, handleOpen, handleCancel);

  return (
    <DashboardLayout user={user}>
      <DashboardNavbar pageName={t("transactions.pendingCash")} />
      <VuiBox py={3}>
        <Card>
          <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="22px">
            <VuiTypography variant="h4" color="white">
              {t("transactions.pendingCash")}
            </VuiTypography>
          </VuiBox>
          <VuiBox>
            <Table
              columns={columns}
              rows={rows}
              page={page}
              totalCount={data?.totalCount || 0}
              rowsPerPage={limit}
              onPageChange={(_, newPage) => setPage(newPage)}
              onRowsPerPageChange={(event) => setLimit(parseInt(event.target.value, 10))}
              isLoading={isLoading}
              onSortChange={handleSortChange}
              sortConfig={{ key: sortBy, direction: sortType }}
              onSearchChange={handleChange}
              subject={subject}
              wilaya={wilaya}
              tableId="studentsTransaction"
            />
          </VuiBox>
        </Card>
      </VuiBox>
      <PaymentStudentDialog open={openConfirm} onClose={handleClose} transaction={transaction} />
      <CancelTransactionDialog open={openCancel} onClose={handleClose} transaction={transaction} />
    </DashboardLayout>
  );
}

export default StudentPayments;