import React from 'react';
import Row from "./Row";

// This component is used to display the table.
// In our project, there are many pages that include tables, and because of that, we make the table an independent component.
// This helps us reuse it in many pages (it also uses the row component, and the row component uses the cell component).
// Props is the data sent by the component that uses the table component.
export const Table = (prop) => {
        // console.log(prop.extraColumns)
    return (
        <div className="overflow-x-auto my-4">
            <table className='min-w-full border-collapse rounded-lg shadow-md'>
                {prop.data.length > 0 && (
                    <thead className='container hidden md:table-header-group '>
                        <tr className='capitalize'>
                            {prop.tableSort.map((colName, index) => (
                                <th key={index} className="px-4 py-2 border-b border-gray-300">{colName}</th>
                            ))}
                        </tr>
                    </thead>
                )}
                <tbody className='divide-y divide-gray-200 border border-gray-300 md:border-0'>
                    {prop.data.map((d, index) => (
                        <Row
                            key={index}
                            tableSort={prop.tableSort}
                            data={d}
                            extraColumns={prop.extraColumns}
                            header={false}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
