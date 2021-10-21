import { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generatePicker from 'antd/lib/date-picker/generatePicker';

const DayjsDatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);
export default DayjsDatePicker;
