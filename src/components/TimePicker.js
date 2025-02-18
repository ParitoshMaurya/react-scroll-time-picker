import React, { useEffect, useState, useRef } from 'react';
import TimePickerSelection from './TimePickerSelection';
import '../styles/react-ios-time-picker.css';

function TimePicker({
   value: initialValue = null,
   cellHeight = 28,
   placeHolder = 'Select Time',
   pickerDefaultValue = '10:00',
   onChange = () => {},
   onFocus = () => {},
   onSave = () => {},
   onCancel = () => {},
   disabled = false,
   isOpen: initialIsOpenValue = false,
   required = false,
   cancelButtonText = 'Cancel',
   saveButtonText = 'Save',
   controllers = true,
   seperator = true,
   id = null,
   use12Hours = false,
   onAmPmChange = () => {},
   name = null,
   onOpen = () => {},
   popupClassName = null,
   inputClassName = null,
}) {
   const [isOpen, setIsOpen] = useState(initialIsOpenValue);
   const [height, setHeight] = useState(cellHeight);
   const [inputValue, setInputValue] = useState(initialValue);
   const timePickerRef = useRef(null);


   useEffect(() => {
      const handleClickOutside = (event) => {
         if (timePickerRef.current && !timePickerRef.current.contains(event.target)) {
            setIsOpen(false);
         }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [setIsOpen]);

   useEffect(() => {
      setInputValue(initialValue);
   }, [initialValue]);

   const handleClick = (e) => {
      if (isOpen) {
         if (e.target.closest('.react-ios-time-picker-selection')) {
            return;
         }
      }
      setIsOpen(!isOpen);
   };

   const handleFocus = () => {
      onFocus();
      onOpen();
   };

   let finalValue = inputValue;

   if (initialValue === null && use12Hours) {
      finalValue = `${pickerDefaultValue} AM`;
   } else if (initialValue === null && !use12Hours) {
      finalValue = pickerDefaultValue;
   }

   const params = {
      onChange,
      height,
      onSave,
      onCancel,
      cancelButtonText,
      saveButtonText,
      controllers,
      setInputValue,
      setIsOpen,
      seperator,
      use12Hours,
      onAmPmChange,
      initialValue: finalValue,
      pickerDefaultValue,
   };

   return (
         <div ref={timePickerRef} className="react-ios-time-picker-main" onClick={handleClick}>
            <input
               id={id}
               name={name}
               className={`react-ios-time-picker-input ${inputClassName || ''}`}
               value={inputValue === null ? '' : inputValue}
               type="text"
               placeholder={placeHolder}
               readOnly
               disabled={disabled}
               required={required}
               onFocus={handleFocus}
            />
            {
               isOpen && !disabled && (<TimePickerSelection {...params} />)
            }
         </div>
   );
}

export default TimePicker;
