import { FilterBtnType, filterValueType } from '../../type/type';
import style from './FilterBtn.module.scss';

export const FilterBtn = ({
  filerTask,
  countTasks,
  filtered,
}: FilterBtnType) => {
  return (
    <div className={style.filterBtn}>
      <button
        className={filerTask === 'all' ? style.btnActive : style.btnFilter}
        onClick={() => filtered('all')}
      >
        {<span>{`Все(${countTasks.all})`}</span>}
      </button>
      <button
        className={filerTask === 'inWork' ? style.btnActive : style.btnFilter}
        onClick={() => filtered('inWork')}
      >
        {<span>{`В работе(${countTasks.inWork})`}</span>}
      </button>
      <button
        className={
          filerTask === 'completed' ? style.btnActive : style.btnFilter
        }
        onClick={() => filtered('completed')}
      >
        {<span>{`Сделано(${countTasks.completed})`}</span>}
      </button>
    </div>
  );
};
