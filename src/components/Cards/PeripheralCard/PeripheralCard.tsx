import { Card, Panel, Divider } from "rsuite";

interface IPeripheral {
    name: string;
    type: string;
    config: any;
}

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

export default function PeripheralCard({
                                           name,
                                           type,
                                           config
                                       }: IPeripheral) {
    return (
        <Card
            bordered
            style={{
                width: 400,
                marginBottom: 20,
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                borderRadius: 12
            }}
        >
            <Panel header={<h5 style={{ margin: 0 }}>{name}</h5>}>
                <p style={{ marginBottom: 10 }}>
                    <strong>Type:</strong> {type}
                </p>

                <Divider />

                <div>
                    <strong>Configuration:</strong>
                    <RenderConfig data={config} />
                </div>
            </Panel>
        </Card>
    );
}