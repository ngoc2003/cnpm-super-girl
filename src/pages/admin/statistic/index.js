import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import { CChart } from '@coreui/react-chartjs';
import { apiURL } from '../../../config/config';
import axios from '../../../api/axios';
import color from '../../../config/color';
import MenuDropdown from '../../../components/MenuDropdown';

const onChange = (key) => {
  console.log(key);
};
function BookYear() {
  const [yearAdd, setYearAdd] = useState([]);
  useEffect(() => {
    const handleFetchYearAdd = async () => {
      const response = await axios.get(`${apiURL}/books/amountAddYear`);
      setYearAdd(response.data);
    };
    handleFetchYearAdd();
  }, []);
  const year = yearAdd.map((item) => item.year);
  const data = yearAdd.map((item) => item.amount);
  return (
    <div className='w-full max-w-[300px] min-w-[200px] text-center'>
      <h4 className='font-semibold text-primary text-lg my-3'>
        Books add per year
      </h4>
      <CChart
        type='doughnut'
        data={{
          labels: year,
          datasets: [
            {
              backgroundColor: color[Math.floor(Math.random() * color.length)],
              data,
            },
          ],
        }}
      />
    </div>
  );
}
function Type() {
  const [TypeAdd, setTypeAdd] = useState([]);
  useEffect(() => {
    const handleFetchTypeAdd = async () => {
      const response = await axios.get(`${apiURL}/books/amountTypeAddYear`);
      setTypeAdd(response.data);
    };
    handleFetchTypeAdd();
  }, []);
  const type = TypeAdd.map((item) => item.type);
  const data = TypeAdd.map((item) => item.amount);
  return (
    <div className='w-full max-w-[300px] min-w-[200px] text-center'>
      <h4 className='font-semibold text-primary text-lg my-3'>Book's type</h4>
      <CChart
        type='doughnut'
        data={{
          labels: type,
          datasets: [
            {
              backgroundColor: color[Math.floor(Math.random() * color.length)],
              data,
            },
          ],
        }}
      />
    </div>
  );
}
function Request() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const handleFetch = async () => {
      const responseAmount = await axios.get(`${apiURL}/books/amount`);
      const responseRequest = await axios.get(`${apiURL}/borrow/amount`);
      setData([responseAmount.data, responseRequest.data]);
    };
    handleFetch();
  }, []);
  const type = ['Book Request', 'Book Amount'];
  return (
    <div className='w-full max-w-[300px] min-w-[200px] text-center'>
      <h4 className='font-semibold text-primary text-lg my-3'>
        Reader request
      </h4>
      <CChart
        type='doughnut'
        data={{
          labels: type,
          datasets: [
            {
              backgroundColor: color[Math.floor(Math.random() * color.length)],
              data,
            },
          ],
        }}
      />
    </div>
  );
}
function BookMonth() {
  const [listYear, setListYear] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${apiURL}/books/amount/month`);
      const listYearTemp = response.data.map((item) => ({
        label: item.year,
        key: item.year,
      }));
      setListYear(listYearTemp);
      const dataTemp = response.data.find((item) => item.year === year);
      const temp = dataTemp.monthData?.map((item) => item.amount);
      setMonth(temp);
    }
    fetchData();
  }, [year]);

  return (
    <>
      <MenuDropdown
        data={listYear}
        defaultValue={year}
        setItem={setYear}
        item={year}
      />
      <CChart
        type='bar'
        data={{
          labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
          datasets: [
            {
              label: `Book Amount ${year}`,
              backgroundColor: '#24537e',
              data: month,
            },
          ],
        }}
        labels='months'
      />
    </>
  );
}
function RequestMonth() {
  const [listYear, setListYear] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${apiURL}/borrow/amount/month`);
      const listYearTemp = response.data.map((item) => ({
        label: item.year,
        key: item.year,
      }));
      setListYear(listYearTemp);
      const dataTemp = response.data.find((item) => item.year === year);
      const temp = dataTemp.monthData?.map((item) => item.amount);
      setMonth(temp);
    }
    fetchData();
  }, [year]);

  return (
    <>
      <MenuDropdown
        data={listYear}
        defaultValue={year}
        setItem={setYear}
        item={year}
      />
      <CChart
        type='bar'
        data={{
          labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
          datasets: [
            {
              label: `Request Amount ${year}`,
              backgroundColor: '#ff4f00',
              data: month,
            },
          ],
        }}
        labels='months'
      />
    </>
  );
}
function Statistic() {
  return (
    <Tabs
      className='w-full'
      defaultActiveKey='1'
      onChange={onChange}
      items={[
        {
          label: 'Year',
          key: 'year',
          children: (
            <div className=' grid grid-cols-3 gap-10'>
              <BookYear />
              <Type />
              <Request />
            </div>
          ),
        },
        {
          label: 'Month',
          key: 'month',
          children: (
            <div>
              <BookMonth />
              <RequestMonth />
            </div>
          ),
        },
      ]}
    />
  );
}

export default Statistic;
