import { HTMLAttributes } from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'

// Stable animation values to prevent hydration mismatch
const stableVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

interface TableRow {
  [key: string]: string | number | boolean | object | undefined
}

interface Column<T = TableRow> {
  header: string
  accessor: string
  className?: string
  cell?: (value: unknown, row: T) => React.ReactNode
}

interface DataTableProps<T = TableRow> extends HTMLAttributes<HTMLDivElement> {
  columns: Column<T>[]
  data: T[]
  className?: string
  emptyMessage?: string
}

export default function DataTable<T = TableRow>({
  columns,
  data,
  className,
  emptyMessage = 'No data available'
}: DataTableProps<T>) {
  return (
    <div className={clsx('overflow-x-auto', className)}>
      <motion.table 
        initial="hidden"
        animate="visible"
        variants={stableVariants}
        className="min-w-full divide-y divide-gray-200"
      >
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                scope="col"
                className={clsx(
                  'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                  column.className
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <motion.tr 
                key={rowIndex}
                variants={stableVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: rowIndex * 0.05 }}
              >
                {columns.map((column) => (
                  <td
                    key={`${rowIndex}-${column.accessor}`}
                    className={clsx(
                      'px-6 py-4 whitespace-nowrap text-sm text-gray-900',
                      column.className
                    )}
                  >
                    {column.cell
                      ? column.cell(row[column.accessor as keyof T], row)
                      : String(row[column.accessor as keyof T])}
                  </td>
                ))}
              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-gray-500">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </motion.table>
    </div>
  )
}
