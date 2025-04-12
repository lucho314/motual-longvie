// src/components/ui/loader.tsx

import { FC } from 'react';
import { Loader2 } from 'lucide-react';

const Loader: FC = () => {
  return (
    <div className="flex items-center justify-center w-full py-8">
      <Loader2 className="h-6 w-6 animate-spin text-gray-600 dark:text-gray-300" />
      <span className="ml-3 text-gray-700 dark:text-gray-200">Cargando...</span>
    </div>
  );
};

export default Loader;
