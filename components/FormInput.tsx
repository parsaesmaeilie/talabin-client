interface FormInputProps {
    label: string;
    id: string;
    type: string;
    placeholder: string;
  }
  
  export const FormInput: React.FC<FormInputProps> = ({ label, id, type, placeholder }) => (
    <div>
      <label htmlFor={id} className="block text-lg font-medium text-gray-800">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        required
        className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500 text-gray-800"
        placeholder={placeholder}
      />
    </div>
  );
  