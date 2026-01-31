type Props = {
  errorMessage: string;
};

export default function InputError({ errorMessage }: Props) {
  return (
    <span className="text-error my-1.5 ml-2 flex max-w-sm items-center gap-1 text-left text-xs font-semibold">
      {errorMessage}
    </span>
  );
}
