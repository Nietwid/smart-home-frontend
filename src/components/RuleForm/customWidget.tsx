import {IconButton, NumberInput} from "rsuite";
import { Button } from "rsuite";
import PlusIcon from '@rsuite/icons/Plus';
import TrashIcon from '@rsuite/icons/Trash';
import SortDownIcon from '@rsuite/icons/SortDown';
import SortUpIcon from '@rsuite/icons/SortUp';

export const customTemplates = {
    ButtonTemplates: {
        AddButton: (props: any) => (
            <Button
                {...props}
                appearance="ghost"
                startIcon={<PlusIcon />}
                size="sm"
                style={{ marginTop: '10px' }}
            >
                Dodaj element
            </Button>
        ),
        RemoveButton: (props: any) => (
            <IconButton
                {...props}
                icon={<TrashIcon />}
                appearance="subtle"
                color="red"
                size="xs"
            />
        ),
        MoveDownButton: (props: any) => (
            <IconButton
                {...props}
                icon={<SortDownIcon/>}
                appearance="subtle"
                color="red"
                size="xs"
            />
        ),
        MoveUpButton: (props: any) => (
            <IconButton
                {...props}
                icon={<SortUpIcon/>}
                appearance="subtle"
                color="red"
                size="xs"
            />
        ),
    },
};


const IntegerWidget = (props: any) => {
    return (
        <div style={{ marginBottom: 10 }}>
            <NumberInput
                style={{ width: '100%' }}
                value={props.value ?? ""}
                onChange={(val) => {
                    const result = val === "" ? undefined : Number(val);
                    props.onChange(result);
                }}
            />
        </div>
    );
};



export const customWidget = {
    integer: IntegerWidget,
    number: IntegerWidget,
    string: IntegerWidget,
    BaseInput: IntegerWidget,
    TextWidget: IntegerWidget,
    NumberWidget: IntegerWidget
};