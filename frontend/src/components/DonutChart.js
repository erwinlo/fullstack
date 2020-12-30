import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { PieChart } from 'react-minimal-pie-chart';

export default function DonutChart(props) {
    const [hovered, setHovered] = useState(null);
    const data = [...props.data];
    // Create our money formatter.
    const money = new Intl.NumberFormat('en-SG', {
        style: 'currency',
        currency: 'SGD'
    });
    
    const color = ['#4cd964', '#007aff', '#ff3b30', '#ffcc00', '#ff9500', '#5856d6', '#ff2d55', '#E040FB'];
    data.forEach((d, i, arr) => {        
        arr[i].color = color[i];
        arr[i].value = d.balance;
    });

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
                        (data[hovered].short_name + ' ' 
                        + data[hovered].account_type + ': ' 
                        + money.format(data[hovered].value))
                        : null
                }
            />
        </div>
    );
}