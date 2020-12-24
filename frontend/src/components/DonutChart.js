import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { PieChart } from 'react-minimal-pie-chart';

export default function DonutChart(props) {
    const [hovered, setHovered] = useState(null);
    const data = [...props.data];

    return (
        <div data-tip="" data-for="chart">
            <PieChart
                data={data}
                lineWidth={36}
                paddingAngle={5}
                label={({ dataEntry }) => Math.round(dataEntry.percentage) + ' %'}
                labelPosition={82}
                labelStyle={(index) => ({
                    fill: '#fff',
                    fontSize: '5px',
                    fontFamily: 'sans-serif',
                })}
                onMouseOver={(_, index) => {
                    setHovered(index);
                }}
                onMouseOut={() => {
                    setHovered(null);
                }}
            />
            <ReactTooltip
                id="chart"
                getContent={() =>
                    typeof hovered === 'number' ?
                        (data[hovered].short_name + ' ' + data[hovered].account_type + ': $ ' + data[hovered].value)
                        : null
                }
            />
        </div>
    );
}