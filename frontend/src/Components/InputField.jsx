const InputField = ({ label, type, id }) => {
  return (
    <div className="input-wrapper">
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} />
    </div>
  );
};

export default InputField;
