import React from 'react';
import Cell from "./Cell";

// This component is used to create rows in the table (it reuses a cell).
// By mapping and using the cell component, we create all cells and save them in this row.
export const Row = (prop) => {
    return (
        <tr className='flex flex-col justify-center items-center text-center md:table-row md:flex-row md:justify-start md:text-left  border border-gray-300 md:border-0'>
            {prop.tableSort.map((fieldName, index) => (
                fieldName in prop.data ? (
                    <Cell key={fieldName} data={prop.data[fieldName]} header={prop.header} />
                ) : (
                    <td key={fieldName} className='py-2  px-4'>
                        {prop.extraColumns[index - prop.tableSort.length + prop.extraColumns.length](prop.data)}
                    </td>
                )
            ))}
        </tr>
    );
}

export default Row;
