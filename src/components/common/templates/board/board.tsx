import { useState } from 'react';
import { useRouter } from 'next/router';
import { PageHeader } from 'antd';

import { BoardFilter, BoardTable } from '@components/common/organisms';

import { DatePickerValueType } from '@components/common/molecules/form-inputs/date-picker';
import { removeDashFromNumber } from '@common/helpers';

import { BoardTemplateProps } from './board.type';

import styles from './board.module.scss';

export default function BoardTemplate(props: BoardTemplateProps) {
  const { tableRef, title, subTitle, defaultFilter = {}, filterInputs } = props;

  const router = useRouter();

  const [filter, setFilter] = useState<Record<string, unknown>>(defaultFilter);
  const [query, setQuery] = useState(null);

  const formatFilter = (
    inputs: Record<string, unknown>
  ): Record<string, unknown> => {
    let result = { ...inputs };

    /**  조회 기간 필터를 형식에 맞게 변경한다. */
    const datePeriodFilter = inputs.period as DatePickerValueType;
    result = {
      ...result,
      ...(datePeriodFilter
        ? {
            [datePeriodFilter['lookup']]: datePeriodFilter['range'],
          }
        : {}),
    };
    delete result['period'];

    /**  검색어가 숫자와 '-'의 조합인 경우 '-' 를 제거한다.  */
    result = {
      ...result,
      ...(result['search']
        ? { search: removeDashFromNumber(result['search'] as string) }
        : {}),
      ...(result['query']
        ? { query: removeDashFromNumber(result['query'] as string) }
        : {}),
    };

    return result;
  };

  const handleFilterChange = (newFilter: Record<string, unknown>) => {
    const formattedFilter = formatFilter(newFilter);

    /** query 필드는 filter에서 제외한다. */
    setQuery(formattedFilter.query ?? null);
    delete formattedFilter.query;

    setFilter(formattedFilter);
  };

  return (
    <div className={styles.wrapper}>
      <PageHeader
        className={styles.pageHeader}
        title={title}
        subTitle={subTitle}
        onBack={() => router.push('/')}
      />
      {!!filterInputs && (
        <BoardFilter
          defaultFilter={filter}
          onFilterChange={handleFilterChange}
          inputs={filterInputs}
        />
      )}
      <BoardTable {...props} ref={tableRef} filter={filter} query={query} />
    </div>
  );
}
