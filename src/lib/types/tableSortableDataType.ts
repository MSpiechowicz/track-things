export type TableSortableDataType = {
  sortData: (field: string) => void;
  dataSorted: {
    fields: string[];
    direction: 'asc' | 'desc';
  };
};
