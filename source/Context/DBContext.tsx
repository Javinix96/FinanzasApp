import {createContext, useContext, useEffect, useState} from 'react';
import {Text} from 'react-native';
import {
  AlterCard,
  CreateCardTable,
  CreateTables,
  GetDBConection,
} from '../Data/Database';

const DbContext = createContext('');

export function useDBContext() {
  return useContext(DbContext);
}

export const DbContextProvider = ({children}: any) => {
  const [isloading, setIsLoading] = useState(true);
  const [db, setDB] = useState('');

  useEffect(() => {
    let _db: any = null;
    async function getConn() {
      _db = await GetDBConection();
      await CreateTables(_db);
      await CreateCardTable(_db);
      // await AlterCard(_db);
      setDB(_db);
      setIsLoading(false);
    }
    getConn();
    return () => {
      if (_db !== null) {
        _db.close();
      }
    };
  }, []);

  if (isloading) {
    return <Text>Cargando...</Text>;
  }

  return <DbContext.Provider value={db}>{children}</DbContext.Provider>;
};
