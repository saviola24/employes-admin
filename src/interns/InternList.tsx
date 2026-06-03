import { List, Datagrid, TextField, NumberField, BooleanField,
  ReferenceField, EditButton, DeleteButton,
  SelectInput, BooleanInput, useCreate, useListContext, useRefresh } from 'react-admin';
import { useState } from 'react';
import {
  Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField as MuiTextField, Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const filters = [
    <selectInput source="department" label="Departement" choices={[
        { id: 'Informatique', name: 'Informatique' },
        { id: 'Marketing', name: 'Marketing' },
        { id: 'RH', name: 'RH' },
        { id: 'Finance', name: 'Finance' },
    ]} />,
    <BooleanInput source="isRemunerate" label="Rémunéré" />
];

const QuickCreateModal = () => {
    const [open, setOpen] = useState(false);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [managerId, setManagerId] = useState('');
    const [department, setDepartment] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [create, { isPending}] = useCreate('');
    const refresh = useRefresh();

    const handleSubmit = async () => {
        if (!firstname || !lastname || !managerId) {
            setErrorMsg('Tous les champs sont obligatoires');
            return;
        }
        create('interns', { data: { firstname, lastname, managerId: parseInt(managerId), isRemunerate: false, remuneration: 0  } }, {
            onSuccess: () => {
                setOpen(false);
                setFirstname('');
                setLastname('');
                setManagerId('');
                setDepartment('');
                refresh();
            },
            onError: () => {
                setErrorMsg('Erreur lors de la création de l\'interne');
            }
        });
    };

    return (
        <>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
                Ajouter un interne
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Ajouter un interne</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                    {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
                    <MuiTextField label="Prénom" value={firstname} onChange={e => setFirstname(e.target.value)}  />
                    <MuiTextField label="Nom" value={lastname} onChange={e => setLastname(e.target.value)}  />
                    <MuiTextField label="ID du manager" value={managerId} onChange={e => setManagerId(e.target.value)} type='number' />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Annuler</Button>
                    <Button onClick={handleSubmit} disabled={isPending} variant="contained">
                        {isPending ? 'En cours...' : 'Ajouter'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

const ListActions = () => (
    <div style={{ padding: '8px' }}>
        <QuickCreateModal />
    </div>
);

export const InternList = () => (
  <List filters={filters} actions={<ListActions />}>
    <Datagrid rowClick="show">
      <TextField source="firstname" label="Prénom" />
      <TextField source="lastname" label="Nom" />
      <TextField source="email" label="Email" />
      <TextField source="department" label="Département" />
      <ReferenceField source="managerId" reference="employees" label="Manager">
        <TextField source="firstname" /> <TextField source="lastname" />
      </ReferenceField>
      <NumberField source="remuneration" label="Rémunération" options={{ style: "currency", currency: "EUR" }} />
      <BooleanField source="isRemunerate" label="Rémunéré" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);