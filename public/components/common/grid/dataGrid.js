import React, { Fragment } from 'react';
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

export const DataGrid = (props) => {
    const { columns, data, expandable, expandOptions, expandComponent} = props;
    return (
        <section>
            <BootstrapTable data={data} expandableRow={expandable} expandComponent={expandComponent} options={expandOptions} keyField="className">
                {columns.map((columObj, index) =>
                    <TableHeaderColumn 
                        dataField={columObj.dataField} 
                        key={index}>
                        {columObj.name}
                    </TableHeaderColumn>
                    )}
            </BootstrapTable>
        </section>
    )

};