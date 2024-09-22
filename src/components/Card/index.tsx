import styles from './index.module.scss';
import { Flight } from '../../constants';
import { Segment } from '..';

interface CardProps {
  flight: Flight;
}

const Card: React.FC<CardProps> = ({ flight }) => {
  const { legs, carrier, price } = flight.flight;

  return (
    <div>
      <div className={styles.card__header}>
        <span>{carrier.caption}</span>
        <div className={styles.price__wrapper}>
          <span className={styles.price}>{price.total.amount} &#8381;</span>
          <span className={styles.price__subtitle}>
            Стоимость для одного взрослого пассажира
          </span>
        </div>
      </div>

      <Segment leg={legs[0]} carrier={carrier} />
      <hr className={styles.divider} />
      <Segment leg={legs[1]} carrier={carrier} />
      <button className={styles.button}>ВЫБРАТЬ</button>
    </div>
  );
};

export default Card;
