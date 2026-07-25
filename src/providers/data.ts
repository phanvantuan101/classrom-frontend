import { MOCK_SUBJECTS } from "@/constants";
import { BaseRecord, DataProvider, GetListParams, GetListResponse } from "@refinedev/core";

export const dataProvider: DataProvider = {
  getList: async <TData extends BaseRecord = BaseRecord>({ resource, filters, sorters, pagination }: GetListParams): Promise<GetListResponse<TData>> => {
    if (resource !== "subjects") {
      return { data: [] as TData[], total: 0 };
    }

    let filteredData = [...MOCK_SUBJECTS];

    // Apply filters
    if (filters) {
      filters.forEach((filter) => {
        if ('field' in filter && 'operator' in filter && 'value' in filter) {
          const { field, operator, value } = filter;
          filteredData = filteredData.filter((item) => {
            const itemValue = item[field as keyof typeof item];
            if (operator === 'contains' && typeof itemValue === 'string' && typeof value === 'string') {
              return itemValue.toLowerCase().includes(value.toLowerCase());
            }
            if (operator === 'eq') {
              return itemValue === value;
            }
            return true;
          });
        }
      });
    }

    // Apply sorters
    if (sorters && sorters.length > 0) {
      sorters.forEach((sorter) => {
        if ('field' in sorter && 'order' in sorter) {
          const { field, order } = sorter;
          filteredData.sort((a, b) => {
            const aValue = a[field as keyof typeof a];
            const bValue = b[field as keyof typeof b];
            if (aValue < bValue) return order === 'asc' ? -1 : 1;
            if (aValue > bValue) return order === 'asc' ? 1 : -1;
            return 0;
          });
        }
      });
    }

    const total = filteredData.length;

    // Apply pagination
    const current = pagination?.currentPage ?? 1;
    const pageSize = pagination?.pageSize ?? 10;
    const start = (current - 1) * pageSize;
    const end = start + pageSize;
    const paginatedData = filteredData.slice(start, end);

    return {
      data: paginatedData as unknown as TData[],
      total
    };
  },

  getOne: async () => { throw new Error("Method not implemented.") },
  create: async () => { throw new Error("Method not implemented.") },
  update: async () => { throw new Error("Method not implemented.") },
  deleteOne: async () => { throw new Error("Method not implemented.") },
  getApiUrl: () => '',
}