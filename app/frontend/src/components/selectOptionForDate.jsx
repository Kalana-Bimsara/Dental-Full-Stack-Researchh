// React import not required with the new JSX runtime

const SelectOptionForDate = (props) => {
    return (
        <>
            <option value={props.value}>{new Date(props.option).toDateString()}</option>
        </>
    );
};export default SelectOptionForDate;