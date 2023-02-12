import {useRef, useCallback} from 'react';

const useExportData = (gridApi: any) => {
    const exportData = useCallback(() => {
        const params = {
            fileName: 'data.csv',
            columnKeys: ['make', 'model', 'price'],
        };
        gridApi.exportDataAsCsv(params);
    }, [gridApi]);

    return exportData;
};