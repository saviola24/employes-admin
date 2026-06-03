import { act } from "react";
import {
  Create, SimpleForm, TextInput, NumberInput,
  SelectInput, BooleanInput, ReferenceInput,
  required, email, minValue,
} from "react-admin";
import { useWatch } from "react-hook-form";

const departmentChoices = [
    { id: "informatique", name: "informatique" },
    { id: "marketing", name: "marketing" },
    { id: "RH", name: "RH" },
    { id: "finance", name: "finance" },
];

//champ remuneration conditionnel
const RemunerationInput = () => {
    const isRemunerate = useWatch({ name: "isRemunerate" });
    if (!isRemunerate) return null;
    return (
        <NumberInput source="remuneration" 
        label="Remuneration (en euros)" 
        validate={[required(), minValue(1, "doit etre superieur a 1")]} />
    );
}

//manager filtre par departement et actif
const ManagerInput = () => {
    const department = useWatch({ name: "department" });
    return (
        <ReferenceInput source="managerId" reference="employees" filter={{ department, active: true }}>
            <SelectInput label="Manager" optionText={record => `${record.firstname} ${record.lastname}`}
            validate={required()} 
            />
        </ReferenceInput>
    );
}

export const InternCreate = () => (
    <Create redirect="list">
        <SimpleForm>
            <TextInput source="firstname" label="prenom" validate={required()} />
            <TextInput source="lastname" label="nom" validate={required()} />
            <TextInput source="email" label="email" validate={[required(), email()]} />
            <SelectInput source="department" label="departement" choices={departmentChoices} validate={required()} />
            <ManagerInput />
            <BooleanInput source="isRemunerate" label="est remunere?" defaultValue={false} />
            <RemunerationInput />
        </SimpleForm>
    </Create>
);

