const usePrintPreview = (data, filterField) => {
    const [filteredData, setFilteredData] = useState([]);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [reportData, setReportData] = useState(null);

    const handlePrintModal = () => {
        // display the report modal if a filter has been applied
        if (filteredData === [] || filteredData.length === 0) {
            console.log("Filtered Data is Empty");
            message = "Filter Teamsheet to a specific Fixture Date using Grid";
            setShowFilterModal(true);
            setModalOpen(false);
        } else {
            if (filteredData.length <= 30) {
                setShowFilterModal(false);
                setReportData(loadDataForTeamsheet(filteredData));
                setModalOpen(true);
            } else {
                setShowFilterModal(true);
                setModalOpen(false);
            }
        }
    };

    const handleFilterData = (filterValue) => {
        // update the filteredData state
        const newFilteredData = data.filter((item) =>
            item[filterField].toLowerCase().includes(filterValue.toLowerCase())
        );
        setFilteredData(newFilteredData);
    };

    return {handlePrintModal, handleFilterData, filteredData, showFilterModal, modalOpen, reportData};
};


