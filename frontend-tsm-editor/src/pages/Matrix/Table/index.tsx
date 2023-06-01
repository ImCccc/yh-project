import {Select} from 'antd';
import styles from './index.module.scss';

const options = [
  {name: 'N', value: 'N'},
  {name: 'B', value: 'B'},
  {name: 'S', value: 'S'},
  {name: 'P', value: 'P'},
];

type TableProps = {
  updateRows: (value: string, colIndex: number, rowIndex: number) => void;
  tableHeader: string[];
  tableBody: string[][];
};

const Comp: React.FC<TableProps> = ({updateRows, tableHeader, tableBody}) => {
  return (
    <table className={styles.table}>
      <tbody>
        <tr>
          {tableHeader.map((title, index) => (
            <td key={index}>{title}</td>
          ))}
        </tr>

        {tableBody.map((item, rowIndex) => (
          <tr key={rowIndex}>
            {item.map((value, colIndex) => {
              if (!colIndex) {
                return (
                  <td key={colIndex}>
                    <div>{value}</div>
                  </td>
                );
              }
              return (
                <td key={colIndex}>
                  <Select
                    size="small"
                    style={{width: '95%'}}
                    defaultValue={value}
                    onChange={(value) => updateRows(value, colIndex, rowIndex)}>
                    {options.map((item) => (
                      <Select.Option key={item.name} value={item.value}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Comp;
