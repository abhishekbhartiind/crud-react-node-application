module.exports = {
    isEmpty: string => {
        return string !== undefined && string !== "" && string !== "null" && string !== null && string !== "undefined"
    },
    RECORD_OPERATION_MESSAGE: {
        DELETE_CONFIRM: "Are you sure you want to delete the record?",
        ADD_SUCCESS: "The record was added successfully",
        EDIT_SUCCESS: "The record was edited successfully",
        DELETE_SUCCESS: "The record was deleted successfully",
        FAIL: "The operation was not successful, please try again later",
        UNEXPECTED_ERROR: "Something went wrong, please try again later"
    }
}