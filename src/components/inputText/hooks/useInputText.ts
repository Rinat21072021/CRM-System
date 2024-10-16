import { ChangeEvent } from "react";

export const useInputText = ( 
setText: (text: string) => void,
setError: (error: boolean) => void) => {
  
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
    setError(false);
    
  }
  return {handleOnChange}
}