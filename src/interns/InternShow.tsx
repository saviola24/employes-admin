import {
  Show, SimpleShowLayout, TextField, BooleanField,
  NumberField, EmailField, ReferenceField,
  TopToolbar, ListButton, EditButton,
} from "react-admin";
import { ManagerCard } from "./ManagerCard";

const ShowActions = () => (
  <TopToolbar>
    <ListButton />
    <EditButton />
  </TopToolbar>
);

export const InternShow = () => (
  <Show actions={<ShowActions />}>
    <SimpleShowLayout>
      <TextField source="firstname" label="Prénom" />
      <TextField source="lastname" label="Nom" />
      <EmailField source="email" label="Email" />
      <TextField source="department" label="Département" />
      <BooleanField source="isRemunerate" label="Rémunéré" />
      <NumberField source="remuneration" label="Rémunération" options={{ style: "currency", currency: "EUR" }} />
      {/* Lien cliquable vers la fiche employé */}
      <ReferenceField source="managerId" reference="employees" label="Manager" link="show">
        <TextField source="firstname" />
      </ReferenceField>
      <ManagerCard />
    </SimpleShowLayout>
  </Show>
);