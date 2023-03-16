import DataTable from "react-data-table-component";

export default function DatatableCustom({ columns, data }) {
    const customStyles = {
        table: {
            style: {
                height: '500px'
            },
        },
        rows: {
            style: {
                minHeight: "58px",
            },
        },
        headCells: {
            style: {
                fontSize: "14px",
                fontWeight: "700",
                paddingLeft: "14px",
                paddingRight: "14px",
            },
        },
        cells: {
            style: {
                paddingLeft: "14px",
                paddingRight: "14px",
            },
        },
    };

    return (
        <DataTable
            columns={columns}
            data={data}
            defaultSortFieldId={1}
            pagination
            responsive
            fixedHeader
            customStyles={customStyles}
        />
    );
}
