import { useRecordContext, useGetOne } from "react-admin";
import { Card, CardContent, Typography, Chip, CircularProgress, Alert } from "@mui/material";

export const ManagerCard = () => {
    const intern = useRecordContext();
    const { data: manager, isPending, error } = useGetOne(
        "employees",
        { id: intern.managerId },
        { enabled: !!intern.managerId }
    );

    if (isPending) return <CircularProgress />;
    if (error) return <Alert severity="error">Manager introuvable</Alert>;
    if (!data) return null;

    return (
    <Card variant="outlined" sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6">👤 Manager</Typography>
        <Typography><strong>Nom :</strong> {data.firstname} {data.lastname}</Typography>
        <Typography><strong>Département :</strong> {data.department}</Typography>
        <Typography>
          <strong>Email :</strong>{" "}
          <a href={`mailto:${data.email}`}>{data.email}</a>
        </Typography>
        <Chip
          label={data.active ? "Actif" : "Inactif"}
          color={data.active ? "success" : "default"}
          sx={{ mt: 1 }}
        />
      </CardContent>
    </Card>
  );
};