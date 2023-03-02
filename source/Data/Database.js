import {enablePromise, openDatabase} from 'react-native-sqlite-storage';

const DATABASE_NAME = 'Finanzas.db';

export const GetDBConection = async () => {
  enablePromise(true);
  const db = await openDatabase({name: DATABASE_NAME});
  return db;
};

export const CreateTables = async db => {
  const query =
    'CREATE TABLE IF NOT EXISTS expenses(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(30), date VARCHAR(10), description VARCHAR(300), typePayment INTEGER, amount DOUBLE)';
  return await db.executeSql(query);
};
export const CreateCardTable = async db => {
  const query =
    'CREATE TABLE IF NOT EXISTS cards(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(15), typeCard VARCHAR(10))';
  return await db.executeSql(query);
};

export async function AlterCard(db) {
  const query = 'ALTER TABLE expenses ADD COLUMN nameCard VARCHAR(10)';
  return await db.executeSql(query);
}

export async function InitDataBase() {
  const db = await GetDBConection();
  await CreateTables(db);
  await CreateCardTable(db);
  db.close();
}

export async function InsertExpense(
  db,
  name,
  date,
  description,
  type,
  amount,
  nameCard,
) {
  const insert = `INSERT INTO expenses (name,date,description,typePayment,amount,nameCard) values ('${name}', '${date}', '${description}', '${type}', '${amount}', '${nameCard}')`;
  return db.executeSql(insert);
}

export async function UpdateExpense(db, id, date) {
  const query = `UPDATE expenses SET date = ('${date}') WHERE id = ('${id}')`;
  return db.executeSql(query);
}

export async function GetExpenses(db) {
  const expenses = [];
  const results = await db.executeSql(
    'SELECT id, name, date, description, typePayment, amount, nameCard FROM expenses',
  );
  results.forEach(result => {
    for (let i = 0; i < result.rows.length; i++) {
      expenses.push(result.rows.item(i));
    }
  });

  return expenses;
}

export async function DeleteExpense(db, id) {
  const query = `DELETE FROM expenses WHERE id = '${id}'`;
  return db.executeSql(query);
}

//card tables

export async function InsertCard(db, name, type) {
  const query = `INSERT INTO cards (name,typeCard) VALUES ('${name}','${type}')`;
  return await db.executeSql(query);
}

export async function GetCards(db) {
  const cards = [];
  const query = 'SELECT id,name, typeCard FROM cards';
  const results = await db.executeSql(query);
  results.forEach(res => {
    for (let i = 0; i < res.rows.length; i++) {
      cards.push(res.rows.item(i));
    }
  });

  return cards;
}

export async function DeleteCards(db, id) {
  const query = `DELETE FROM cards WHERE id = '${id}'`;
  return db.executeSql(query);
}
