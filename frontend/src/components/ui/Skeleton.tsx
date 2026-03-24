import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => {
  return (
    <div className={`animate-pulse bg-slate-200 rounded-md ${className}`} />
  );
};

export const TableSkeleton = ({ rows = 5, columns = 4 }: { rows?: number, columns?: number }) => (
  <div className="overflow-x-auto rounded-lg border border-slate-200">
    <table className="min-w-full text-sm text-slate-700">
      <thead className="bg-slate-50 uppercase text-xs tracking-wider">
        <tr>
          {Array.from({ length: columns }).map((_, i) => (
            <th key={i} className="text-left px-6 py-4">
              <Skeleton className="h-4 w-24" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 bg-white">
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <tr key={rowIdx}>
            {Array.from({ length: columns }).map((_, colIdx) => (
              <td key={colIdx} className="px-6 py-4">
                <Skeleton className="h-4 w-full" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
