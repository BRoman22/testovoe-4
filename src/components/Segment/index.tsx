import styles from './index.module.scss';
import { Leg, Carrier } from '../../constants';
import {
  dateFormater,
  timeFormater,
  durationFormater,
  getEndingTransfers,
} from '../../services';

interface SegmentProps {
  leg: Leg;
  carrier: Carrier;
}

const Segment: React.FC<SegmentProps> = ({ leg, carrier }) => {
  const { segments } = leg;
  const transfers = segments.length - 1;

  return (
    <div className={styles.destination}>
      <div className={styles.destination__direction}>
        <span>{`${segments[0].departureCity?.caption}, `}</span>
        <span>{`${segments[0].departureAirport.caption} `}</span>
        <span className={styles.text}>
          {`(${segments[0].departureAirport.uid}) ➞ `}
        </span>
        <span>{`${segments[transfers].arrivalCity?.caption}, `}</span>
        <span>{segments[transfers].arrivalAirport.caption}</span>
        <span className={styles.text}>
          {` (${segments[transfers].arrivalAirport.uid})`}
        </span>
      </div>
      <div className={styles.destination__time}>
        <div>
          <span>{`${timeFormater(segments[0].departureDate)} `}</span>
          <span className={styles.text}>
            {dateFormater(segments[0].departureDate)}
          </span>
        </div>
        <span>{`🕒 ${durationFormater(leg.duration)}`}</span>
        <div>
          <span
            className={styles.text}
          >{`${dateFormater(segments[transfers].departureDate)} `}</span>
          <span>{timeFormater(segments[transfers].departureDate)}</span>
        </div>
      </div>
      <div className={styles.destination__transfers}>
        <hr className={styles.transfers__divider} />
        <span className={styles.transfers__text}>
          {transfers ? getEndingTransfers(transfers) : ''}
        </span>
      </div>
      <span className={styles.destination__carrier}>
        {`Рейс выполняет: ${carrier.caption}`}
      </span>
    </div>
  );
};

export default Segment;
