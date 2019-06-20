export const buildColumn = (fieldName = '', headerName = '', isKey = false, expandable = false) => Object.assign({}, { dataField: fieldName, name: headerName, isKey: isKey, expandable: expandable});


