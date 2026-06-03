import { useRecordContext, useGetList } from "react-admin";
import { Typography, Chip } from "@mui/material";

export const DepartmentStats = () => {
  const employee = useRecordContext();          // useRecordContext
  const { total, isPending } = useGetList("employees", {  // useGetList optimisé
    filter: { department: employee?.department, active: true },
    pagination: { page: 1, perPage: 1 },       // on veut juste le total
  }, { enabled: !!employee?.department });

  if (isPending) return null;

  return (
    <Chip
      label={`Collègues actifs en ${employee?.department} : ${(total ?? 1) - 1}`}
      color="info"
      sx={{ mt: 1 }}
    />
  );
};