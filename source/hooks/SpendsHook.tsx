import {useEffect, useState} from 'react';

export function SpendsHook() {
  const [search, setSearch] = useState('');
  const [date, setDate] = useState(new Date('2023-02-21'));
  const [date2, setDate2] = useState('');
  const [date3, setDate3] = useState(new Date('2023-03-21'));
  const [date4, setDate4] = useState('');
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [openPick, setOpenPick] = useState(false);
  const [openF, setOpenF] = useState(false);
  useEffect(() => {
    setDate2(
      (date.getDate() < 10
        ? '0' + date.getDate().toString()
        : date.getDate().toString()) +
        '/' +
        ((date.getMonth() + 1).toString().length == 1
          ? '0' + (date.getMonth() + 1).toString()
          : (date.getMonth() + 1).toString()) +
        '/' +
        date.getFullYear().toString(),
    );
  }, [date]);

  useEffect(() => {
    setDate4(
      (date3.getDate() < 10
        ? '0' + date3.getDate().toString()
        : date3.getDate().toString()) +
        '/' +
        ((date3.getMonth() + 1).toString().length == 1
          ? '0' + (date3.getMonth() + 1).toString()
          : (date3.getMonth() + 1).toString()) +
        '/' +
        date3.getFullYear().toString(),
    );
  }, [date3]);

  return {
    search,
    setSearch,
    date2,
    date,
    setDate,
    open,
    setOpen,
    openPick,
    setOpenPick,
    openF,
    setOpenF,
    date3,
    setDate3,
    date4,
    setDate4,
    open2,
    setOpen2,
  };
}
