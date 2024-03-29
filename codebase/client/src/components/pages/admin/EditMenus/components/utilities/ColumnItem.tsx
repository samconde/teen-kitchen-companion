type DivRef = React.LegacyRef<HTMLDivElement> | undefined;
const ColumnItem = ({
  children,
  className,
  innerRef,
  providedProps,
  onClick,
}: {
  children?: React.ReactNode;
  className?: string;
  innerRef?: DivRef;
  providedProps?: any;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}): JSX.Element => {
  return (
    <div
      className={`h-[70px] py-4 px-6 ${className}`}
      ref={innerRef}
      {...providedProps}
      onClick={onClick}
    >
      {children || 'Placeholder'}
    </div>
  );
};

export default ColumnItem;
