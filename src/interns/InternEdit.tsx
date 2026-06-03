import { Edit, SimpleForm, TextInput, NumberInput, SelectInput, BooleanInput,
    ReferenceInput, required, email, minValue, useRecordContext,
 } from "react-admin";
import { useWatch } from "react-hook-form";

const departementChoices = [
    { id: 'Informatique', name: 'Informatique' },
    { id: 'Marketing', name: 'Marketing' },
    { id: 'RH', name: 'RH' },
    { id: 'Finance', name: 'Finance' },
];

const RemunerationInput = () => {
    const isRemunerate = useWatch({ name: 'isRemunerate' });
    if (!isRemunerate) return null;
    return (
        <NumberInput source="remuneration" label="Rémunération (€)" validate={[required(), minValue(1)]} />
    );
};

const ManagerInput = () => {
    const departement = useWatch({ name: 'departement' });
    return (
        <ReferenceInput source="managerId" reference="employees" label="Manager" filter={{ departement, active: true }}>
            <SelectInput
                label="Manager"
                optionText={(record) => `${record.firstName} ${record.lastName}`}
                validate={required()}
             />
        </ReferenceInput>
    );
};

const InternTitle = () => {
    const record = useRecordContext();
    if (!record) return <span>Modifier un stagiaire</span>;
    return <span>Modifier le stagiaire: {record.firstName} {record.lastName}</span>;
};

export const InternEdit = () => (
    <Edit title={<InternTitle />}>
        <SimpleForm>
            <TextInput source="firstName" label="Prénom" validate={required()} />
            <TextInput source="lastName" label="Nom" validate={required()} />
            <TextInput source="email" label="Email" validate={[required(), email()]} />
            <SelectInput source="departement" label="Département" choices={departementChoices} validate={required()} />
            <RemunerationInput />
            <BooleanInput source="isRemunerate" label="Rémunéré ?" />
            <ManagerInput />
        </SimpleForm>
    </Edit>
);