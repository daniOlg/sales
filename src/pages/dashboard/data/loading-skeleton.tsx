import { v4 } from 'uuid';
import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';

function LoadingSkeleton() {
  return Array.from({ length: 2 }).map(() => {
    const i = v4();
    return (
      <TableRow key={i}>
        {Array.from({ length: 4 }).map(() => {
          const j = v4();
          return (
            <TableCell key={`${i}-${j}`}>
              <Skeleton className="h-7 w-full" />
            </TableCell>
          );
        })}
      </TableRow>
    );
  });
}

export default LoadingSkeleton;
