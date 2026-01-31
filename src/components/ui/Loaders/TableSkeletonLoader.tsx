type Props = {
  columns: number;
  rowCount?: number;
};

export default function TableSkeletonLoader({ columns }: Props) {
  return (
    <tr style={{ opacity: "1" }} className="relative">
      <td className="background background__running" colSpan={columns + 1}>
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      </td>
    </tr>
  );
}
