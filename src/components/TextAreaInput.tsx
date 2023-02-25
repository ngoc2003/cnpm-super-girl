interface TextAreaInputProps {
  onChange?: (e?: any) => void;
  onKeyUp?: (e?: any) => void;
  defaultValue?: string;
  row?: number;
  error?: string;
  placeholder?: string;
}

function TextAreaInput({
  onChange = () => {},
  onKeyUp = () => {},
  defaultValue,
  row = 10,
  error = '',
  placeholder = 'Text here',
  ...props
}: TextAreaInputProps) {
  return (
    <div>
      <div
        className={`items-center flex border rounded-xl overflow-hidden hover:border-blue-400 text-text1  duration-200 ${
          error.length > 0
            ? 'border-error'
            : 'border-stroke dark:border-darkStroke'
        }`}
      >
        <textarea
          rows={row}
          placeholder={placeholder}
          onChange={onChange}
          onKeyUp={onKeyUp}
          defaultValue={defaultValue}
          className='outline-none  px-3  bg-transparent w-full py-4  font-medium text-sm dark:placeholder:text-text2 placeholder:text-text4    '
          {...props}
        />
      </div>
      {error.length > 0 && (
        <span className=' text-sm font-medium pointer-events-none text-error '>
          {error}
        </span>
      )}
    </div>
  );
}

export default TextAreaInput;
