export const createConstants = (actionName=null,prefix = null) =>({
    'REQUEST': prefix? `${actionName}_${prefix}_REQUEST`:`${actionName}_REQUEST`,
    'SUCCESS': prefix? `${actionName}_${prefix}_SUCCESS`:`${actionName}_SUCCESS`,
    'FAIL': prefix? `${actionName}_${prefix}_FAIL`:`${actionName}_FAIL`,
    'RESET': prefix? `${actionName}_${prefix}_RESET`:`${actionName}_RESET`,
});

export const SERVICE_ERROR = 'SERVICE_ERROR';

export const GET_REQUEST = 'GET_REQUEST';
export const PUT_REQUEST = 'PUT_REQUEST';
export const DELETE_REQUEST = 'DELETE_REQUEST';
export const POST_REQUEST = 'POST_REQUEST';
export const SHOW_DIALOG = 'SHOW_DIALOG';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';