

/**
 * @component
 * this component used for reuse the inputs and labels in the editUserByAdmin (because all the inputs and labels are the same but the diffrent is the name of the label and data we entered )
 * @param {Object} props - The properties object.
 * @param props.label - label of input.
 * @param props.value - the value set in the input.
 * @param props.onChange - change function for update use state.
 * @param props.isDisabled - disable or undisable the input.
 * @returns {JSX.Element} - a rendered search component. 
 */
export default function EditableField({ label, value, onChange, isDisabled }) {
    return (
      <div className="flex w-full px-2 md:px-0 md:w-1/4 justify-between my-3 font-bold">
        <label>{label}:</label>
        <input className="border border-gray-400 px-2" type="text" value={value} onChange={onChange} disabled={isDisabled} />
      </div>
    );
  }
  