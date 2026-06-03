import { useUpdate, useRecordContext, useRefresh } from "react-admin";
import { Button } from "@mui/material";

export const QuickStatusToggle = () => {
  const record = useRecordContext();            // useRecordContext
  const refresh = useRefresh();
  const [update, { isPending }] = useUpdate();  // useUpdate

  if (!record) return null;

  const handleToggle = () => {
    update(
      "employees",
      {
        id: record.id,
        data: { active: !record.active },
        previousData: record,// obligatoire pour useUpdate
      },
      { onSuccess: refresh }
    );
  };

  return (
    <Button
      variant="contained"
      color={record.active ? "error" : "success"}
      disabled={isPending}
      onClick={handleToggle}
      size="small"
    >
      {record.active ? "Désactiver" : "Activer"}
    </Button>
  );
};