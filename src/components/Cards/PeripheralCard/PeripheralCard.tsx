import { Card, Divider } from "rsuite";
import DeleteIcon from "/static/svg/delete.svg";
import styles from "../CardCard/CardCard.module.css";
import ConfirmDelete from "../../ConfirmDelete/ConfirmDelete.tsx";
import {useState} from "react";
import usePeripheralMutation from "../../../hooks/queries/usePeripheralMutation.ts";
import IPeripheral from "../../../interfaces/IPeripheral.ts";

function RenderConfig({ data }: { data: any }) {
    if (data === null || data === undefined) {
        return <span style={{ color: "#999" }}>null</span>;
    }

    if (typeof data !== "object") {
        return <span>{String(data)}</span>;
    }

    if (Array.isArray(data)) {
        return (
            <ul style={{ paddingLeft: 20 }}>
                {data.map((item, index) => (
                    <li key={index}>
                        <RenderConfig data={item} />
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <div style={{ paddingLeft: 12 }}>
            {Object.entries(data).map(([key, value]) => (
                <div key={key} style={{ marginBottom: 6 }}>
                    <strong>{key}:</strong>{" "}
                    <RenderConfig data={value} />
                </div>
            ))}
        </div>
    );
}

export default function PeripheralCard({id, name, config}: IPeripheral){
    const [confirmDelete, setConfirmDelete] = useState(false);
    const {deletePeripheralMutation} = usePeripheralMutation();
    const mutation = deletePeripheralMutation(id);
    return (
        <Card
            bordered
            style={{
                marginBottom: 20,
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                borderRadius: 12
            }}
        >
            <Card.Header >
                {name}
                <img
                    src={DeleteIcon}
                    className={styles.deleteIcon}
                    alt={name}
                    onClick={() => setConfirmDelete(true)}
                />
            </Card.Header>
            <Divider/>
            <Card.Body>
                    <strong>Configuration:</strong>
                    <RenderConfig data={config} />
            </Card.Body>
            <Card.Footer>
                <ConfirmDelete
                    show={confirmDelete}
                    name={`${name} ${config?.name}`}
                    onCancel={() => setConfirmDelete(false)}
                    onConfirm={() => {
                        mutation.mutate();
                        setConfirmDelete(false);
                    }}
                />
            </Card.Footer>
        </Card>
    );
}