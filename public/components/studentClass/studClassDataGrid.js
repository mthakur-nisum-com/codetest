import React from 'react';
import { connect } from 'react-redux';
import { getObjectKeys } from '../../js/utils/object-utils';
import { buildColumn } from '../../js/services/grid/columns';
import { DataGrid } from '../common/grid/dataGrid';
const gridColumns = [];
const gridData = [];
const getPassOrFailCount = (array = [], key) => array.filter(({ Status }) => Status.toLowerCase() === key);

const getClassInfo = (classObj, field, classtitle) => {
    switch (field) {
        case 'className':
            return { ...{}, [field]: classtitle };
        case 'classPassInfo':
            return { ...{}, [field]: getPassOrFailCount(classObj, 'pass').length }
        case 'classFailInfo':
            return { ...{}, [field]: getPassOrFailCount(classObj, 'fail').length };
        case 'classStudentInfo':
            return { ... {}, [field]: classObj.length };

    };
};

export const StudClassGrid = ({ classInfo }) => {
    const classList = getObjectKeys(classInfo);
    const classHeader = buildColumn('className', 'Class' ,true,true);
    const studentHeader = buildColumn('classStudentInfo', 'No.of Student',false,false);
    const passInfo = buildColumn('classPassInfo', 'Pass',false);
    const failInfo = buildColumn('classFailInfo', 'Fail', false);
    const columnsItems = [classHeader, studentHeader, passInfo, failInfo];
    gridColumns.push(...columnsItems);
    classList.forEach((classtitle) => {
        let columnObj = {};
        columnsItems.forEach(({ dataField }) => {
            columnObj = { ...columnObj, ...getClassInfo(classInfo[classtitle], dataField, classtitle) }
        });
        gridData.push(columnObj);
    });
    const handleRowExpand = (e) => {
        return !e.isExpanded;
    };

    const DataComponent = (e) => {
        const columns = [];
        const studentsInfo = classInfo[e.className];
        studentsInfo.forEach((studentObj) => {
            const keys = getObjectKeys(studentObj);
            keys.forEach((keyName) => columns.push(buildColumn(keyName, keyName)))
        });
        return (
            <DataGrid data={classInfo[e.className]} columns={columns} />
        )

    }
    return (
        <section className="stud-data-grid">
            <DataGrid data={gridData} columns={gridColumns} expandable={handleRowExpand} expandComponent={DataComponent} expandOptions={{ expandBy: 'row' }}/>
        </section>

    );
};

const stateToProps = ({ studClass }) => ({
    classInfo: studClass.classInfo
});

export default connect(stateToProps)(StudClassGrid);