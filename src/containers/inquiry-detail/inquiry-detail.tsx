import {
  InquiryDetailItemSection,
  InquiryDetailOrderSection,
  InquiryDetailContentSection,
  InquiryDetailAnswerSection,
} from '@src/components/inquiry-detail';
import { PageHeader } from 'antd';

import { useInquiry } from './hooks';

import styles from './inquiry-detail.module.scss';

export type InquiryDetailContainerProps = {
  id: number;
};

export default function InquiryDetailContainer({
  id,
}: InquiryDetailContainerProps) {
  const { data, loading } = useInquiry(id);

  if (loading) {
    return <section>로딩중...</section>;
  }

  if (!data && !loading) {
    return <section>문의가 없습니다.</section>;
  }

  const { item, orderItemMerchantUid, orderItem } = data;

  return (
    <div className={styles.wrapper}>
      <PageHeader title="문의 상세" className={styles.pageHeader} />
      <section>
        <InquiryDetailItemSection {...item} />
        {!!orderItemMerchantUid && !!orderItem && (
          <InquiryDetailOrderSection {...orderItem} />
        )}
      </section>
      <section>
        <InquiryDetailContentSection {...data} />
        <InquiryDetailAnswerSection id={id} />
      </section>
    </div>
  );
}
