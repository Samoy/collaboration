import { PageContainer, ProCard, ProDescriptions } from '@ant-design/pro-components';
import { DatePicker, InputNumber } from 'antd';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';
import { FormattedMessage } from '@umijs/max';

const now = dayjs();

function calc(starDate: Dayjs | null, endDate: Dayjs | null): number | null | undefined {
  return endDate?.diff(starDate, 'day');
}

const DateCalc = () => {
  const [startDate, setStartDate] = useState<Dayjs | null>(now);
  const [endDate, setEndDate] = useState<Dayjs | null>(now);
  const [duration, setDuration] = useState(calc(startDate, endDate));

  return (
    <PageContainer>
      <ProCard direction={'column'}>
        <ProDescriptions column={1} labelStyle={{ alignItems: 'center', width: 80 }}>
          <ProDescriptions.Item label={<FormattedMessage id={'page.other.date.start_date'} />}>
            <DatePicker
              style={{ width: '100%' }}
              value={startDate}
              onChange={(date) => {
                setStartDate(date);
                if (date !== null) {
                  setDuration(calc(date, endDate));
                }
              }}
            ></DatePicker>
          </ProDescriptions.Item>
          <ProDescriptions.Item label={<FormattedMessage id={'page.other.date.end_date'} />}>
            <DatePicker
              style={{ width: '100%' }}
              value={endDate}
              onChange={(date) => {
                setEndDate(date);
                if (date !== null) {
                  setDuration(calc(startDate, date));
                }
              }}
            ></DatePicker>
          </ProDescriptions.Item>
          <ProDescriptions.Item label={<FormattedMessage id={'page.other.date.duration'} />}>
            <InputNumber
              style={{ width: '100%' }}
              controls={true}
              precision={0}
              step={1}
              value={duration}
              addonAfter={<FormattedMessage id={'page.other.date.days'} />}
              onChange={(val) => {
                setDuration(val);
                if (val !== null && startDate !== null) {
                  setEndDate(startDate.add(val, 'day'));
                }
              }}
            ></InputNumber>
          </ProDescriptions.Item>
        </ProDescriptions>
      </ProCard>
    </PageContainer>
  );
};

export default DateCalc;
