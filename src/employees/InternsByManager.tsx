import { useRecordContext, useGetList } from "react-admin";
import { Typography, List, ListItem, ListItemText, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

export const InternsByManager = () => {
  const employee = useRecordContext();        // useRecordContext
  const { data, isPending, total } = useGetList("interns", {  // useGetList
    filter: { managerId: employee?.id },
    pagination: { page: 1, perPage: 100 },
  }, { enabled: !!employee?.id });

  if (isPending) return <CircularProgress />;

  return (
    <div>
      <Typography variant="h6">Stagiaires encadrés ({total ?? 0})</Typography>
      {!data || data.length === 0 ? (
        <Typography color="text.secondary">Aucun stagiaire pour ce manager.</Typography>
      ) : (
        <List dense>
          {data.map(intern => (
            <ListItem key={intern.id}>
              <ListItemText
                primary={`${intern.firstname} ${intern.lastname}`}
                secondary={intern.department}
              />
              <Link to={`/interns/${intern.id}/show`}>Voir fiche</Link>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};